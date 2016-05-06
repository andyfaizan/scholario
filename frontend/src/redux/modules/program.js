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
export const GET_PROGRAMS_REQUEST = 'GET_PROGRAMS_REQUEST'
export const GET_PROGRAMS_OK = 'GET_PROGRAMS_OK'
export const GET_PROGRAMS_ERR = 'GET_PROGRAMS_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function getPrograms(substr = '') {
  var endpoint = 'https://api.scholario.de'
  return {
    types: [GET_UNIVERSITIES_REQUEST, GET_UNIVERSITIES_OK, GET_UNIVERSITIES_ERR],
    // Check the cache (optional):
    //shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request().get(`https://api.scholario.de/universities/${userId}/posts`),
    // Arguments to inject in begin/end actions
    payload: { userId }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function programReducer(state={}, action) {
  switch (action.type) {
    default:
      if (action.response && action.response.entities && action.response.entities.programs) {
        return merge({}, state, action.response.entities.programs)
      }
      return state
  }
}
