import React, { Component } from 'react'

export class Modal extends Component {
  render() {
    return (
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Overwrite?</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>If you click continue, you will overwriting a file with the same title</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Continue</button>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
