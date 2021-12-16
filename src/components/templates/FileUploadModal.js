import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileUploader from '../items/FileUploader';
import FileDetail from './FileDetail';

const propTypes = {
  onSubmit: PropTypes.func.isRequired
};

const defaultProps = {};

export default class FileUploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(file) {
    this.setState({ file: file });
  }

  handleSubmit() {
    this.props.onSubmit();
  }

  render() {
    return <div>
      <div className="file-uploader-holder">
        <FileUploader
          onAddFile={this.handleFileUpload}
        />
      </div>
      {
        this.state.file ?
          <div className="file-descryption-holder">
            <FileDetail
              name={this.state.file.name}
              type={this.state.file.type}
              size={(this.state.file.size / 1024) + "kb"}
              onSubmit={this.handleSubmit}
            />
          </div>
          : null
      }
    </div>;
  }
};

FileUploadModal.propTypes = propTypes;
FileUploadModal.defaultProps = defaultProps;