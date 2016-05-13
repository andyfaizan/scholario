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

export const CREATE_COURSE_INSTANCE_REQUEST = 'CREATE_COURSE_INSTANCE_REQUEST'
export const CREATE_COURSE_INSTANCE_OK = 'CREATE_COURSE_INSTANCE_OK'
export const CREATE_COURSE_INSTANCE_ERR = 'CREATE_COURSE_INSTANCE_ERR'

export const FOLLOW_COURSE_INSTANCE_REQUEST = 'FOLLOW_COURSE_INSTANCE_REQUEST'
export const FOLLOW_COURSE_INSTANCE_OK = 'FOLLOW_COURSE_INSTANCE_OK'
export const FOLLOW_COURSE_INSTANCE_ERR = 'FOLLOW_COURSE_INSTANCE_ERR'

export const UNFOLLOW_COURSE_INSTANCE_REQUEST = 'UNFOLLOW_COURSE_INSTANCE_REQUEST'
export const UNFOLLOW_COURSE_INSTANCE_OK = 'UNFOLLOW_COURSE_INSTANCE_OK'
export const UNFOLLOW_COURSE_INSTANCE_ERR = 'UNFOLLOW_COURSE_INSTANCE_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function getCourseInstance(cid) {
  const endpoint = urlJoin(config.apiURL, 'course-instances', cid)
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

export function createCourseInstance(name, prof, university, program, semester) {
  const endpoint = urlJoin(config.apiURL, 'course-instances')
  return {
    types: [CREATE_COURSE_INSTANCE_REQUEST, CREATE_COURSE_INSTANCE_OK, CREATE_COURSE_INSTANCE_ERR],
    callAPI: () => {
      reqest
        .post(endpoint)
        .send({ name, prof, university, program, semester })
    },
  }
}

export function followCourse(cid) {
  const endpoint = urlJoin(config.apiURL, 'course-instances', cid, 'follow')
  return {
    types: [FOLLOW_COURSE_INSTANCE_REQUEST, FOLLOW_COURSE_INSTANCE_OK, FOLLOW_COURSE_INSTANCE_ERR],
    callAPI: () => request.get(endpoint),
    payload: { cid },
  }
}

export function unfollowCourse(cid) {
  const endpoint = urlJoin(config.apiURL, 'course-instances', cid, 'unfollow')
  return {
    types: [UNFOLLOW_COURSE_INSTANCE_REQUEST, UNFOLLOW_COURSE_INSTANCE_OK, UNFOLLOW_COURSE_INSTANCE_ERR],
    callAPI: () => request.get(endpoint),
    payload: { cid },
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