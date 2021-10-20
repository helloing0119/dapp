import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileUploader from '../templates/FileUploader';
import FileDetail from '../templates/FileDetail';

const propTypes = {
};

const defaultProps = {};

export default class FileUploadPage extends Component {
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
            />
          </div>
          : null
      }
    </div>;
  }
};

FileUploadPage.propTypes = propTypes;
FileUploadPage.defaultProps = defaultProps;