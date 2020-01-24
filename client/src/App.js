import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Upload from './components/Upload'
import Edit from './components/Edit'
import './App.css';

function App() {
  state = {
    
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" render={ props => (
          <Upload />
        )} />
        <Route exact path="/edit" component={Edit}/>
      </div>
    </Router>
  )
}

export default App
