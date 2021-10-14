import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import axios from 'axios'
import './App.css'



const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const searchUsers = async text => {
    setLoading(true);

    const response = await axios.get(`https://api.github.com/search/users?q=${text}&?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUsers(response.data.items)
    setLoading(false)
  }

  const getUser = async username => {
    setLoading(true);

    const response = await axios.get(`https://api.github.com/users/${username}`)

    setUser(response.data)
    setLoading(false)
  }

  const getUserRepos = async username => {
    setLoading(true);

    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)

    setRepos(response.data)
    setLoading(false)
  }

  const resetUsers = () => {
    setUsers([])
    setLoading(false)
  }

  const onAlert = (message, type) => {
    setAlert({ message, type })
    setTimeout(() => { setAlert(null)}, 2000)
  }
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="container">
      <Alert alert={alert}/>
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
              <Search 
                searchUsers={searchUsers} 
                resetUsers={resetUsers} 
                showReset={users.length > 0 ? true : false} 
                setAlert={onAlert} />
              <Users 
                loading={loading} 
                users={users} />
            </Fragment>
          )} />
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:login' render={props => (
            <User 
              { ...props } 
              getUser={getUser} 
              getUserRepos={getUserRepos}
              user={user} 
              repos={repos}
              loading={loading} />               
          )} />
        </Switch>
      </div>
    </div>
    </Router>
  )
}

export default App