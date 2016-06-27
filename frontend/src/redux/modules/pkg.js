import _, { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import urlJoin from 'url-join'
import config from '../../config'
import { pkgSchema } from '../schemas'
import { DELETE_BOOKMARK_OK } from './bookmark'
import { DELETE_MATERIAL_OK } from './materials'

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

export const DELETE_PKG_REQUEST = 'DELETE_PKG_REQUEST'
export const DELETE_PKG_OK = 'DELETE_PKG_OK'
export const DELETE_PKG_ERR = 'DELETE_PKG_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function setCurPkg(pid) {
  return {
    type: SET_CUR_PKG,
    payload: {
      pid,
    },
  }
}

export function getPkg(pid, setCur = false) {
  const endpoint = urlJoin(config.apiURL, 'pkgs', pid)

  return {
    types: [GET_PKG_REQUEST, GET_PKG_OK, GET_PKG_ERR],
    // Check the cache (optional):
    // shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request.get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { pid, setCur },
    schema: pkgSchema,
  }
}

export function addPkg(name, courseInstance, access = 'public', files = []) {
  let endpoint = urlJoin(config.apiURL, 'pkgs')

  if (name) {
    endpoint = urlJoin(endpoint, `?name=${name}`)
  }

  if (courseInstance) {
    endpoint = urlJoin(endpoint, `?courseInstance=${courseInstance}`)
  }

  if (access) {
    endpoint = urlJoin(endpoint, `?access=${access}`)
  }

  const callP = request.post(endpoint)

  if (files.length > 0) callP.set('Content-Type', 'multipart/form-data')
  for (let i = 0; i < files.length; i++) callP.attach(files[i])

  return {
    types: [ADD_PKG_REQUEST, ADD_PKG_OK, ADD_PKG_ERR],
    callAPI: () => callP,
    schema: pkgSchema,
  }
}

export function deletePkg(pid, ciid) {
  const endpoint = urlJoin(config.apiURL, 'pkgs', pid)

  return {
    types: [DELETE_PKG_REQUEST, DELETE_PKG_OK, DELETE_PKG_ERR],
    callAPI: () => request.del(endpoint),
    payload: { pid, ciid },
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function pkgReducer(state = {}, action) {
  switch (action.type) {
  case DELETE_PKG_OK:
    if (action && action.pid) {
      return _.omit(state, action.pid)
    }
    return state
  case DELETE_BOOKMARK_OK:
    if (action && action.bid && action.pid) {
      return Object.assign({}, state, {
        [action.pid]: {
          ...state[action.pid],
          bookmarks: _.without(state[action.pid].bookmarks, action.bid),
        },
      })
    }
    return state
  case DELETE_MATERIAL_OK:
    if (action && action.mid && action.pid) {
      return Object.assign({}, state, {
        [action.pid]: {
          ...state[action.pid],
          materials: _.without(state[action.pid].materials, action.mid),
        },
      })
    }
    return state
  default:
    if (action.response && action.response.entities && action.response.entities.pkgs) {
      return merge({}, state, action.response.entities.pkgs)
    }
    return state
  }
}

export function curPkgReducer(state = '', action) {
  switch (action.type) {
  case GET_PKG_REQUEST:
    if (action.payload && action.payload.setCur) {
      return action.payload.pid
    }
    return state
  case SET_CUR_PKG:
    if (action.payload && action.payload.pid) {
      return action.payload.pid
    }
    return state
  default:
    return state
  }
}
