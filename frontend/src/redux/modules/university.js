import { normalize } from 'normalizr'
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
export const GET_UNIVERSITIES_REQUEST = 'GET_UNIVERSITIES_REQUEST'
export const GET_UNIVERSITIES_OK = 'GET_UNIVERSITIES_OK'
export const GET_UNIVERSITIES_ERR = 'GET_UNIVERSITIES_ERR'

// -------------------------leType: state.Material[ownProps.id].fileType,-----------
// Actions
// ------------------------------------
export getUniversities(substr = '') {
  var endpoint = 'https://api.scholario.de
  return {
    types: [GET_UNIVERSITIES_REQUEST, GET_UNIVERSITIES_OK, GET_UNIVERSITIES_ERR],
    // Check the cache (optional):
    //shouldCallAPI: (state) => !state.posts[userId],
    callAPI: () => request().get(`https://api.scholario.de/universities/${userId}/posts`),
    // Arguments to inject in begin/end actions
    payload: { userId }
  }
}
