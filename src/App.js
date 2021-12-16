import React, { Component } from 'react';
import Sidebar from './components/templates/Sidebar';
import FileListPage from './components/pages/FileListPage';
import FileSearchPage from './components/pages/FileSearchPage';
import ConfigPage from './components/pages/ConfigPage';
import SidebarHeader from './components/items/SidebarHeader';

import { PageConst } from './components/utils/Consts';
import logo from './logo.svg';
import './App.css';
import './custom.scss';

import { HttpResolver } from '@decentralized-identity/did-common-typescript';
import EosHandler from './utils/handlers/EosHandler';
import HubHandler from './utils/handlers/HubHandler';
import ResolveHandler from './components/utils/handlers/ResolveHandler';

const config = require('electron-json-config');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      loading: true,
      currentPage: PageConst.LOADING_PAGE,
      handlers: {
        eosHandler: null,
        hubHandler: null,
        resolveHandler: null
      },
      accounts: [],
      fileList: [],
      showFileDetail: false,
      showCommitTree: false,
      showModal: false,
      fileSelection: null
    }

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFileSelection = this.handleFileSelection.bind(this);
    this.reloadApp = this.reloadApp.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const loadable = await this.initApp();

    if (loadable) {
      this.setState({ currentPage:PageConst.FILE_LIST_PAGE});
      this.setState({ initialized: true });
      this.setState({ loading: false });
    }
    else {
      this.setState({ currentPage: PageConst.CONFIG_PAGE });
      this.setState({ loading: false });
    }
  }

  async reloadApp() {
    this.setState({ loading: true });
    const loadable = await this.initApp();

    if (loadable) {
      this.setState({ initialized: true });
      this.setState({ loading: false });
    }
    else {
      this.setState({ currentPage: PageConst.CONFIG_PAGE });
      this.setState({ loading: false });
    }
  }

  async initApp() {
    try {
      if (config.has('userAccountInfo')) {
        //user already has account
        //load user info
        const userAccountInfo = config.get('userAccountInfo');
        const fileAccountInfo = config.get('fileAccountInfo');
        const accounts = [].push.apply(userAccountInfo, fileAccountInfo);


        const eosUrl = config.get('eosUrl');
        const publicKeys = accounts.map(element => element.publicKey);
        const privateKeys = accounts.map(element => element.privateKey);
        const eosHandler = new EosHandler(publicKeys, privateKeys, eosUrl, userAccountInfo.account);

        const didServerUrl = config.get('didServerUrl');
        const httpResolver = new HttpResolver(didServerUrl);
        const resolveHandler = new ResolveHandler(httpResolver);

        const kid = config.get('publickKeyJwk').kid;

        const hubUrl = config.get('hubUrl');
        const hubDid = config.get('hubDid');
        const keys = { "kid": kid };
        const cryptoSuits = [new Secp256k1CryptoSuite()];
        const hubHandler = new HubHandler(hubDid, hubUrl, httpResolver, keys, cryptoSuits);

        this.setState({
          handlers: {
            eosHandler: eosHandler,
            hubHandler: hubHandler,
            resolveHandler: resolveHandler
          }
        });

        this.setState({ accounts: accounts });

        return true;
      }
      else {
        //user doesn't has account
        return false;
      }
    }
    catch (error) {
      return false;
    }
  }

  handleFileSelection(target) {
    this.setState({
      currentPage: PageConst.FILE_DETAIL_PAGE,
      fileSelection: target
    });
  }

  handlePageChange(page) {
    if(page === PageConst.FILE_UPLOAD_PAGE) {
      this.setState({showModal: true});
    }
    this.setState({ currentPage: page });
  }

  toggleModal(state) {
    this.setState({showModal: state});
  }

  renderPage() {
    const config = {
      handlers: this.state.handlers,
      account: this.state.accounts,
      files: []
    }

    if(this.state.loading) {
      return <LoadingPage />;
    }

    switch (this.state.currentPage) {
      case PageConst.FILE_SEARCH_PAGE:
        return <FileSearchPage
          config={config}
          onSelectFile={this.handleFileSelection}
        />;
      case PageConst.FILE_LIST_PAGE:
        return <FileListPage
          config={config}
          onSelectFile={this.handleFileSelection}
        />;

      case PageConst.CONFIG_PAGE:
      default:
        return <ConfigPage
          onSaveConfig={this.reloadApp}
        />;
    }
  }

  render() {
    return (
      <div className="App">
        <div
          id="sidebar-holder"
          className="text-light bg-dark"
        >
          <SidebarHeader />
          <hr />
          <Sidebar
            selected={this.state.currentPage}
            initialized={this.state.initialized}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div
          id="content-holder"
          className="bg-light"
        >
          {this.renderPage()}
        </div>
      </div>
    );
  }
};