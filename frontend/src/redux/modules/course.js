import { normalize } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { push, replace } from 'react-router-redux'
import urlJoin from 'url-join'
import config from '../../config'
import { courseSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
export const GET_COURSE_REQUEST = 'GET_COURSE_REQUEST'
export const GET_COURSE_OK = 'GET_COURSE_OK'
export const GET_COURSE_ERR = 'GET_COURSE_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function getCourse(cid) {
  var endpoint = urlJoin(config.apiURL, 'courses', cid)
  return {
    types: [GET_COURSE_REQUEST, GET_COURSE_OK, GET_COURSE_ERR],
    // Check the cache (optional):
    //shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request.get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { cid },
    schema: courseSchema,
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function courseReducer(state={}, action) {
  switch (action.type) {
    default:
      if (action.response && action.response.entities && action.response.entities.courses) {
        return merge({}, state, action.response.entities.courses)
      }
      return state
  }
}
