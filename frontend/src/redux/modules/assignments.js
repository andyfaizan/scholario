import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import urlJoin from 'url-join'
import config from '../../config'
import { assignmentSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------

export const GET_ASSIGNMENT_REQUEST = 'GET_ASSIGNMENT_REQUEST'
export const GET_ASSIGNMENT_OK = 'GET_ASSIGNMENT_OK'
export const GET_ASSIGNMENT_ERR = 'GET_ASSIGNMENT_ERR'

// ------------------------------------
// Actions
// ------------------------------------

export function getAssignments(aid) {
  const endpoint = urlJoin(config.apiURL, 'assignments', aid)
  const callP = request.post(endpoint)
  return {
    types: [GET_ASSIGNMENT_REQUEST, GET_ASSIGNMENT_OK, GET_ASSIGNMENT_ERR],
    callAPI: () => callP,
    schema: assignmentSchema,
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function assignmentReducer(state = {}, action) {
  switch (action.type) {
  default:
    if (action.response && action.response.entities && action.response.entities.materials) {
      return merge({}, state, action.response.entities.materials)
    }
    return state
  }
}
