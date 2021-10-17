import { SEARCH_USERS, SET_LOADING, RESET_USERS, GET_USER, GET_REPOS, SET_SEARCH_TEXT } from '../types'
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case RESET_USERS:
      return {
        ...state,
        users: [],
        loading: false
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      }
      case GET_REPOS:
        return {
          ...state,
          repos: action.payload,
          loading: false
        }
      case SET_SEARCH_TEXT:
        return {
          ...state,
          searchText: action.payload
        }
    default:
      return state
  }
}