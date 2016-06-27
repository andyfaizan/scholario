import { arrayOf } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import urlJoin from 'url-join'
import config from '../../config'
import { universitySchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
export const GET_UNIVERSITIES_REQUEST = 'GET_UNIVERSITIES_REQUEST'
export const GET_UNIVERSITIES_OK = 'GET_UNIVERSITIES_OK'
export const GET_UNIVERSITIES_ERR = 'GET_UNIVERSITIES_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function getUniversities(substr = '') {
  let endpoint = urlJoin(config.apiURL, 'universities')
  if (substr) {
    endpoint = urlJoin(endpoint, `?q=${substr}`)
  }
  return {
    types: [GET_UNIVERSITIES_REQUEST, GET_UNIVERSITIES_OK, GET_UNIVERSITIES_ERR],
    // Check the cache (optional):
    // shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request.get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { substr },
    schema: { universities: arrayOf(universitySchema) },
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function universityReducer(state = {}, action) {
  switch (action.type) {
  default:
    if (action.response && action.response.entities && action.response.entities.universities) {
      return merge({}, state, action.response.entities.universities)
    }
    return state
  }
}
