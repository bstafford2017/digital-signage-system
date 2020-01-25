import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Upload extends Component {

  state = {
    title: null,
    file: null,
    disabled: true,
    alertSuccess: false,
    alertError: false,
  }

  getStyle = () => {
    return {
      margin: '30px 0px'
    }
  }

  onChangeBoth = () => {
    this.setState({ 
      disabled: false
    })
  }

  onChangeTitle = (event) => {
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
      } else {
        this.setState({ alertError: true, alertSuccess: false })
      }
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if(this.state.title && this.state.file){
      this.setState({ alertError: false, alertSuccess: true })

      // Call submit function in App.js
      this.props.submit(this.state.title, this.state.file)
    } else {
      this.setState({ alertError: true, alertSuccess: false })
    }
  }

  render() {
    return (
      <form method="post" onSubmit={this.onSubmit} encType="multipart/form-data">
        <div className={
          this.state.alertError ? 'alert alert-danger alert-dismissible fade show' : 'd-none'} 
          role="alert">
          Missing file tile or attached file!
        </div>
        <div className={
          this.state.alertSuccess ? 'alert alert-success alert-dismissible fade show' : 'd-none'} 
          role="alert">
          Successfully uploaded {this.state.title}!
        </div>
        <div className="form-group offset-sm-4 col-sm-4">
          <div style={this.getStyle()}>
            <label htmlFor="imageTitle">Image Title</label>
            <input type="text" name="title" className="form-control" 
              onChange={this.onChangeTitle} placeholder="Enter a descriptive title" id="imageTitle"/>
            <small className="text-muted">*Please enter a title without any spaces</small>
          </div>
          <div style={this.getStyle()}>
            <input type="file" name="upload" className="form-control-file" onChange={this.onChangeFile} id="selectFile" />
            <small className="text-muted">*Only .png, .jpeg, or jpg files</small>
          </div>
          <input type="submit" className="btn btn-dark offset-sm-5 col-sm-2" value="Upload" required/>
        </div>
      </form>
    )
  }
}

export default Upload

Upload.propTypes = {
  submit: PropTypes.func.isRequired
}
