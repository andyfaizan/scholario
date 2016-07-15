import { LOCATION_CHANGE } from 'react-router-redux'
import { merge } from 'lodash'
import { normalize } from 'normalizr'
import { browserHistory } from '../history'
import { LOGIN_OK, LOGOUT_OK } from './modules/user'


export const authMiddleware = store => next => action => {
  const allowedPaths = ['/', '/impressum', '/forgot-password']
  const newAction = Object.assign({}, action)
  if (action.type === LOCATION_CHANGE) {
    if (store.getState().user && store.getState().user.token) {
      if (action.payload.pathname === '/') {
        browserHistory.replace('/dashboard')
        newAction.payload.pathname = '/dashboard'
      }
      return next(newAction)
    }
    if (action.payload.pathname.startsWith('/reset-password')) return next(action)
    if (allowedPaths.indexOf(action.payload.pathname) !== -1) {
      return next(newAction)
    }
    browserHistory.replace('/')
    newAction.payload.pathname = '/'
    return next(newAction)
  }
  return next(newAction)
}

export const persistStoreMiddleware = store => next => action => {
  if (action.type === LOGIN_OK) {
    const state = store.getState()
    if (action.response && action.response.entities) {
      state.entities = merge({}, state.entities, action.response.entities)
    }
    if (action.user) state.user = action.user
    delete state.router
    window.localStorage.setItem('scholario:store', JSON.stringify({
      user: state.user,
      entities: {
        users: {
          [state.user._id]: state.entities.users[state.user._id],
        },
      },
    }))
    return next(action)
  } else if (action.type === LOGOUT_OK) {
    window.localStorage.setItem('scholario:store', '')
    return next(action)
  }
  return next(action)
}

export const callAPIMiddleware = ({ dispatch, getState }) => next => action => {
  const {
    types,
    callAPI,
    shouldCallAPI = () => true,
    payload = {},
    schema,
    afterOk,
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
    return null
  }

  const [requestType, successType, failureType] = types

  dispatch(Object.assign({}, payload, {
    type: requestType,
  }))

  let p = callAPI()
  if (getState().user.token) p = p.set('Authorization', `JWT ${getState().user.token}`)
  return p.end().then(
    response => {
      let data = response.body
      if (schema) {
        data = normalize(response.body, schema)
      }

      const newAction = Object.assign({}, payload, {
        response: data,
        type: successType,
      })
      if (data.result) newAction.result = data.result
      dispatch(newAction)
      if (afterOk) dispatch(afterOk())
    },
    error => dispatch(Object.assign({}, payload, {
      error,
      type: failureType,
    }))
  )
}
