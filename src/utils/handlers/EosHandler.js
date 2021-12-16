import { Api, JsonRPC } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { PrivateKey, PublicKey, Signature, Aes, key_utils, config } from 'eosjs-ecc';
export default class EosHandler {
  constructor(accounts, publicKeys, privateKeys, url) {
    this.account = accounts[0];
    this.accounts = accounts;
    this.publicKeys = publicKeys;
    this.privateKey = privateKeys;

    const signatureProvider = new JsSignatureProvider(privateKeys);
    const rpc = new JsonRPC(url, { fetch });
    const api = new Api({ rpc, signatureProvider });

    this.rpc = rpc;
    this.signatureProvider = signatureProvider;
    this.api = api;
  }

  addKey(account, publicKey, privateKey) {
    const oldAccounts = this.accounts;
    const oldPublicKeys = this.publicKeys;
    const oldPrivateKeys = this.privateKeys;

    this.accounts = [].push(oldAccounts, [account]);
    this.publicKeys = [].push(oldPublicKeys, [publicKey]);
    this.privateKey = [].push(oldPrivateKeys, [privateKey]);
  }

  reloadApi() {
    const signatureProvider = new JsSignatureProvider(this.privateKeys);
    const rpc = new JsonRPC(this.url, { fetch });
    const api = new Api({ rpc, signatureProvider });

    this.rpc = rpc;
    this.signatureProvider = signatureProvider;
    this.api = api;
  }

  async createObject(fileName) {
    let privateWif;
    PrivateKey.randomKey().then((privateKey) => { privateWif = privateKey.toWif() });
    const pubkey = PrivateKey.fromWif(privateWif).toPublic().toString();
    const prkey = PrivateKey.fromWif(privateWif).toString();
    const newAccount = fileName;

    /*
    * create new account
    */
    await this.api.transact({
      actions: [{
        account: 'eosio',
        name: newAccount,
        authorization: [{
          actor: this.account,
          permission: 'active',
        }],
        data: {
          creator: this.account,
          name: newAccount,
          owner: {
            threshold: 1,
            keys: [{
              key: pubkey,
              weight: 1
            }],
            accounts: [],
            waits: []
          },
          active: {
            threshold: 1,
            keys: [{
              key: pubkey,
              weight: 1
            }],
            accounts: [],
            waits: []
          },
        }
      }]
    });


    this.addKey(newAccount, pubkey, prkey);
    this.reloadApi();

    return {
      account: newAccount,
      publicKey: pubkey,
      privateKey: prkey
    };
  }

  async getFileInfo(objectId, rev, owner) {
    const timeElapsed = Date.now();
    const now = new Date(timeElapsed).toISOString();

    const result = await this.api.transact({
      actions: [{
        account: 'eosio',
        name: 'get_fileinfo',
        authorization: [{
          actor: owner,
          permission: `active`
        }],
        data: {
          rev: rev,
          time: now
        }
      }]
    });

    if (result.ok) {
      return {
        url: result.url,
        password: result.password
      };
    }
    else {
      return null;
    }
  }

  async setFileInfo(fileAccount, rev, url, password) {
    const result = await this.api.transact({
      actions: [{
        account: 'eosio',
        name: 'set_fileinfo',
        authorization: [{
          actor: fileAccount,
          permission: 'active'
        }],
        data: {
          rev: rev,
          url: url,
          password: password
        }
      }]
    });

    if (result.ok) {
      return true;
    }
    else {
      return false;
    }
  }

  async giveReadPermission(fileAccount, target) {
    const linkauth_input = {
      account: fileAccount,
      code: target,
      type: 'get_fileinfo',
      requirement: 'accessible',
    };

    const result = await api.transact({
      actions: [{
        account: 'eosio',
        name: 'linkauth',
        authorization: [{
          actor: fileAccount,
          permission: 'active',
        }],
        data: linkauth_input,
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

    return result;
  }

  async giveUpdagePermission(fileAccount, target) {
    const linkauth_input = {
      account: fileAccount,
      code: target,
      type: 'set_fileinfo',
      requirement: 'accessible',
    };

    const result = await api.transact({
      actions: [{
        account: 'eosio',
        name: 'linkauth',
        authorization: [{
          actor: fileAccount,
          permission: 'active',
        }],
        data: linkauth_input,
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

    return result;
  }

  async disgardReadPermission(fileAccount, target) {
    const unlinkauth_input = {
      account: fileAccount,
      code: target,
      type: 'get_fileinfo',
    };

    const result = await api.transact({
      actions: [{
        account: 'eosio',
        name: 'unlinkauth',
        authorization: [{
          actor: this.account,
          permission: 'active',
        }],
        data: unlinkauth_input,
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

    return result;
  }

  async disgardUpdagePermission(fileAccount, target) {
    const unlinkauth_input = {
      account: fileAccount,
      code: target,
      type: 'set_fileinfo',
    };

    const result = await api.transact({
      actions: [{
        account: 'eosio',
        name: 'unlinkauth',
        authorization: [{
          actor: this.account,
          permission: 'active',
        }],
        data: unlinkauth_input,
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

    return result;
  }
}