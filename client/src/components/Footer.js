import React, { Component } from 'react'
import Item from '../componentsItem'

export class Footer extends Component {
  getStyle = () => {
    return {
      background: '#333',
      color: '#eee',
      textAlign: 'center'
    }
  }
  
  render() {
    return (
      <div className="" style={footer}>
        <Item />
      </div>
    )
  }
}

export default Footer
