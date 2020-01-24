import React, { Component } from 'react'

export class Item extends Component {

  getStyle = () => {
    return {
      height: '150px',
      width: '150px',
      background: '#333',
      color: '#eee',
      textAlign: 'center'
    }
  }

  render() {
    return (
      <div className="" style={this.getStyle()}>

      </div>
    )
  }
}

export default Item
