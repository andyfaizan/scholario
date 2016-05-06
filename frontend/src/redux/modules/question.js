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
export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST'
export const GET_QUESTION_OK = 'GET_QUESTION_OK'
export const GET_QUESTION_ERR = 'GET_QUESTION_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function getQuestion(substr = '') {
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
export function questionReducer(state={}, action) {
  switch (action.type) {
    default:
      if (action.response && action.response.entities && action.response.entities.questions) {
        return merge({}, state, action.entities.questions)
      }
      return state
  }
}
