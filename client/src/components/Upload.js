import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Upload extends Component {
  state = {
    title: null,
    file: null,
    disabled: false
  }

  displayButton = () => {
    this.setState({ 
      title: this.state.title,
      file: this.state.file,
      disabled: false
    })
  }

  getStyle = () => {
    return {
      margin: '30px 0px'
    }
  }

  onChangeTitle = (event) => {
    this.setState({ 
      title: event.target.value,
      file: null,
      disabled: this.state.disabled
    })
    if(this.state.title && this.state.file){
      this.displayButton()
    }
  }

  onChangeFile = (event) => {
    this.setState({ 
      title: this.state.title,
      file: event.target.files[0],
      disabled: this.state.disabled
    })
    if(this.state.title && this.state.file){
      this.displayButton()
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    if(this.state.file === null || this.state.title == null){
      // Call submit function in App.js
      this.props.submit(this.state.title, this.state.file)
    } else {
      alert('Missing file tile or attached file!')
    }
  }

  render() {
    return (
      <form method="post" onSubmit={this.onSubmit} encType="multipart/form-data">
        <div className="form-group offset-sm-4 col-sm-4">
          <div style={this.getStyle()}>
            <label htmlFor="imageTitle">Image Title</label>
            <input type="text" name="title" className="form-control" 
              onChange={this.onChangeTitle} placeholder="Enter a descriptive title" id="imageTitle" required/>
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
