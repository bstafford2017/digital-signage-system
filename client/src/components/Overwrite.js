import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import PropTypes from 'prop-types'

export class Overwrite extends Component {

  render() {
    return (
      <Modal isOpen={this.props.displayModal}>
        <ModalHeader>Overwrite file?</ModalHeader>
        <ModalBody>
          If you want to overwrite the current file with this title, 
          click 'continue'. Otherwise, select 'close' and type in a new unique title name.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.close}>Close</Button>{' '}
          <Button color="secondary" onClick={this.props.continue}>Continue</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

Overwrite.propTypes = {
  displayModal: PropTypes.bool.isRequired,
  continue: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}

export default Overwrite
