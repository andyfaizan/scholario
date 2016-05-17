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
export const GET_PKG_REQUEST = 'GET_PKG_REQUEST'
export const GET_PKG_OK = 'GET_PKG_OK'
export const GET_PKG_ERR = 'GET_PKG_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function getPkg(pid) {
  var endpoint = urlJoin(config.apiURL, 'pkgs', pid)

  return {
    types: [GET_PKG_REQUEST, GET_PKG_OK, GET_PKG_ERR],
    // Check the cache (optional):
    //shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request.get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { pid },
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
