import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';

export class Item extends Component {
  render() {
    const btnStyle = {
      backgroundColor: '#dd0000',
      color: '#fff',
      border: 'none',
      padding: '5px 9px',
      borderRadius: '50%',
      cursor: 'pointer',
      float: 'right',
      height: '32px'
    }

    return (
      <Card style={{maxWidth: '320px', margin: '15px'}}>
        <CardImg width="100%" height="240px" src={'/img/' + this.props.title} />
        <CardBody>
        <CardTitle>{this.props.title}</CardTitle>
          <CardText>
            <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
          <Button style={btnStyle} onClick={this.props.delete.bind(this, this.props.title)}>&#10006;</Button>
        </CardBody>
      </Card>
    )
  }
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  delete: PropTypes.func.isRequired
}

export default Item
