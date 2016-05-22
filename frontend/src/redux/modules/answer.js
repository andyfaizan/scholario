import { normalize, arrayOf } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { push, replace } from 'react-router-redux'
import urlJoin from 'url-join'
import config from '../../config'
import { questionSchema, answerSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)


// ------------------------------------
// Constants
// ------------------------------------
export const VOTE_ANSWER_REQUEST = 'VOTE_ANSWER_REQUEST'
export const VOTE_ANSWER_OK = 'VOTE_ANSWER_OK'
export const VOTE_ANSWER_ERR = 'VOTE_ANSWER_ERR'

export const POST_ANSWER_REQUEST = 'POST_ANSWER_REQUEST'
export const POST_ANSWER_OK = 'POST_ANSWER_OK'
export const POST_ANSWER_ERR = 'POST_ANSWER_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function voteQuestion(aid) {
  const endpoint = urlJoin(config.apiURL, 'answers', aid, 'vote')
  return {
    types: [VOTE_ANSWER_REQUEST, VOTE_ANSWER_OK, VOTE_ANSWER_ERR],
    callAPI: () => request.get(endpoint),
    payload: { aid },
    schema: answerSchema,
  }
}

export function postQuestion(question, content) {
  const endpoint = urlJoin(config.apiURL, 'answers')
  return {
    types: [POST_ANSWER_REQUEST, POST_ANSWER_OK, POST_ANSWER_ERR],
    callAPI: () => request.post(endpoint).send({
      question, content
    }),
    schema: questionSchema,
  }
}



// ------------------------------------
// Reducer
// ------------------------------------
export function answerReducer(state={}, action) {
  switch (action.type) {
    default:
      if (action.response && action.response.entities && action.response.entities.answers) {
        return merge({}, state, action.response.entities.answers)
      }
      return state
  }
}
