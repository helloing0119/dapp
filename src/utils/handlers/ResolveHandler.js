import { HttpResolver, DidDocument } from '@decentralized-identity/did-common-typescript';

export default class ResolveHandler {
  constructor(resolver) {
    this.resolver = resolver;
  }

  async resolve(did) {
    try {
      const result = await this.resolver.resolve(did);
      return {
        ok: true,
        body: result.rawDocument
      };
    }
    catch (error) {
      console.log(error);
      return {
        ok: false,
        body: null
      }
    }
  }

}