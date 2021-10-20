import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { IconConst } from '../utils/Consts';
import { TemplateText } from '../utils/Languages';
import BootstrapIcon from '../items/BootstrapIcon';

const propTypes = {
  onSearch: PropTypes.func.isRequired
};

const defaultProps = {};

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: TemplateText.Korean["search"]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ query: e.target.value });
  }

  handleSubmit() {
    this.props.onSearch(this.state.query);
  }

  render() {
    return <InputGroup
      style={{ width: "100%", height: "100%" }}
    >
      <FormControl
        placeholder={TemplateText.Korean["search"]}
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={this.handleInputChange}
      />
      <Button
        className="bg-primary outline-light"
        id="button-search-addon"
        onClick={this.handleSubmit}
      >
        <BootstrapIcon
          width="1em"
          height="1em"
          content={IconConst.SEARCH}
        />
      </Button>
    </InputGroup>
  }
};

Searchbar.propTypes = propTypes;
Searchbar.defaultProps = defaultProps;