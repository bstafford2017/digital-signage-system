import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import PropTypes from 'prop-types'

export class ImageModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.display}>
        <ModalBody>
          <img width="100%" height="100%" src={'/img/' + this.props.img} alt={this.props.img} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.close}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ImageModal.propTypes = {
  display: PropTypes.bool.isRequired,
  img: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
}

export default ImageModal
