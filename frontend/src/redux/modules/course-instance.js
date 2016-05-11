import { normalize } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { push, replace } from 'react-router-redux'
import urlJoin from 'url-join'
import config from '../../config'
import { courseInstanceSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
export const GET_COURSE_INSTANCE_REQUEST = 'GET_COURSE_INSTANCE_REQUEST'
export const GET_COURSE_INSTANCE_OK = 'GET_COURSE_INSTANCE_OK'
export const GET_COURSE_INSTANCE_ERR = 'GET_COURSE_INSTANCE_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function getCourseInstance(cid) {
  var endpoint = urlJoin(config.apiURL, 'course-instances', cid)
  return {
    types: [GET_COURSE_INSTANCE_REQUEST, GET_COURSE_INSTANCE_OK, GET_COURSE_INSTANCE_ERR],
    // Check the cache (optional):
    //shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request.get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { cid },
    schema: courseInstanceSchema,
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function courseInstanceReducer(state={}, action) {
  switch (action.type) {
    default:
      if (action.response && action.response.entities && action.response.entities.courseInstances) {
        return merge({}, state, action.response.entities.courseInstances)
      }
      return state
  }
}
