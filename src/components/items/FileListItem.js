import React, { Component } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import { PermissionConst } from '../utils/Consts';
import { CommitText } from '../utils/Languages';
import PropTypes from 'prop-types';

const propTypes = {
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
      className="bg-white text-dark"
      action={this.props.permission === PermissionConst.DENIED ? undefined : true}
      variant={
        permission === PermissionConst.ALLOWED ? "primary" :
          (permission === PermissionConst.OWNED ? "primary" :
            (permission === PermissionConst.DENIED ? "warning" :
              undefined)
          )
      }
      onClick={this.handleSelectFile}
    >
      {this.props.commitFlag ?
        null :
        <div className="FileList-item-header d-flex w-100 align-items-center justify-content-between">
          <strong className="mb-1" style={{ fontSize: "1.5em" }}>{this.props.name}</strong>
          <small className="mb-1">{CommitText.Korean["size"] + " : " + this.props.size}</small>
        </div>
      }
      <div className="FileList-item-content">
        <Table>
          <tbody>
            <tr>
              <td style={{ width: "6em" }}>{CommitText.Korean["owner"]}</td>
              <td>{this.props.owner}</td>
            </tr>
            <tr>
              <td style={{ width: "6em" }}>{CommitText.Korean["rev"]}</td>
              <td>{this.props.rev}</td>
            </tr>
            <tr>
              <td style={{ width: "6em" }}>{CommitText.Korean["uploaded"]}</td>
              <td>{this.props.uploaded}</td>
            </tr>
            <tr>
              <td style={{ width: "6em" }}>{CommitText.Korean["msg"]}</td>
              <td>
                {this.props.msg ?
                  this.props.msg :
                  CommitText.Korean["defaultMsg"]
                }
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </ListGroup.Item>;
  }
};

FileListItem.propTypes = propTypes;
FileListItem.defaultProps = defaultProps;