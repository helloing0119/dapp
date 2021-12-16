import React, { Component } from 'react';
import { Mockupfiles } from '../utils/Mockup';
import PropTypes from 'prop-types';
import { PermissionConst } from '../../tils/Consts';
import FileList from '../templates/FileList';

import './FileListPage.scss';

import EosHandler from '../utils/handlers/EosHandler';
import HubHandler from '../utils/handlers/HubHandler';
import ResolveHandler from '../utils/handlers/ResolveHandler';

const propTypes = {
  config: PropTypes.shape({
    handler: PropTypes.shape({
      eosHandler: PropTypes.instanceOf(EosHandler),
      hubHandler: PropTypes.instanceOf(HubHandler),
      resolveHandler: PropTypes.instanceOf(ResolveHandler)
    }).isRequired,
    accounts: PropTypes.arrayOf(
      PropTypes.shape({
        account: PropTypes.string,
        publicKey: PropTypes.string,
        privateKey: PropTypes.string,
      })
    ).isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
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

export default class FileSearchPage extends Component {
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
    if (this.props.files) {
      this.setState({ files: this.props.files })
    }
    else {
      //TODO : Get File list from IH
      //TODO : setState -> files : [fileList]
      this.setState({ files: Mockupfiles });
    }
  }

  render() {
    return <div style={{ width: "100%" }}>
      <div className="filelist-holder">
        <FileList
          files={this.state.files}
          onSelectFile={this.handleSelectFile}
        />
      </div>
    </div>;
  }
};

FileSearchPage.propTypes = propTypes;
FileSearchPage.defaultProps = defaultProps;