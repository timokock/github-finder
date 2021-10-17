import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import GithubState from './context/github/GithubState'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import './css/App.css'



const App = () => {
  
  const [alert, setAlert] = useState(null)



  const onAlert = (message, type) => {
    setAlert({ message, type })
    setTimeout(() => { setAlert(null)}, 2000)
  }

  return (
    <GithubState>
    <Router>
    <div className="App">
      <Navbar />
      <div className="container">
      <Alert alert={alert}/>
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
              <Search 
                setAlert={onAlert} />
              <Users />
            </Fragment>
          )} />
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:login' render={props => (
            <User {...props}/>               
          )} />
        </Switch>
      </div>
    </div>
    </Router>
    </GithubState>
  )
}

export default App