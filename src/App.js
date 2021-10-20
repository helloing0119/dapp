import React, { Component } from 'react';
import Sidebar from './components/templates/Sidebar';
import FileDetailPage from './components/pages/FileDetailPage';
import FileListPage from './components/pages/FileListPage';
import FileUploadPage from './components/pages/FileUploadPage';
import LoadingPage from './components/pages/LoadingPage';
import IntroPage from './components/pages/IntroPage';
import SidebarHeader from './components/items/SidebarHeader';

import { PageConst } from './components/utils/Consts';
import logo from './logo.svg';
import './App.css';
import './custom.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentPage: PageConst.INTRO_PAGE,
      eosConfig: null,
      userInfo: {
        did: "",
        publicKey: "",
        privateKey: ""
      },
      serverInfo: {
        did: "",
        endpoints: {
          collections: "",
          profiles: "",
          permissions: "",
          schema: ""
        }
      },
      fileSelection: null
    }

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFileSelection = this.handleFileSelection.bind(this);
  }

  componentDidMount() {
    //TODO : Get User Info from local file
    //TODO : Get Server Info from DIF Resolver
    //TODO : Set this.state.eosConfing
    this.setState({ loading: false });
  }

  handleFileSelection(target) {
    this.setState({
      currentPage: PageConst.FILE_DETAIL_PAGE,
      fileSelection: target
    });
  }

  handlePageChange(target, data = null) {
    this.setState({ currentPage: target });
  }

  renderPage() {
    const config = {
      userInfo: this.state.userInfo,
      serverInfo: this.state.serverInfo,
      eosConfig: this.state.eosConfig
    }

    switch (this.state.currentPage) {
      case PageConst.FILE_DETAIL_PAGE:
        return <FileDetailPage
          config={config}
          onSelectFile={this.handleFileSelection}
        />;

      case PageConst.FILE_UPLOAD_PAGE:
        return <FileUploadPage config={config} />;

      case PageConst.FILE_LIST_PAGE:
        return <FileListPage
          config={config}
          onSelectFile={this.handleFileSelection}
        />;

      case PageConst.INTRO_PAGE:
      default:
        return <IntroPage config={config} />;
    }
  }

  render() {
    if (this.state.loading) {
      return <div className="App">
        <LoadingPage />
      </div>
    }
    return (
      <div className="App">
        <div
          id="sidebar-holder"
          className="text-light bg-dark"
        >
          <SidebarHeader />
          <hr />
          <Sidebar onPageChange={this.handlePageChange} />
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