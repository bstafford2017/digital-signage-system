import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import { Container, Row } from 'reactstrap';

export class ItemList extends Component {
  render() {
    const items = this.props.files.map(file => 
      <Item file={file} delete={this.props.delete}/>
    )
    return (
      <Container>
        <Row sm="2">
          {items}
        </Row>
      </Container>
    )
  }
}

ItemList.propTypes = {
  files: PropTypes.array.isRequired,
  delete: PropTypes.func.isRequired
}

export default ItemList
