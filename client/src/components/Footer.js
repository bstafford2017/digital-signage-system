import React, { Component } from 'react'

export class Footer extends Component {
  
  render() {
    return (
      <div className="bg-dark relative-bottom text-center text-white" 
        style={{height: '175px', width: '100%', padding: '40px', lineHeight: '1'}}>
        <p>Benjamin Stafford &copy; 2020</p>
        <p>School of Electrical Engineering and Computer Science</p>
        <p>Univeristy of North Dakota</p>
      </div>
    )
  }
}

export default Footer
