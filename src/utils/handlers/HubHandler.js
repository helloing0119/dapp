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
    const slash = this.url.endsWith("/") ? "" : "/";
    axios.post(`${this.url}${slash}file`, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (res) {
      console.log(res);
      return {
        ok: true,
        fileName: res.fileName,
        savedPath: res.savedPath,
        size: file.size
      };
    })
      .catch(function (error) {
        console.log(error);
        return null;
      });
  }

  async getFile(fileUrl, filename = null) {
    axios.get(fileUrl, { responseType: 'blob' }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      return url;
    }).catch((response) => {
      console.error("failed", response);
      return null;
    });
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
        catch (error) {
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