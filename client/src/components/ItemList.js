import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import { Row, Alert } from 'reactstrap';

export class ItemList extends Component {
  render() {
    let items
    if(this.props.files.length > 0){
      items = this.props.files.map(file => 
        <Item file={file} delete={this.props.delete}/>
      )
    } else {
      items = <Alert color="dark" className="text-center col-sm-4 offset-sm-4" style={{marginTop: '80px'}}>There are no files uploaded yet!</Alert>
    }
    return (
      <Row sm="2">
        {items}
      </Row>
    )
  }
}

ItemList.propTypes = {
  files: PropTypes.array.isRequired,
  delete: PropTypes.func.isRequired
}

export default ItemList
