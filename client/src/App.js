import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/Navbar'
import Upload from './components/Upload'
import ItemList from './components/ItemList'
import Footer from './components/Footer'
import Modal from './components/Modal'
import './App.css';

class App extends Component {
  file = null
  title = null

  // Setup state to hold titles
  state = {
    titles: [],
    displayModal: false
  }

  // Get uploads on load
  componentDidMount() {
    axios.get('/api/upload')
      .then(res => {
        // ** Change to blank response
        if(res.data.msg !== 'No Files uploaded yet!'){
          this.setState({ titles: res.data })
        }
      })
  }

  modalClose() {
    this.setState({ displayModal: false })
  }

  modalContinue() {
    this.setState({ displayModal: false })
    const data = new FormData()
    data.append('file', this.file)
    data.append('title', this.title)
    axios.post('/api/upload', data, { title: this.title })
      .then(res => console.log(res.data))//this.setState({ titles: [...this.state.titles, title] }))
  }

  submit(title, file) {
    console.log(this.state.titles)
    if(this.state.titles.some((stateTitle) => stateTitle === title)){
      this.setState({ displayModal: true })
    } else {
      const data = new FormData()
      data.append('file', file)
      data.append('title', title)
      axios.post('/api/upload', data, { title })
        .then(res => console.log(res.data))//this.setState({ titles: [...this.state.titles, title] }))
    }
    this.title = title
    this.file = file
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <Modal className={this.state.displayModal ? '' : 'd-none'} />
              <Upload submit={this.submit} />
            </React.Fragment>
          )}/>
          <Route exact path="/edit" render={props => (
            <ItemList titles={this.state.titles}/>
          )}/>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
