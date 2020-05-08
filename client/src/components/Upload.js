import React, { Component } from 'react'
import path from 'path'
import PropTypes from 'prop-types'
import { Form, FormGroup, Label, Input, FormText, Button, Col } from 'reactstrap'
import OverwriteModal from './OverwriteModal'

export class Upload extends Component {

  state = {
    title: null,
    file: null,
    displayModal: false
  }

  // Handle modal interaction
  modalClose = () => {
    this.setState({ displayModal: false })
  }

  modalContinue = () => {
    this.setState({ displayModal: false })
    this.props.submit(this.state.title, this.state.file)
    this.props.success(this.state.title)

    // Reset state
    document.getElementById('imageTitle').value = ''
    document.getElementById('file').value = null
    this.setState({ title: null, file: null, displayModal: false })
  }

  // Handle form interaction
  onChangeTitle = (event) => {
    event.target.value = event.target.value.replace(' ', '-')
    this.setState({ title: event.target.value })
  }

  onChangeFile = (event) => {
    this.setState({ file: event.target.files[0] })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if(this.state.title && this.state.file){
      this.setState({ title: this.state.title + path.extname(this.state.file.name).toLowerCase() }, () => {
        // Check if title is in array
        if(this.props.files.some(file => file.title === this.state.title)){
          this.setState({ displayModal: true })
        } else {
          // Call submit function in App.js
          this.props.submit(this.state.title, this.state.file)
          this.props.success(this.state.title)

          // Reset state
          document.getElementById('imageTitle').value = ''
          document.getElementById('file').value = null
          this.setState({ title: null, file: null, displayModal: false })
        }
      })
    } else {
      this.props.error('Missing title or file when attempting to upload')
    }
  }

  render() {
    return (
      <React.Fragment>
        <OverwriteModal display={this.state.displayModal} continue={this.modalContinue} close={this.modalClose} />
        <Form method="post" onSubmit={this.onSubmit} encType="multipart/form-data">
        <Col sm={{size: 4, offset:4}}>
          <FormGroup style={{margin: '30px 0px'}}>
            <Label htmlFor="imageTitle">Image Title</Label>
            <Input type="text" name="title" id="imageTitle" 
            onChange={this.onChangeTitle} placeholder="Enter a descriptive title" />
          </FormGroup>
          <FormGroup style={{margin: '30px 0px'}}>
            <Input type="file" name="upload" onChange={this.onChangeFile} id="file" />
            <FormText color="muted">
              *Only .png, .jpeg, or .jpg files
            </FormText>
          </FormGroup>
          <Col sm={{size: 2, offset:5}}>
            <Button color="dark" value="Upload">Upload</Button>
          </Col>
        </Col>
        <p style={{minHeight: '451px'}}></p>
      </Form>
      </React.Fragment>
    )
  }
}

export default Upload

Upload.propTypes = {
  files: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
  success: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired
}
