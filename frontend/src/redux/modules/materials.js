import { normalize } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { push, replace } from 'react-router-redux'
import urlJoin from 'url-join'
import config from '../../config'
import { userSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
export const GET_MATERIAL_REQUEST = 'GET_MATERIAL_REQUEST'
export const GET_MATERIAL_OK = 'GET_MATERIAL_OK'
export const GET_MATERIAL_ERR = 'GET_MATERIAL_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function getMaterial(mid) {
  var endpoint = urlJoin(config.apiURL, 'materials', mid)
  return {
    types: [GET_MATERIAL_REQUEST, GET_MATERIAL_OK, GET_MATERIAL_ERR],
    // Check the cache (optional):
    //shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request().get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { mid }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function materialReducer(state={}, action) {
  switch (action.type) {
    default:
      if (action.response && action.response.entities && action.response.entities.materials) {
        return merge({}, state, action.entities.materials)
      }
      return state
  }
}
