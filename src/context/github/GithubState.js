import { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import { SEARCH_USERS, SET_LOADING, RESET_USERS, GET_USER, GET_REPOS, SET_SEARCH_TEXT } from '../types'

let githubClientId
let githubClientSecret

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const GithubState = props => {
 
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    searchText: ''
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // SEARCH_USERS
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
    dispatch({ type: SEARCH_USERS, payload: res.data.items})
  }

  // GET_USER
  const getUser = async username => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}`)
    dispatch({ type: GET_USER, payload: res.data})
  }

  // GET_REPOS
  const getUserRepos = async username => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)
    dispatch({ type: GET_REPOS, payload: res.data})
  }

  // RESET_USERS
  const resetUsers = () => {
    dispatch({ type: RESET_USERS })
  }

  // SET_LOADING
  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  // SET_SEARCH_TEXT
  const setSearchText = (text) => {
    dispatch({ type: SET_SEARCH_TEXT, payload: text})
  }

  const providerValues = {
    users: state.users,
    user: state.user,
    repos: state.repos,
    loading: state.loading,
    searchText: state.searchText,
    searchUsers,
    resetUsers,
    getUser,
    getUserRepos,
    setSearchText
  }

  return (
    <GithubContext.Provider value={providerValues}>
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState