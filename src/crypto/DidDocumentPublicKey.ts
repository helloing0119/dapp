import { IDidDocumentPublicKey } from '@decentralized-identity/did-common-typescript';

export default class DidDocumentPublicKey implements IDidDocumentPublicKey {
  public id: string;
  public type: string;
  public controller: string;
  public publicKeyPem?: string;
  public publicKeyJwk?: object;
  public publicKeyHex?: string;
  public publicKeyBase64?: string;
  public publicKeyBase58?: string;
  public publicKeyMultibase?: string;

  constructor (key: any) {
    this.id = key.id;
    this.type = key.type;
    this.controller = key.controller;
    if ("publicKeyPem" in key) this.publicKeyPem = key.publicKeyPem;
    if ("publicKeyJwk" in key) this.publicKeyJwk = key.publicKeyJwk;
    if ("publicKeyHex" in key) this.publicKeyHex = key.publicKeyHex;
    if ("publicKeyBase64" in key) this.publicKeyBase64 = key.publicKeyBase64;
    if ("publicKeyBase58" in key) this.publicKeyBase58 = key.publicKeyBase58;
    if ("publicKeyMultibase" in key) this.publicKeyMultibase = key.publicKeyMultibase;
  }
}