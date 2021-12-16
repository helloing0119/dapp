import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import SidebarItem from '../items/SidebarItem';
import SidebarHeader from '../items/SidebarHeader';
import { PageConst, IconConst } from '../../utils/Consts';
import { PageNameText } from '../../utils/Languages';

const propTypes = {
  selected: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  initialized: PropTypes.boolean.isRequired
};

const defaultProps = {};

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      items: this.props.initialized?[
        PageConst.FILE_LIST_PAGE,
        PageConst.FILE_SEARCH_PAGE,
        PageConst.FILE_UPLOAD_PAGE,
        PageConst.CONFIG_PAGE
      ]:[
        PageConst.CONFIG_PAGE
      ],
      icons: this.props.initialized?[
        IconConst.HOME,
        IconConst.OTHER_FILES,
        IconConst.FILE_UPLOAD,
        IconConst.CONFIG
      ]:[
        IconConst.CONFIG
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
        defaultActiveKey={this.state.selected}
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