import React, { Component } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import { PermissionConst } from '../utils/Consts';
import { CommitText } from '../utils/Languages';
import PropTypes from 'prop-types';

const propTypes = {
  selected: PropTypes.Boolean.isRequired,
  objectId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  uploaded: PropTypes.string.isRequired,
  rev: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  permission: PropTypes.string,
  msg: PropTypes.string
};

const defaultProps = {
  permission: PermissionConst.DEFAULT,
};

export default class FileListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelectFile = this.handleSelectFile.bind(this);
  }

  handleSelectFile() {
    this.props.onClick();
  }

  render() {
    const permission = this.props.permission;
    return <ListGroup.Item
      action={this.props.permission === PermissionConst.DENIED ? undefined : true}
      variant={this.state.selected ? "danger" : undefined}
      onClick={this.handleSelectFile}
    >
      <div className="FileList-item-content">
        <Table>
          <tbody>
            <tr>
              <td colSpan="3">{this.props.name}</td>
              <td>{this.props.owner}</td>
              <td colSpan="2">{this.props.uploaded}</td>
              <td>{this.props.size}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </ListGroup.Item>;
  }
};

FileListItem.propTypes = propTypes;
FileListItem.defaultProps = defaultProps;