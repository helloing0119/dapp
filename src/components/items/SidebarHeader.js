import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconConst } from '../utils/Consts';
import BootstrapIcon from './BootstrapIcon';

import './SidebarHeader.scss';

const propTypes = {
  icon: PropTypes.string
};

const defaultProps = {
  icon: IconConst.LOGO
};

export default class SidebarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div
      className="text-light"
      style={{ margin: "16px 0px 16px 0px" }}
    >
      {this.props.icon ?
        <BootstrapIcon content={this.props.icon} width="1.5em" height="1.5em" />
        : <BootstrapIcon content={IconConst.LOGO} width="1.5em" height="1.5em" />
      }
      <span className="sidebar-header-text">Blocker</span>
    </div>;
  }
};

SidebarHeader.propTypes = propTypes;
SidebarHeader.defaultProps = defaultProps;