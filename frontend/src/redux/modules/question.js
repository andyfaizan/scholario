import { normalize, arrayOf } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { push, replace } from 'react-router-redux'
import urlJoin from 'url-join'
import config from '../../config'
import { questionSchema } from '../schemas'
import { DELETE_ANSWER_OK } from './answer'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
export const SET_CUR_QUESTION = 'SET_CUR_QUESTION'

export const GET_QUESTIONS_REQUEST = 'GET_QUESTIONS_REQUEST'
export const GET_QUESTIONS_OK = 'GET_QUESTIONS_OK'
export const GET_QUESTIONS_ERR = 'GET_QUESTIONS_ERR'

export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST'
export const GET_QUESTION_OK = 'GET_QUESTION_OK'
export const GET_QUESTION_ERR = 'GET_QUESTION_ERR'

export const VOTE_QUESTION_REQUEST = 'VOTE_QUESTION_REQUEST'
export const VOTE_QUESTION_OK = 'VOTE_QUESTION_OK'
export const VOTE_QUESTION_ERR = 'VOTE_QUESTION_ERR'

export const ADD_QUESTION_REQUEST = 'ADD_QUESTION_REQUEST'
export const ADD_QUESTION_OK = 'ADD_QUESTION_OK'
export const ADD_QUESTION_ERR = 'ADD_QUESTION_ERR'

export const DELETE_QUESTION_REQUEST = 'DELETE_QUESTION_REQUEST'
export const DELETE_QUESTION_OK = 'DELETE_QUESTION_OK'
export const DELETE_QUESTION_ERR = 'DELETE_QUESTION_ERR'

export const PUT_QUESTION_REQUEST = 'PUT_QUESTION_REQUEST'
export const PUT_QUESTION_OK = 'PUT_QUESTION_OK'
export const PUT_QUESTION_ERR = 'PUT_QUESTION_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function setCurQuestion(qid) {
  return {
    type: SET_CUR_QUESTION,
    payload: {
      qid,
    }
  }
}

export function getQuestions(cid = '', pid = '', mid = '') {
  var endpoint = urlJoin(config.apiURL, 'questions')
  if (cid) {
    endpoint = urlJoin(endpoint, `?courseInstance=${cid}`)
  }

  if (pid) {
    endpoint = urlJoin(endpoint, `?pkg=${pid}`)
  }

  if (mid) {
    endpoint = urlJoin(endpoint, `?material=${mid}`)
  }

  return {
    types: [GET_QUESTIONS_REQUEST, GET_QUESTIONS_OK, GET_QUESTIONS_ERR],
    callAPI: () => request.get(endpoint),
    payload: { cid, pid, mid },
    schema: { questions: arrayOf(questionSchema) },
  }
}

export function getQuestion(qid) {
  const endpoint = urlJoin(config.apiURL, 'questions', qid)
  return {
    types: [GET_QUESTION_REQUEST, GET_QUESTION_OK, GET_QUESTION_ERR],
    // Check the cache (optional):
    //shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request.get(endpoint),
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
    schema: questionSchema,
  }
}

export function addQuestion(title, description, courseInstance, pkg, material) {
  const endpoint = urlJoin(config.apiURL, 'questions')
  return {
    types: [ADD_QUESTION_REQUEST, ADD_QUESTION_OK, ADD_QUESTION_ERR],
    callAPI: () => request.post(endpoint).send({
      title, description,
      courseInstance, pkg, material
    }),
    schema: questionSchema,
  }
}

export function deleteQuestion(qid) {
  const endpoint = urlJoin(config.apiURL, 'questions', qid)
  return {
    types: [DELETE_QUESTION_REQUEST, DELETE_QUESTION_OK, DELETE_QUESTION_ERR],
    callAPI: () => request.del(endpoint),
    payload: { qid },
  }
}

export function putQuestion(qid, title, description) {
  const endpoint = urlJoin(config.apiURL, 'questions', qid)
  return {
    types: [PUT_QUESTION_REQUEST, PUT_QUESTION_OK, PUT_QUESTION_ERR],
    callAPI: () => request.put(endpoint).send({ title, description }),
    payload: { qid },
    schema: questionSchema,
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function questionReducer(state={}, action) {
  switch (action.type) {
    case DELETE_ANSWER_OK:
      if (action && action.aid && action.qid) {
        return Object.assign({}, state, {
          [action.qid]: {
            ...state[action.qid],
            answers: _.without(state[action.qid].answers, action.aid),
          }
        })
      }
    default:
      if (action.response && action.response.entities && action.response.entities.questions) {
        return merge({}, state, action.response.entities.questions)
      }
      return state
  }
}
