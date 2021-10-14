import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import axios from 'axios'
import './App.css'



class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  }

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
  //   this.setState({ users: response.data, loading: false })
  // }

  searchUsers = async (text) => {
    this.setState({ loading: true });

    const response = await axios.get(`https://api.github.com/search/users?q=${text}&?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ users: response.data.items, loading: false })
  }

  getUser = async (username) => {
    this.setState({ loading: true });

    const response = await axios.get(`https://api.github.com/users/${username}`)

    this.setState({ user: response.data, loading: false })
  }

  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)

    this.setState({ repos: response.data, loading: false })
  }

  resetUsers = () => this.setState({ users: [], loading: false })

  setAlert = (message, type) => {
    this.setState({ alert: { message: message, type: type } })
    setTimeout(() => { this.setState({ alert: null })}, 2000)
  }

  render() {
    const { users, loading, user, repos } = this.state
    return (
      <Router>
      <div className="App">
        <Navbar />
        <div className="container">
        <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                  searchUsers={this.searchUsers} 
                  resetUsers={this.resetUsers} 
                  showReset={users.length > 0 ? true : false} 
                  setAlert={this.setAlert} />
                <Users 
                  loading={loading} 
                  users={users} />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User 
                { ...props } 
                getUser={this.getUser} 
                getUserRepos={this.getUserRepos}
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
}

export default App