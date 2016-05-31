import { normalize, arrayOf } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { push, replace } from 'react-router-redux'
import urlJoin from 'url-join'
import config from '../../config'
import { materialSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
export const SET_CUR_MATERIAL = 'SET_CUR_MATERIAL'

export const GET_MATERIAL_REQUEST = 'GET_MATERIAL_REQUEST'
export const GET_MATERIAL_OK = 'GET_MATERIAL_OK'
export const GET_MATERIAL_ERR = 'GET_MATERIAL_ERR'

export const POST_MATERIAL_REQUEST = 'POST_MATERIAL_REQUEST'
export const POST_MATERIAL_OK = 'POST_MATERIAL_OK'
export const POST_MATERIAL_ERR = 'POST_MATERIAL_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function setCurMaterial(mid) {
  return {
    type: SET_CUR_MATERIAL,
    payload: {
      mid,
    }
  }
}

export function getMaterial(mid) {
  var endpoint = urlJoin(config.apiURL, 'materials', mid)
  return {
    types: [GET_MATERIAL_REQUEST, GET_MATERIAL_OK, GET_MATERIAL_ERR],
    // Check the cache (optional):
    //shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request.get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { mid },
    schema: materialSchema,
  }
}

export function postMaterial(pid, files) {
  var endpoint = urlJoin(config.apiURL, 'pkgs', pid, 'materials')
  var callP = request.post(endpoint)
  for (var i = 0; i < files.length; i++) {
    callP.attach('material', files[i])
  }
  return {
    types: [POST_MATERIAL_REQUEST, POST_MATERIAL_OK, POST_MATERIAL_ERR],
    callAPI: () => callP,
    payload: { pid },
    schema: { materials: arrayOf(materialSchema) },
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function materialReducer(state={}, action) {
  switch (action.type) {
    default:
      if (action.response && action.response.entities && action.response.entities.materials) {
        return merge({}, state, action.response.entities.materials)
      }
      return state
  }
}
