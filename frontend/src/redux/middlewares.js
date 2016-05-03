import { LOCATION_CHANGE, replace } from 'react-router-redux'
import { merge } from 'lodash'
import { browserHistory } from '../history'
import { LOGIN_OK, LOGOUT_OK } from './modules/user'


export const authMiddleware = store => next => action => {
  const allowedPaths = [ '/' ]
  if (action.type === LOCATION_CHANGE) {
    if (store.getState().user && store.getState().user.token) {
      if (action.payload.pathname === '/') {
        browserHistory.replace('/dashboard')
        action.payload.pathname = '/dashboard'
      }
      return next(action)
    } else {
      if (allowedPaths.indexOf(action.payload.pathname) !== -1) {
          return next(action)
      }
      console.log(store.getState().user.token)
      browserHistory.replace('/')
      action.payload.pathname = '/'
      return next(action)
    }
  }
  return next(action)
}

export const persistStore = store => next => action => {
  if (action.type === LOGIN_OK) {
    var state = store.getState()
    if (action.response && action.response.entities) {
      state.entities = merge({}, state.entities, action.response.entities)
    }
    if (action.user)
      state.user = action.user
    delete state.router
    window.localStorage.setItem('scholario:store', JSON.stringify(state))
    return next(action)
  } else if (action.type === LOGOUT_OK) {
    window.localStorage.setItem('scholario:store', '')
    return next(action)
  }
  return next(action)
}
