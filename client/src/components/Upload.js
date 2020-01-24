import React, { Component } from 'react'

export class Upload extends Component {
  state = {
    title: ''
  }

  getStyle = () => {
    return {
      margin: '30px 0px'
    }
  }

  onChange = (event) => {
    console.log(event.target.value)
    this.setState({ title: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault()
    const newItem = {
      title: this.state.title
    }

    console.log(newItem)
  }

  render() {
    return (
      <form method="post" onSubmit={this.onSubmit} encType="multipart/form-data">
        <div className="form-group offset-sm-4 col-sm-4">
          <div style={this.getStyle()}>
            <label htmlFor="imageTitle">Image Title</label>
            <input type="text" name="title" className="form-control" 
              onChange={this.onChange} placeholder="Enter a descriptive title" id="imageTitle" required/>
            <small className="text-muted">**Please enter a title without any spaces</small>
          </div>
          <div style={this.getStyle()}>
            <input type="file" name="upload" className="form-control-file" id="selectFile" />
            <small className="text-muted">**Only .png, .jpeg, or jpg files</small>
          </div>
          <input type="submit" className="btn btn-dark offset-sm-5 col-sm-2" value="Upload File" />
        </div>
      </form>
    )
  }
}

export default Upload
