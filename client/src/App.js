import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'
import { Alert, Col, Container } from 'reactstrap'
import Navbar from './components/Navbar'
import Upload from './components/Upload'
import ItemList from './components/ItemList'
import Footer from './components/Footer'
import './App.css';

class App extends Component {
  // Setup state to hold files
  state = {
    files: [],
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
          this.setState({ files: [] })
        }
      })
  }

  removeAlert = () => {
    this.setState({ success: false, error: false })
  }

  alertSuccess = (title) => {
    this.setState({ uploadedTitle: title, success: true, error: false }, () => {return})
  }

  alertError = () => {
    this.setState({ success: false, error: true }, () => {return})
  }

  submit = (title, file) => {
    const data = new FormData()
    data.append('file', file)
    data.append('title', title)
    axios.post('/api/upload', data, { title })
      .then(res => this.setState({ files: [...this.state.files, {title: title, date: file.lastModifiedDate}] }))
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
              <Upload files={this.state.files} success={this.alertSuccess} error={this.alertError} submit={this.submit} />
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
