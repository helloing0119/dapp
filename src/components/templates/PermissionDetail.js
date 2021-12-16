import React, { Component } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { TemplateText, CommitText } from '../../utils/Languages';
import { IconConst, PageConst, PermissionConst } from '../../utils/Consts';
import { PermissionText } from '../../utils/Languages';
import PropTypes from 'prop-types';

import './FileDetail.scss';
import BootstrapIcon from '../items/BootstrapIcon';

const propTypes = {
  objectId: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  uploaded: PropTypes.string,
  rev: PropTypes.string,
  msg: PropTypes.string,
  permission: PropTypes.oneOf(Object.values(PermissionConst)),
  readPermission: PropTypes.number,
  updatePermission: PropTypes.number,
  owner: PropTypes.string,
  onAskReadPermission: PropTypes.func,
  onAskUpdatePermission: PropTypes.func,
  onCheckReadRequest: PropTypes.func,
  onCheckUpdateRequest: PropTypes.func,
};

const defaultProps = {
  simple: false
};

export default class PermissionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlePermissionRequest = this.handlePermissionRequest.bind(this);
  }

  handlePermissionRequest() {

  }

  render() {
    const readRequests = <span onClick={this.props.onCheckReadRequest}>
      {this.props.readPermission}
    </span>;

    const updateRequests = <span onClick={this.props.onCheckUpdateRequest}>
      {this.props.updatePermission}
    </span>;

    const readAsk = <span onClick={this.props.onAskReadPermission}>
      {PermissionText.Korean["unapproved"]}
    </span>;

    const updateAsk = <span onClick={this.props.onAskUpdatePermission}>
      {PermissionText.Korean["unapproved"]}
    </span>;

    const approved = <span>{PermissionText.Korean["approved"]}</span>

    return <div
      className="filedetail-card-holder"
    >
      <Card>
        <Card.Header as="h5">
          <BootstrapIcon content={IconConst.FILE_DETAIL} />
          {PageNameText.English.FILE_DETAIL_PAGE}
        </Card.Header>
        <Card.Body>
          <Card.Title
            className="text-right"
          >
          </Card.Title>
          <Card.Text
            className="float-right text-right"
          >
            <Table>
              <tbody>
                {
                  this.props.type ?
                    <tr>
                      <td style={{ width: "6em" }}>{PermissionText.Korean["read"]}:</td>
                      <td>
                        {
                          this.props.permission == PermissionConst.OWNED ?
                            readRequests
                            : (this.props.permission == PermissionConst.approved || this.props.permission == PermissionConst.READONLY ?
                              approved : readAsk)
                        }
                      </td>
                    </tr>
                    : null
                }
                {
                  this.props.size ?
                    <tr>
                      <td style={{ width: "6em" }}>{PermissionText.Korean["update"]}:</td>
                      <td>
                        {
                          this.props.permission == PermissionConst.OWNED ?
                            updateRequests
                            : (this.props.permission == PermissionConst.approved ?
                              approved : updateAsk)
                        }</td>
                    </tr>
                    : null
                }
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>;
  }
};

PermissionDetail.propTypes = propTypes;
PermissionDetail.defaultProps = defaultProps;