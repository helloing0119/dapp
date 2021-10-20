import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import SidebarItem from '../items/SidebarItem';
import SidebarHeader from '../items/SidebarHeader';
import { PageConst, IconConst } from '../utils/Consts';
import { PageNameText } from '../utils/Languages';

const propTypes = {
  onPageChange: PropTypes.func.isRequired
};

const defaultProps = {};

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: PageConst.INTRO_PAGE,
      items: [
        PageConst.INTRO_PAGE,
        PageConst.FILE_LIST_PAGE,
        PageConst.FILE_UPLOAD_PAGE
      ],
      icons: [
        IconConst.HOME,
        IconConst.FILE_LIST,
        IconConst.FILE_UPLOAD
      ]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onPageChange(e);
  }

  render() {
    const items = this.state.items.map((value, i) =>
      <SidebarItem
        eventKey={value}
        content={PageNameText.Korean[value]}
        icon={this.state.icons[i]}
      />
    );
    return <>
      <Nav
        className="flex-column mb-auto"
        defaultActiveKey={this.state.items[0]}
        variant="pills"
        onSelect={(eventKey) => this.handleChange(eventKey)}
      >
        {items}
      </Nav>
    </>;
  }
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;