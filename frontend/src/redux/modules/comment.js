import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import _, { merge } from 'lodash'
import urlJoin from 'url-join'
import config from '../../config'
import { commentSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)


// ------------------------------------
// Constants
// ------------------------------------
export const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST'
export const POST_COMMENT_OK = 'POST_COMMENT_OK'
export const POST_COMMENT_ERR = 'POST_COMMENT_ERR'

export const VOTE_COMMENT_REQUEST = 'VOTE_COMMENT_REQUEST'
export const VOTE_COMMENT_OK = 'VOTE_COMMENT_OK'
export const VOTE_COMMENT_ERR = 'VOTE_COMMENT_ERR'

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST'
export const DELETE_COMMENT_OK = 'DELETE_COMMENT_OK'
export const DELETE_COMMENT_ERR = 'DELETE_COMMENT_ERR'

export const PUT_COMMENT_REQUEST = 'PUT_COMMENT_REQUEST'
export const PUT_COMMENT_OK = 'PUT_COMMENT_OK'
export const PUT_COMMENT_ERR = 'PUT_COMMENT_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function postComment(answer, content) {
  const endpoint = urlJoin(config.apiURL, 'comments')
  return {
    types: [POST_COMMENT_REQUEST, POST_COMMENT_OK, POST_COMMENT_ERR],
    callAPI: () => request.post(endpoint).send({
      answer, content,
    }),
    schema: commentSchema,
  }
}

export function voteComment(cmid) {
  const endpoint = urlJoin(config.apiURL, 'comments', cmid, 'vote')
  return {
    types: [VOTE_COMMENT_REQUEST, VOTE_COMMENT_OK, VOTE_COMMENT_ERR],
    callAPI: () => request.get(endpoint),
    payload: { cmid },
    schema: commentSchema,
  }
}

export function deleteComment(cmid, aid) {
  const endpoint = urlJoin(config.apiURL, 'comments', cmid)
  return {
    types: [DELETE_COMMENT_REQUEST, DELETE_COMMENT_OK, DELETE_COMMENT_ERR],
    callAPI: () => request.del(endpoint),
    payload: { cmid, aid },
  }
}

export function putComment(cmid, content) {
  const endpoint = urlJoin(config.apiURL, 'comments', cmid)
  return {
    types: [PUT_COMMENT_REQUEST, PUT_COMMENT_OK, PUT_COMMENT_ERR],
    callAPI: () => request.put(endpoint).send({
      content,
    }),
    schema: commentSchema,
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function commentReducer(state = {}, action) {
  switch (action.type) {
  case DELETE_COMMENT_OK:
    if (action && action.cmid) {
      return _.omit(state, action.cmid)
    }
    return state
  default:
    if (action.response && action.response.entities && action.response.entities.comments) {
      return merge({}, state, action.response.entities.comments)
    }
    return state
  }
}
