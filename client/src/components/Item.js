import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';

export class Item extends Component {
  state = {
    displayCard: true
  }
  
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
      <Card style={{maxWidth: '320px', margin: '15px'}} className={this.state.displayCard ? '' : 'd-none'}>
        <CardImg width="100%" height="240px" src={'/img/' + this.props.file.title} />
        <CardBody>
        <CardTitle>{this.props.file.title}</CardTitle>
          <CardText>
            <small className="text-muted">Uploaded on {this.props.file.date}</small>
          </CardText>
          <Button style={btnStyle} onClick={this.props.delete.bind(this, this.props.file)}>&#10006;</Button>
        </CardBody>
      </Card>
    )
  }
}

Item.propTypes = {
  file: PropTypes.object.isRequired,
  delete: PropTypes.func.isRequired
}

export default Item
