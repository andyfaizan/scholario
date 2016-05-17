import { normalize } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { push, replace } from 'react-router-redux'
import urlJoin from 'url-join'
import config from '../../config'
import { questionSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST'
export const GET_QUESTION_OK = 'GET_QUESTION_OK'
export const GET_QUESTION_ERR = 'GET_QUESTION_ERR'

export const VOTE_QUESTION_REQUEST = 'VOTE_QUESTION_REQUEST'
export const VOTE_QUESTION_OK = 'VOTE_QUESTION_OK'
export const VOTE_QUESTION_ERR = 'VOTE_QUESTION_ERR'

export const ADD_QUESTION_REQUEST = 'ADD_QUESTION_REQUEST'
export const ADD_QUESTION_OK = 'ADD_QUESTION_OK'
export const ADD_QUESTION_ERR = 'ADD_QUESTION_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function getQuestion(qid) {
  const endpoint = urlJoin(config.apiURL, 'questions', qid)
  return {
    types: [GET_QUESTION_REQUEST, GET_QUESTION_OK, GET_QUESTION_ERR],
    // Check the cache (optional):
    //shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request().get(endpoint),
    // Arguments to inject in begin/end actions
    payload: { qid },
    schema: questionSchema,
  }
}

export function voteQuestion(qid) {
  const endpoint = urlJoin(config.apiURL, 'questions', qid, 'vote')
  return {
    types: [VOTE_QUESTION_REQUEST, VOTE_QUESTION_OK, VOTE_QUESTION_ERR],
    callAPI: () => request.get(endpoint),
    payload: { qid },
  }
}

//TODO @Sina
export function addQuestion(title, content, courseInstance, pkg, material) {
  const endpoint = urlJoin(config.apiURL, 'questions')
  return {
    types: [ADD_QUESTION_REQUEST, ADD_QUESTION_OK, ADD_QUESTION_ERR],
    callAPI: () => {
      request
      .post(endpoint)
      .send({ title, content, courseInstance, pkg, material })
    },
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
