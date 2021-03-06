import React, { Component } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { TemplateText, CommitText } from '../utils/Languages';
import { PermissionConst } from '../utils/Consts';
import PropTypes from 'prop-types';

import './FileDetail.scss';

const propTypes = {
  objectId: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  uploaded: PropTypes.string,
  rev: PropTypes.string,
  msg: PropTypes.string,
  permission: PropTypes.oneOf(Object.values(PermissionConst)),
  owner: PropTypes.string,
  onDownload: PropTypes.func,
  onPermissionRequest: PropTypes.func,
  onSubmit: PropTypes.func
};

const defaultProps = {
  simple: false
};

export default class FileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDownload = this.handleDownload.bind(this);
    this.handlePermissionRequest = this.handlePermissionRequest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDownload() {

  }

  handlePermissionRequest() {

  }

  handleSubmit() {

  }

  render() {
    return <div
      className="filedetail-card-holder"
    >
      <Card>
        <Card.Header as="h5">
          {this.props.name}
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
                      <td style={{ width: "6em" }}>{CommitText.Korean["type"]}</td>
                      <td>{this.props.type}</td>
                    </tr>
                    : null
                }
                {
                  this.props.size ?
                    <tr>
                      <td style={{ width: "6em" }}>{CommitText.Korean["size"]}</td>
                      <td>{this.props.size}</td>
                    </tr>
                    : null
                }
                {
                  this.props.ownwer ?
                    <tr>
                      <td style={{ width: "6em" }}>{CommitText.Korean["owner"]}</td>
                      <td>{this.props.owner}</td>
                    </tr>
                    : null
                }
                {
                  this.props.rev ?
                    <tr>
                      <td style={{ width: "6em" }}>{CommitText.Korean["rev"]}</td>
                      <td>{this.props.rev}</td>
                    </tr>
                    : null
                }
                {
                  this.props.uploaded ?
                    <tr>
                      <td style={{ width: "6em" }}>{CommitText.Korean["uploaded"]}</td>
                      <td>{this.props.uploaded}</td>
                    </tr>
                    : null
                }
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
          </Card.Text>
          {
            this.props.onPermissionRequest ?
              <Button
                className="text-light"
                style={{ "margin-right": "1em" }}
                variant="primary"
                onClick={this.handlePermissionRequest}
              >
                {TemplateText.Korean["askPermission"]}
              </Button>
              : null
          }
          {
            this.props.onDownload ?
              <Button
                className="text-light"
                style={{ "margin-right": "1em" }}
                variant="secondary"
                onClick={this.handleDownload}
              >
                {TemplateText.Korean["download"]}
              </Button>
              : null
          }
          {
            this.props.onSubmit ?
              <Button
                className="text-light"
                style={{ "margin-right": "1em" }}
                variant="success"
                onClick={this.handleSubmit}
              >
                {TemplateText.Korean["download"]}
              </Button>
              : null
          }
        </Card.Body>
      </Card>
    </div>;
  }
};

FileDetail.propTypes = propTypes;
FileDetail.defaultProps = defaultProps;