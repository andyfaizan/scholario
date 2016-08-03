import { arrayOf } from 'normalizr'
import _, { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import urlJoin from 'url-join'
import config from '../../config'
import { materialSchema } from '../schemas'
import { setUpProgress } from './Misc'

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

export const VOTE_MATERIAL_REQUEST = 'VOTE_MATERIAL_REQUEST'
export const VOTE_MATERIAL_OK = 'VOTE_MATERIAL_OK'
export const VOTE_MATERIAL_ERR = 'VOTE_MATERIAL_ERR'

export const DELETE_MATERIAL_REQUEST = 'DELETE_MATERIAL_REQUEST'
export const DELETE_MATERIAL_OK = 'DELETE_MATERIAL_OK'
export const DELETE_MATERIAL_ERR = 'DELETE_MATERIAL_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function setCurMaterial(mid) {
  return {
    type: SET_CUR_MATERIAL,
    payload: {
      mid,
    },
  }
}

export function getMaterial(mid) {
  const endpoint = urlJoin(config.apiURL, 'materials', mid)
  return {
    types: [GET_MATERIAL_REQUEST, GET_MATERIAL_OK, GET_MATERIAL_ERR],
    // Check the cache (optional):
    // shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request.get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { mid },
    schema: materialSchema,
  }
}

export function postMaterial(pid, files) {
  const endpoint = urlJoin(config.apiURL, 'pkgs', pid, 'materials')
  const callP = request.post(endpoint)
  for (let i = 0; i < files.length; i++) {
    callP.attach('material', files[i])
  }
  return {
    types: [POST_MATERIAL_REQUEST, POST_MATERIAL_OK, POST_MATERIAL_ERR],
    callAPI: () => callP,
    payload: { pid },
    schema: { materials: arrayOf(materialSchema) },
    onProgressDispatch: (e) => setUpProgress(e.percent),
  }
}

export function voteMaterial(mid) {
  const endpoint = urlJoin(config.apiURL, 'materials', mid, 'vote')
  return {
    types: [VOTE_MATERIAL_REQUEST, VOTE_MATERIAL_OK, VOTE_MATERIAL_ERR],
    callAPI: () => request.get(endpoint),
    payload: { mid },
    schema: materialSchema,
  }
}

export function deleteMaterial(mid, pid) {
  const endpoint = urlJoin(config.apiURL, 'materials', mid)

  return {
    types: [DELETE_MATERIAL_REQUEST, DELETE_MATERIAL_OK, DELETE_MATERIAL_ERR],
    callAPI: () => request.del(endpoint),
    payload: { mid, pid },
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function materialReducer(state = {}, action) {
  switch (action.type) {
  case DELETE_MATERIAL_OK:
    if (action && action.mid) {
      return _.omit(state, action.mid)
    }
    return state
  default:
    if (action.response && action.response.entities && action.response.entities.materials) {
      return merge({}, state, action.response.entities.materials)
    }
    return state
  }
}
