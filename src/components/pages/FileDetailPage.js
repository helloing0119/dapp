import React, { Component } from 'react';
import { Mockupfiles } from '../utils/Mockup';
import PropTypes from 'prop-types';
import { PermissionConst } from '../utils/Consts';
import FileList from '../templates/FileList';
import FileDetail from '../templates/FileDetail';

import './FileDetailPage.scss';

const propTypes = {
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
  data: PropTypes.shape({
    objectId: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    uploaded: PropTypes.string,
    did: PropTypes.string,
    url: PropTypes.string,
    rev: PropTypes.string,
    msg: PropTypes.string,
    permission: PropTypes.oneOf(Object.values(PermissionConst)),
    owner: PropTypes.string
  }),
  commits: PropTypes.arrayOf(
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

export default class FileDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      commits: [],
      downloading: false,
      loading: false
    };

    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handlePermissionRequest = this.handlePermissionRequest.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleSelectFile(target) {
    this.props.onSelectFile(target);
  }

  handlePermissionRequest(data = this.props.data) {
    //TODO : reqeust permission with file: data
  }

  handleDownload(valutUrl) {
    //set downloading true to prevent double searching
    this.setState({ downloading: true });
    //TODO : request to IH server
    //TODO : parse response
    //TODO : this.setState({commits : parsed})
    this.setState({ downloading: false })
  }

  componentDidMount() {
    if (this.props.data && this.props.commits) {
      this.setState({ data: this.props.data, commits: this.props.commits });
    }
    else {
      this.setState({ loading: true });
      //TODO : Get file data from IH
      //TODO : setState -> file : file
      //TODO : Get commit list from IH
      //TODO : setState -> commits : [fileList]
      this.setState({ file: Mockupfiles[0] });
      this.setState({ commits: Mockupfiles });

      this.setState({ loading: false });
    }
  }

  render() {
    return <div>
      <div className="filedetail-holder">
        <FileDetail
          objectId={this.state.file.objectId}
          name={this.state.file.name}
          type={this.state.file.type}
          size={this.state.file.size}
          uploaded={this.state.file.uploaded}
          did={this.state.file.did}
          url={this.state.file.url}
          rev={this.state.file.rev}
          msg={this.state.file.msg}
          permission={this.state.file.permission}
          owner={this.state.file.owner}
          onDownload={this.handleDownload}
          onPermissionRequest={this.handlePermissionRequest}
        />
      </div>
      <div className="commitlist-holder">
        <FileList
          commitFlag={true}
          files={this.state.commits}
          onSelectFile={this.handleSelectFile}
        />
      </div>
    </div>;
  }
};

FileDetailPage.propTypes = propTypes;
FileDetailPage.defaultProps = defaultProps;