import { Authentication } from '@decentralized-identity/did-auth-jose';
import axios from 'axios';

export default class HubHandler {
  constructor(hubDid, url, resolver, keys, cryptoSuites) {
    this.hubDid = hubDid;
    this.url = url;
    this.context = {
      resolver: resolver,
      keys: keys,
      cryptoSuites: cryptoSuites
    };

    this._authentication = new Authentication({
      resolver: this.context.resolver,
      keys: this.context.keys,
      cryptoSuites: this.context.cryptoSuites
    });
  }

  async postFile(file) {

  }
  
  async getFile(fileUrl) {
  }

  async send(endpoint, json) {
    const jsonString = JSON.stringify(json);
    const authenticatedRequest = await this._authentication.getAuthenticatedRequest(jsonString, this.hubDid, false);
    const requestString = Buffer.toString(authenticatedRequest);

    const slash = this.url.endsWith("/") ? "" : "/";
    axios.post(`${this.url}${slash}${endpoint}`, {
      data: requestString
    })
    .then(function (res) {
      try {
        const responseString = res.data;
        const verifiedResponse = await this._authentication.verifyAuthenticationResponse(responseString);
        const responseJson = JSON.parse(verifiedResponse.response);
        return {
          ok: true,
          body: responseJson
        };
      }
      catch(error) {
        console.log(error)
        return {
          ok: false,
          body: error
        }
      }
    })
    .catch(function (error) {
      console.log(error);
      return {
        ok: false,
        body: "error"
      };
    })
  }
}