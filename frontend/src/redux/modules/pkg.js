import { arrayOf } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { push, replace } from 'react-router-redux'
import urlJoin from 'url-join'
import config from '../../config'
import { pkgSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
export const SET_CUR_PKG = 'SET_CUR_PKG'

export const GET_PKG_REQUEST = 'GET_PKG_REQUEST'
export const GET_PKG_OK = 'GET_PKG_OK'
export const GET_PKG_ERR = 'GET_PKG_ERR'

export const ADD_PKG_REQUEST = 'ADD_PKG_REQUEST'
export const ADD_PKG_OK = 'ADD_PKG_OK'
export const ADD_PKG_ERR = 'ADD_PKG_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function setCurPkg(pid) {
  return {
    type: SET_CUR_PKG,
    payload: {
      pid,
    }
  }
}

export function getPkg(pid, setCur = false) {
  var endpoint = urlJoin(config.apiURL, 'pkgs', pid)

  return {
    types: [GET_PKG_REQUEST, GET_PKG_OK, GET_PKG_ERR],
    // Check the cache (optional):
    //shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request.get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { pid, setCur, },
    schema: pkgSchema,
  }
}

export function addPkg(name, courseInstance, access = 'public', files = []) {
  var endpoint = urlJoin(config.apiURL, 'pkgs')

  if (name) {
    endpoint = urlJoin(endpoint, `?name=${name}`)
  }

  if (courseInstance) {
    endpoint = urlJoin(endpoint, `?courseInstance=${courseInstance}`)
  }

  if (access) {
    endpoint = urlJoin(endpoint, `?access=${access}`)
  }

  var callP = request
    .post(endpoint)
    .set('Content-Type', 'multipart/form-data')

  for (var i = 0; i < files.length; i++)
    callP.attach(files[i])

  return {
    types: [ADD_PKG_REQUEST, ADD_PKG_OK, ADD_PKG_ERR],
    callAPI: () =>  callP,
    schema: pkgSchema,
  }
}


// ------------------------------------
// Reducer
// ------------------------------------
export function pkgReducer(state={}, action) {
  switch (action.type) {
    default:
      if (action.response && action.response.entities && action.response.entities.pkgs) {
        return merge({}, state, action.response.entities.pkgs)
      }
      return state
  }
}

export function curPkgReducer(state='', action) {
  switch (action.type) {
    case GET_PKG_REQUEST:
      if (action.payload && action.payload.setCur) {
        return action.payload.pid
      }
    case SET_CUR_PKG:
      if (action.payload && action.payload.pid) {
        return action.payload.pid
      }
    default:
      return state
  }
}
