import { useReducer } from 'react'
import AlertReducer from './alertReducer'
import AlertContext from './alertContext'
import { SET_ALERT, REMOVE_ALERT } from '../types'

const AlertState = props => {

  const initialState = {
    alert: null,
  }

  const [state, dispatch] = useReducer(AlertReducer, initialState)

  const setAlert = (msg, type) => {
    dispatch({ type: SET_ALERT, payload: { msg, type }})
    setTimeout(() => { dispatch({ type: REMOVE_ALERT, payload: null }) }, 2000)
  }

  const providerValues ={
    alert: state.alert,
    setAlert
  }

  return (
    <AlertContext.Provider value={providerValues}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState