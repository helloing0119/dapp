import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  visible: PropTypes.boolean.isRequired,
  toggleVisiblity: PropTypes.func.isRequired,
  footer: PropTypes.element
};

const defaultProps = {};

export default class ModalContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.setVisible = this.setVisible.bind(this);
  }

  setVisible(state) {
    this.props.toggleVisiblity(state);
  }

  render() {
    const visible = this.props.visible;

    return <>
      <Modal show={visible} onHide={() => this.setVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.content}
        </Modal.Body>
      </Modal>
    </>;
  }
};

ModalContainer.propTypes = propTypes;
ModalContainer.defaultProps = defaultProps;