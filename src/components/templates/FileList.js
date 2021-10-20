import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { PermissionConst } from '../utils/Consts';
import FileListItem from '../items/FileListItem';
import PropTypes from 'prop-types';

const propTypes = {
  commitFlag: PropTypes.bool,
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

const defaultProps = {
  commitFlag: false
};

export default class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelectFile = this.handleSelectFile.bind(this);
  }

  handleSelectFile(target) {
    this.props.onSelectFile(target);
  }

  render() {
    const commitFlag = this.props.commitFlag;
    const items = this.props.files.map((value) =>
      <FileListItem
        commitFlag={commitFlag}
        objectId={value.objectId}
        name={value.name}
        type={value.type}
        size={value.size}
        uploaded={value.uploaded}
        rev={value.rev}
        owner={value.owner}
        onClick={(() => this.handleSelectFile(value.objectId)).bind(this)}
        permission={value.permission}
        msg={value.msg}
      />
    );

    return <ListGroup>
      {items}
    </ListGroup>;
  }
};

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;