import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {};


export default class LoadingPage extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return <h1>Loading...</h1>
  }
}

LoadingPage.propTypes = propTypes;
LoadingPage.defaultProps = defaultProps;