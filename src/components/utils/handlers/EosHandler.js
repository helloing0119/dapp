import { Api, JsonRPC } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { PrivateKey, PublicKey, Signature, Aes, key_utils, config } from 'eosjs-ecc';
export default class EosHandler {
  constructor(publicKeys, privateKeys, url, account) {
    this.account = account ? account : null;
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
    //Todo : 
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
        name: 'newaccount',
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

    /*
    * allocate system resource
    */
    await this.api.transact({
      actions: [{
        account: 'eosio',
        name: 'buyrambytes',
        authorization: [{
          actor: this.account,
          permission: 'active',
        }],
        data: {
          payer: this.account,
          receiver: newAccount,
          bytes: 512,
        },
      },
      {
        account: 'eosio',
        name: 'delegatebw',
        authorization: [{
          actor: this.account,
          permission: 'active',
        }],
        data: {
          from: this.account,
          receiver: newAccount,
          stake_net_quantity: '1.0000 SYS',
          stake_cpu_quantity: '1.0000 SYS',
          transfer: false,
        }
      }
      ]
    });

    this.addKey(newAccount, pubkey, prkey);
    this.reloadApi();

    return {
      account: newAccount,
      publicKey: pubkey,
      privateKey: prkey
    };
  }

  async setPassword(fileAccount, password) {
    const linkauth_input = {
      account: fileAccount,
      code: fileAccount,
      type: 'get_password',
      requirement: 'accessible',
    };

    await api.transact({
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

    const result = await this.api.transact({
      actions: [{
        account: 'eosio',
        name: 'set_password',
        authorization: [{
          actor: fileAccount,
          permission: 'active'
        }],
        data: {
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

  async sharePassword(fileAccount, target) {
    const linkauth_input = {
      account: fileAccount,
      code: target,
      type: 'get_password',
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

  async disallowPassword(fileAccount, target) {
    const unlinkauth_input = {
      account: fileAccount,
      code: target,
      type: 'get_password',
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

  async getPassword(objectId, owner) {
    const timeElapsed = Date.now();
    const now = new Date(timeElapsed).toISOString();

    const result = await this.api.transact({
      actions: [{
        account: 'eosio',
        name: 'get_password',
        authorization: [{
          actor: owner,
          permission: `fileid${objectId}`
        }],
        data: {
          objectId: objectId,
          time: now
        }
      }]
    });

    if (result.ok) {
      return result.password;
    }
    else {
      return null;
    }
  }
}