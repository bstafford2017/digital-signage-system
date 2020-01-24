import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

export class ItemList extends Component {
  render() {
    return this.props.titles.map(title => (
      <Item title={title} />
    ))
  }
}

ItemList.propTypes = {
  titles: PropTypes.array.isRequired
}

export default ItemList
