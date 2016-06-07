import { normalize, arrayOf } from 'normalizr'
import { merge } from 'lodash'
import _ from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { push, replace } from 'react-router-redux'
import urlJoin from 'url-join'
import config from '../../config'
import { bookmarkSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
export const POST_BOOKMARK_REQUEST = 'POST_BOOKMARK_REQUEST'
export const POST_BOOKMARK_OK = 'POST_BOOKMARK_OK'
export const POST_BOOKMARK_ERR = 'POST_BOOKMARK_ERR'

export const DELETE_BOOKMARK_REQUEST = 'DELETE_BOOKMARK_REQUEST'
export const DELETE_BOOKMARK_OK = 'DELETE_BOOKMARK_OK'
export const DELETE_BOOKMARK_ERR = 'DELETE_BOOKMARK_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function postBookmark(pid, title, url) {
  var endpoint = urlJoin(config.apiURL, 'pkgs', pid, 'bookmarks')

  return {
    types: [POST_BOOKMARK_REQUEST, POST_BOOKMARK_OK, POST_BOOKMARK_ERR],
    callAPI: () => request.post(endpoint).send({ title, url }),
    payload: { pid },
    schema: bookmarkSchema,
  }
}

export function deleteBookmark(bid, pid) {
  const endpoint = urlJoin(config.apiURL, 'bookmarks', bid)

  return {
    types: [DELETE_BOOKMARK_REQUEST, DELETE_BOOKMARK_OK, DELETE_BOOKMARK_ERR],
    callAPI: () => request.del(endpoint),
    payload: { bid, pid },
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function bookmarkReducer(state={}, action) {
  switch (action.type) {
    case DELETE_BOOKMARK_OK:
      if (action && action.bid) {
        return _.omit(state, action.bid)
      }
    default:
      if (action.response && action.response.entities && action.response.entities.bookmarks) {
        return merge({}, state, action.response.entities.bookmarks)
      }
      return state
  }
}
