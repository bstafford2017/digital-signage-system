import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/Navbar'
import Upload from './components/Upload'
import ItemList from './components/ItemList'
import Footer from './components/Footer'
import './App.css';

class App extends Component {

  // Setup state to hold titles
  state = {
    titles: []
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
      console.log(this.state)
  }

  submit(title, file) {
    const data = new FormData()
    data.append('file', file)
    data.append('title', title)
    console.log(data)
    axios.post('/api/upload', data, { title })
      .then(res => console.log(res.data))//this.setState({ titles: [...this.state.titles, title] }))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" render={props => (
            <Upload submit={this.submit} />
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
