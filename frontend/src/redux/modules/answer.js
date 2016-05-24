import { normalize, arrayOf } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import _ from 'lodash'
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

export const DELETE_ANSWER_REQUEST = 'DELETE_ANSWER_REQUEST'
export const DELETE_ANSWER_OK = 'DELETE_ANSWER_OK'
export const DELETE_ANSWER_ERR = 'DELETE_ANSWER_ERR'

export const PUT_ANSWER_REQUEST = 'PUT_ANSWER_REQUEST'
export const PUT_ANSWER_OK = 'PUT_ANSWER_OK'
export const PUT_ANSWER_ERR = 'PUT_ANSWER_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function voteAnswer(aid) {
  const endpoint = urlJoin(config.apiURL, 'answers', aid, 'vote')
  return {
    types: [VOTE_ANSWER_REQUEST, VOTE_ANSWER_OK, VOTE_ANSWER_ERR],
    callAPI: () => request.get(endpoint),
    payload: { aid },
    schema: answerSchema,
  }
}

export function postAnswer(question, content) {
  const endpoint = urlJoin(config.apiURL, 'questions', question, 'answers')
  return {
    types: [POST_ANSWER_REQUEST, POST_ANSWER_OK, POST_ANSWER_ERR],
    callAPI: () => request.post(endpoint).send({
      question, content
    }),
    schema: questionSchema,
  }
}

export function deleteAnswer(aid, qid) {
  const endpoint = urlJoin(config.apiURL, 'answers', aid)
  return {
    types: [DELETE_ANSWER_REQUEST, DELETE_ANSWER_OK, DELETE_ANSWER_ERR],
    callAPI: () => request.del(endpoint),
    payload: { aid, qid },
  }
}

export function putAnswer(aid, content) {
  const endpoint = urlJoin(config.apiURL, 'answers', aid)
  return {
    types: [PUT_ANSWER_REQUEST, PUT_ANSWER_OK, PUT_ANSWER_ERR],
    callAPI: () => request.put(endpoint).send({
      content
    }),
    schema: answerSchema,
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function answerReducer(state={}, action) {
  switch (action.type) {
    case DELETE_ANSWER_OK:
      if (action && action.aid) {
        return _.omit(state, action.aid)
      }
      return state
    default:
      if (action.response && action.response.entities && action.response.entities.answers) {
        return merge({}, state, action.response.entities.answers)
      }
      return state
  }
}
