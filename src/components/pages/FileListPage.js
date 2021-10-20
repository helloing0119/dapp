import React, { Component } from 'react';
import { Mockupfiles } from '../utils/Mockup';
import PropTypes from 'prop-types';
import { PermissionConst } from '../utils/Consts';
import FileList from '../templates/FileList';
import Searchbar from '../templates/Searchbar';

import './FileListPage.scss';

const propTypes = {
  commitFlag: PropTypes.bool,
  config: PropTypes.shape({
    //todo : eosConfig
    //-> PropTypes.instanceOf(eosconfig)
    eosConfig: PropTypes.any,
    userInfo: PropTypes.shape({
      did: PropTypes.string,
      publicKey: PropTypes.string,
      privateKey: PropTypes.string
    }).isRequired,
    serverInfo: PropTypes.shape({
      did: PropTypes.string,
      endpoints: PropTypes.shape({
        collections: PropTypes.string,
        profiles: PropTypes.string,
        permissions: PropTypes.string,
        schema: PropTypes.string
      })
    })
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      objectId: PropTypes.number,
      name: PropTypes.string,
      type: PropTypes.string,
      size: PropTypes.string,
      uploaded: PropTypes.string,
      rev: PropTypes.string,
      msg: PropTypes.string,
      permission: PropTypes.oneOf(Object.values(PermissionConst)),
      owner: PropTypes.string
    })
  ),
  onSelectFile: PropTypes.func.isRequired
};

const defaultProps = {};

export default class FileListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      searching: false
    };

    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSelectFile(target) {
    this.props.onSelectFile(target);
  }

  handleSearch(query) {
    //set searching as true to prevent double searching
    this.setState({ searching: true });
    //TODO : request to IH server
    //TODO : parse response
    //TODO : this.setState({files : parsed})
    this.setState({ searching: false })
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({ files: this.props.data })
    }
    else {
      //TODO : Get File list from IH
      //TODO : setState -> files : [fileList]
      this.setState({ files: Mockupfiles });
    }
  }

  render() {
    return <div style={{ width: "100%" }}>
      <div className="searchbar-holder bg-primary">
        <Searchbar onSearch={this.handleSearch} />
      </div>
      <div className="filelist-holder">
        <FileList
          files={this.state.files}
          onSelectFile={this.handleSelectFile}
        />
      </div>
    </div>;
  }
};

FileListPage.propTypes = propTypes;
FileListPage.defaultProps = defaultProps;