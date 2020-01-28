import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'
import path from 'path'
import { Alert, Col, Container } from 'reactstrap'
import Navbar from './components/Navbar'
import Upload from './components/Upload'
import ItemList from './components/ItemList'
import Footer from './components/Footer'
import Overwrite from './components/Overwrite'
import './App.css';

class App extends Component {
  file = null
  title = null

  // Setup state to hold files
  state = {
    files: [],
    displayModal: false,
    modalResponse: null,
    success: false,
    error: false,
    uploadedTitle: null
  }

  // Get uploads on load
  componentDidMount() {
    axios.get('/api/upload')
      .then(res => {
        // ** Change to blank response
        if(res.data.msg !== 'No Files uploaded yet!'){
          this.setState({ files: res.data })
        }
      })
  }

  modalClose = () => {
    this.setState({ displayModal: false })
    this.setState({ modalResponse: 'close' })
  }

  modalContinue = () => {
    this.setState({ displayModal: false })
    const data = new FormData()
    data.append('file', this.file)
    data.append('title', this.title)
    axios.post('/api/upload', data, { title: this.title })
      .then(res => this.setState({ files: [...this.state.files, this.title] }))
    this.setState({ modalResponse: 'continue' })
  }

  removeAlert = () => {
    this.setState({ success: false, error: false })
  }

  alertSuccess = (title) => {
    this.setState({ uploadedTitle: title, success: true, error: false }, () => {return})
  }

  alertError = () => {
    this.setState({ success: false, error: true })
  }

  submit = (title, file) => {
    if(this.state.files.some((stateTitle) => stateTitle === title + path.extname(file.name).toLowerCase())){
      this.setState({ displayModal: true }, () => {
        // Wait for modal response
        if(this.state.modalResponse === 'continue'){
          return true
        } else if(this.state.modalResponse === 'close'){
          return false
        }
      })
    } else {
      const data = new FormData()
      data.append('file', file)
      data.append('title', title)
      axios.post('/api/upload', data, { title })
        .then(res => this.setState({ files: [...this.state.files, {title: title, date: file.lastModifiedDate}] }))
      return true
    }
    this.title = title
    this.file = file
    return false
  }

  delete = (file) => {
    console.log(file)
    axios.delete(`/api/upload/${file.title}`)
      .then(res => this.setState({files: [...this.state.files.filter(stateFile => stateFile.title !== file.title)]}))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <Col sm={{size: 6, offset: 3}}>
                <Alert color="danger" isOpen={this.state.error} 
                  style={{margin: '30px 0px'}}  toggle={this.removeAlert}>
                  Missing file title or attached file!
                </Alert>
                <Alert color="success" isOpen={this.state.success} 
                  style={{margin: '30px 0px'}}  toggle={this.removeAlert}>
                  Successfully uploaded {this.state.uploadedTitle}!
                </Alert>
              </Col>
              <Overwrite continue={this.modalContinue} close={this.modalClose} displayModal={this.state.displayModal} />
              <Upload success={this.alertSuccess} error={this.alertError} submit={this.submit} />
            </React.Fragment>
          )}/>
          <Route exact path="/modify" render={props => (
            <Container style={{minHeight: '718px'}}>
              <ItemList files={this.state.files} delete={this.delete} />
            </Container>
          )}/>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
