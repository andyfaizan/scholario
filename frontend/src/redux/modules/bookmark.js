import { normalize, arrayOf } from 'normalizr'
import { merge } from 'lodash'
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

// ------------------------------------
// Reducer
// ------------------------------------
export function bookmarkReducer(state={}, action) {
  switch (action.type) {
    default:
      if (action.response && action.response.entities && action.response.entities.bookmarks) {
        return merge({}, state, action.response.entities.bookmarks)
      }
      return state
  }
}
