import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import { Row, Alert } from 'reactstrap';

export class ItemList extends Component {
  render() {
    // If no files in uploads folder
    if(this.props.files.length === 0){
      return (
        <Alert color="dark" className="text-center col-sm-4 offset-sm-4" style={{marginTop: '80px'}}>There are no files uploaded yet!</Alert>
      )
    }

    return (
      <Row xs="1" md="2">
        {this.props.files.map(file => 
          <Item file={file} delete={this.props.delete} />
        )}
      </Row>
    )

  }
}

ItemList.propTypes = {
  files: PropTypes.array.isRequired,
  delete: PropTypes.func.isRequired
}

export default ItemList
