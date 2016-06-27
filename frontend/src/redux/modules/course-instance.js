import { arrayOf } from 'normalizr'
import _, { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import urlJoin from 'url-join'
import config from '../../config'
import { courseInstanceSchema } from '../schemas'
import { DELETE_PKG_OK } from './pkg'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
export const SET_CUR_COURSE_INSTANCE = 'SET_CUR_COURSE_INSTANCE'

export const GET_COURSE_INSTANCE_REQUEST = 'GET_COURSE_INSTANCE_REQUEST'
export const GET_COURSE_INSTANCE_OK = 'GET_COURSE_INSTANCE_OK'
export const GET_COURSE_INSTANCE_ERR = 'GET_COURSE_INSTANCE_ERR'

export const GET_COURSE_INSTANCES_REQUEST = 'GET_COURSE_INSTANCES_REQUEST'
export const GET_COURSE_INSTANCES_OK = 'GET_COURSE_INSTANCES_OK'
export const GET_COURSE_INSTANCES_ERR = 'GET_COURSE_INSTANCES_ERR'

export const GET_RECOMMENDED_COURSE_INSTANCES_REQUEST = 'GET_RECOMMENDED_COURSE_INSTANCES_REQUEST'
export const GET_RECOMMENDED_COURSE_INSTANCES_OK = 'GET_RECOMMENDED_COURSE_INSTANCES_OK'
export const GET_RECOMMENDED_COURSE_INSTANCES_ERR = 'GET_RECOMMENDED_COURSE_INSTANCES_ERR'

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
export function setCurCourseInstance(cid) {
  return {
    type: SET_CUR_COURSE_INSTANCE,
    payload: {
      cid,
    },
  }
}

export function getCourseInstance(cid) {
  const endpoint = urlJoin(config.apiURL, 'course-instances', cid)
  return {
    types: [GET_COURSE_INSTANCE_REQUEST, GET_COURSE_INSTANCE_OK, GET_COURSE_INSTANCE_ERR],
    // Check the cache (optional):
    // shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request.get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { cid },
    schema: courseInstanceSchema,
  }
}

export function getCourseInstances(substring = '', program = '') {
  let endpoint = urlJoin(config.apiURL, 'course-instances')
  if (substring) {
    endpoint = urlJoin(endpoint, `?q=${substring}`)
  }

  if (program) {
    endpoint = urlJoin(endpoint, `?program=${program}`)
  }

  return {
    types: [GET_COURSE_INSTANCES_REQUEST, GET_COURSE_INSTANCES_OK, GET_COURSE_INSTANCES_ERR],
    callAPI: () => request.get(endpoint),
    payload: { substring, program },
    schema: { courseInstances: arrayOf(courseInstanceSchema) },
  }
}

export function getRecommendedCourseInstances(substring = '', program = '') {
  let endpoint = urlJoin(config.apiURL, 'course-instances')
  if (substring) {
    endpoint = urlJoin(endpoint, `?q=${substring}`)
  }

  if (program) {
    endpoint = urlJoin(endpoint, `?program=${program}`)
  }

  return {
    types: [
      GET_RECOMMENDED_COURSE_INSTANCES_REQUEST,
      GET_RECOMMENDED_COURSE_INSTANCES_OK,
      GET_RECOMMENDED_COURSE_INSTANCES_ERR,
    ],
    callAPI: () => request.get(endpoint),
    payload: { substring, program },
    schema: { courseInstances: arrayOf(courseInstanceSchema) },
  }
}

export function createCourseInstance(name, prof, university, program, semester) {
  const endpoint = urlJoin(config.apiURL, 'course-instances')
  return {
    types: [CREATE_COURSE_INSTANCE_REQUEST, CREATE_COURSE_INSTANCE_OK, CREATE_COURSE_INSTANCE_ERR],
    callAPI: () => {
      request
        .post(endpoint)
        .send({ name, prof, university, program, semester })
    },
  }
}

export function followCourse(uid, cid) {
  const endpoint = urlJoin(config.apiURL, 'course-instances', cid, 'follow')
  return {
    types: [FOLLOW_COURSE_INSTANCE_REQUEST, FOLLOW_COURSE_INSTANCE_OK, FOLLOW_COURSE_INSTANCE_ERR],
    callAPI: () => request.get(endpoint),
    payload: { uid, cid },
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
export function courseInstanceReducer(state = {}, action) {
  switch (action.type) {
  case DELETE_PKG_OK:
    if (action && action.pid && action.ciid) {
      return Object.assign({}, state, {
        [action.ciid]: {
          ...state[action.ciid],
          pkgs: _.without(state[action.ciid].pkgs, action.pid),
        },
      })
    }
    return state
  default:
    if (action.response && action.response.entities && action.response.entities.courseInstances) {
      return merge({}, state, action.response.entities.courseInstances)
    }
    return state
  }
}

export function recommendedCourseInstancesReducer(state = [], action) {
  switch (action.type) {
  case GET_RECOMMENDED_COURSE_INSTANCES_OK:
    if (action.result && action.result.courseInstances && action.result.courseInstances.length > 0) {
      return action.result.courseInstances
    }
    return state
  default:
    return state
  }
}

export function curCourseInstanceReducer(state = '', action) {
  switch (action.type) {
  case SET_CUR_COURSE_INSTANCE:
    if (action.payload && action.payload.cid) {
      return action.payload.cid
    }
    return state
  default:
    return state
  }
}
