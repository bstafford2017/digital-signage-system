import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
        {this.props.title}
      </div>
    )
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired
}

export default Item
