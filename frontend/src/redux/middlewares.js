import { LOCATION_CHANGE, replace } from 'react-router-redux'
import { merge } from 'lodash'
import { normalize } from 'normalizr'
import { browserHistory } from '../history'
import { LOGIN_OK, LOGOUT_OK } from './modules/user'


export const authMiddleware = store => next => action => {
  const allowedPaths = [ '/', '/impressum' ]
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

export const persistStoreMiddleware = store => next => action => {
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

export const callAPIMiddleware = ({dispatch, getState}) => {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
      schema,
    } = action

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected fetch to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    const [ requestType, successType, failureType ] = types

    dispatch(Object.assign({}, payload, {
      type: requestType
    }))

    return callAPI().set('Authorization', `JWT ${getState().user.token}`).end().then(
      response => {
        var data = response.body
        if (schema) {
          data = normalize(response.body, schema)
        }

        var action = Object.assign({}, payload, {
          response: data,
          type: successType,
        })
        if (data.result) action.result = data.result
        dispatch(action)
      },
      error => dispatch(Object.assign({}, payload, {
        error,
        type: failureType
      }))
    )
  }
}
