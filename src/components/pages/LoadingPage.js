import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {};

export default class LoadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div><h1>E</h1></div>;
  }
};

LoadingPage.propTypes = propTypes;
LoadingPage.defaultProps = defaultProps;