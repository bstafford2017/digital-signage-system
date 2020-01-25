import React, { Component } from 'react'
import path from 'path'
import PropTypes from 'prop-types'
import { Form, FormGroup, Label, Input, FormText, Button, Col } from 'reactstrap'

export class Upload extends Component {

  state = {
    title: null,
    file: null,
    disabled: true
  }

  onChangeBoth = () => {
    this.setState({ 
      disabled: false
    })
  }

  onChangeTitle = (event) => {
    event.target.value = event.target.value.replace(' ', '-')
    this.setState({ title: event.target.value }, () => {
      console.log(this.state.title + " " + this.state.file)
      if(this.state.title && this.state.file){
        this.onChangeBoth()
      } 
    })
  }

  onChangeFile = (event) => {
    this.setState({ file: event.target.files[0] }, () => {
      console.log(this.state.title + " " + this.state.file)
      if(this.state.title && this.state.file){
        this.onChangeBoth()
      }
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if(this.state.title && this.state.file){
      this.setState({ title: this.state.title + path.extname(this.state.file.name).toLowerCase() }, () => {
        // Call submit function in App.js
        if(this.props.submit(this.state.title, this.state.file)){
          this.props.success(this.state.title)
        }
      })
    } else {
      this.props.error()
    }
  }

  render() {
    return (
      <Form method="post" onSubmit={this.onSubmit} encType="multipart/form-data">
        <Col sm={{size: 4, offset:4}}>
          <FormGroup style={{margin: '30px 0px'}}>
            <Label htmlFor="imageTitle">Image Title</Label>
            <Input type="text" name="title" id="imageTitle" 
            onChange={this.onChangeTitle} placeholder="Enter a descriptive title" />
          </FormGroup>
          <FormGroup style={{margin: '30px 0px'}}>
            <Input type="file" name="upload" onChange={this.onChangeFile} />
            <FormText color="muted">
              *Only .png, .jpeg, or .jpg files
            </FormText>
          </FormGroup>
          <Col sm={{size: 2, offset:5}}>
            <Button color="dark" value="Upload">Upload</Button>
          </Col>
        </Col>
      </Form>
    )
  }
}

export default Upload

Upload.propTypes = {
  submit: PropTypes.func.isRequired,
  success: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired
}
