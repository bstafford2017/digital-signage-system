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
    axios.get('../../routes/api/uploads.js')
      .then(res => this.setState({ titles: res.data }))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Upload} />
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
