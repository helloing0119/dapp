import React, { Component } from 'react';
import { Form, Raw } from 'react-bootstrap';
import { FormText } from '../../utils/Languages';
import PropTypes from 'prop-types';

const propTypes = {
  onSaveConfig: PropTypes.func.isRequired
};

const defaultProps = {};

const config = require('electron-json-config');

export default class ConfigPage extends Component {
  constructor(props) {
    super(props);

    const userAccountInfo = config.get("userAccountInfo");
    const eosUrl = config.get("eosUrl");
    const hubUrl = config.get("hubUrl");
    const hubDid = config.get("hubDid");
    const myDid = config.get("myDid");
    const didServerUrl = config.get("didServerUrl");
    const publicKeyJwk = config.get("publicKeyJwk");

    this.state = {
      eosUrl: eosUrl ? eosUrl : "",
      didServerUrl: didServerUrl ? didServerUrl : "",
      hubUrl: hubUrl ? hubUrl : "",
      hubDid: hubDid ? hubDid : "",
      myDid: myDid ? myDid : "",
      account: userAccountInfo ? userAccountInfo.account : "",
      publicKey: userAccountInfo ? userAccountInfo.publicKey : "",
      privateKey: userAccountInfo ? userAccountInfo.privateKey : "",
      crv: publicKeyJwk ? publicKeyJwk.crv : "",
      kty: publicKeyJwk ? publicKeyJwk.kty : "",
      x: publicKeyJwk ? publicKeyJwk.x : "",
      y: publicKeyJwk ? publicKeyJwk.y : "",
      kid: publicKeyJwk ? publicKeyJwk.kid : ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ ...this.state, [name]: value });
  }

  handleSubmit() {
    const jwk = {
      crv: this.state.crv,
      kty: this.state.kty,
      x: this.state.x,
      y: this.state.y,
      kid: this.state.kid
    };
    config.set("publicKeyJwk", jwk);

    Object.keys(this.state).map((key, index) => {
      if (!["crv", "kty", "x", "y", "kid"].includes(key)) {
        config.set(key, this.state[key]);
      }
    });
    this.props.onSaveConfig();
  }

  render() {
    const handleSubmit = this.handleSubmit;
    const handleChange = this.handleChange;
    return <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="forEosUrl">
        <Form.Label column sm={2}>
          {FormText.English["eosUrl"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.eosUrl}
        />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formDidServerUrl">
        <Form.Label column sm={2}>
          {FormText.English["didServerUrl"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.didServerUrl}
        />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHubUrl">
        <Form.Label column sm={2}>
          {FormText.English["hubUrl"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.hubUrl} />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHubDid">
        <Form.Label column sm={2}>
          {FormText.English["hubDid"]}
        </Form.Label>
        <Form.Control defaultValue={this.state.hubDid} />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formMyDid">
        <Form.Label column sm={2}>
          {FormText.English["myDid"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.myDid} />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formAccount">
        <Form.Label column sm={2}>
          {FormText.English["account"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.account} />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPublicKey">
        <Form.Label column sm={2}>
          {FormText.English["publicKey"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.publicKey} />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPrivateKey">
        <Form.Label column sm={2}>
          {FormText.English["privateKey"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.privateKey} />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formCrv">
        <Form.Label column sm={2}>
          {FormText.English["crv"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.crv} />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formKty">
        <Form.Label column sm={2}>
          {FormText.English["kty"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.kty} />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formX">
        <Form.Label column sm={2}>
          {FormText.English["x"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.x} />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formY">
        <Form.Label column sm={2}>
          {FormText.English["y"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.y} />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formKid">
        <Form.Label column sm={2}>
          {FormText.English["kid"]}
        </Form.Label>
        <Form.Control
          onChange={handleChange}
          value={this.state.kid} />
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">{FormText.English["submit"]}</Button>
        </Col>
      </Form.Group>
    </Form>
  }
}

ConfigPage.propTypes = propTypes;
ConfigPage.defaultProps = defaultProps;