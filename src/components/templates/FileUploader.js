import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'dropzone';
import '../utils/dropzone/dropzone.css';
import 'dropzone/dist/dropzone.css';

const propTypes = {
  onAddFile: PropTypes.func.isRequired
};

const defaultProps = {};

export default class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropzoneInstance: null
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(file) {
    this.props.onAddFile(file);
  }

  componentDidMount() {
    Dropzone.autoDiscover = false;
    let dropzoneInstance = new Dropzone("#file-upload-zone");
    dropzoneInstance.on("addedfile", file => {
      this.handleFileUpload(file);
    });
    //initialize dropzone
    this.setState({ dropzoneInstance: dropzoneInstance });
  }

  render() {
    return <form
      action="/"
      id="file-upload-zone"
      className="dropzone"
    />;
  }
};

FileUploader.propTypes = propTypes;
FileUploader.defaultProps = defaultProps;