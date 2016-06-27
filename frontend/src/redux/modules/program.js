import { arrayOf } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import urlJoin from 'url-join'
import config from '../../config'
import { programSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
export const GET_PROGRAMS_REQUEST = 'GET_PROGRAMS_REQUEST'
export const GET_PROGRAMS_OK = 'GET_PROGRAMS_OK'
export const GET_PROGRAMS_ERR = 'GET_PROGRAMS_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function getPrograms(substr = '') {
  let endpoint = urlJoin(config.apiURL, 'programs')
  if (substr) {
    endpoint = urlJoin(endpoint, `?q=${substr}`)
  }

  return {
    types: [GET_PROGRAMS_REQUEST, GET_PROGRAMS_OK, GET_PROGRAMS_ERR],
    // Check the cache (optional):
    // shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request.get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { substr },
    schema: { programs: arrayOf(programSchema) },
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function programReducer(state = {}, action) {
  switch (action.type) {
  default:
    if (action.response && action.response.entities && action.response.entities.programs) {
      return merge({}, state, action.response.entities.programs)
    }
    return state
  }
}
