import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import BootstrapIcon from './BootstrapIcon';
import './SidebarItem.css';

const propTypes = {
  eventKey: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  icon: PropTypes.string
};

const defaultProps = {};

export default class SidebarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Nav.Item>
      <Nav.Link href="#" eventKey={this.props.eventKey}>
        {this.props.icon ? <BootstrapIcon content={this.props.icon} width="1.25em" height="1.25em" /> : null}
        <span className="sidebar-content-text">{this.props.content}</span>
      </Nav.Link>
    </Nav.Item>;
  }
};

SidebarItem.propTypes = propTypes;
SidebarItem.defaultProps = defaultProps;