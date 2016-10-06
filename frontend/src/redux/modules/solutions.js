import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import urlJoin from 'url-join'
import config from '../../config'
import { solutionSchema } from '../schemas'
import { setUpProgress } from './Misc'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------

export const POST_SOLUTION_REQUEST = 'POST_SOLUTION_REQUEST'
export const POST_SOLUTION_OK = 'POST_SOLUTION_OK'
export const POST_SOLUTION_ERR = 'POST_SOLUTION_ERR'

// ------------------------------------
// Actions
// ------------------------------------

export function postSolution(aid, solutionFile) {
  const endpoint = urlJoin(config.apiURL, 'solutions')
  const callP = request.post(endpoint)
  callP.attach('solution', solutionFile)
  callP.field('assignment', aid)
  callP.field('type', 'file')
  return {
    types: [POST_SOLUTION_REQUEST, POST_SOLUTION_OK, POST_SOLUTION_ERR],
    callAPI: () => callP,
    schema: solutionSchema,
    onProgressDispatch: (e) => setUpProgress(e.percent),
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function solutionReducer(state = {}, action) {
  switch (action.type) {
  case POST_SOLUTION_REQUEST:
    if (action) {
      return Object.assign({}, state, {
        postReq: request.post(urlJoin(config.apiURL, 'solutions')),
      })
    }
    return state
  default:
    if (action.response && action.response.entities && action.response.entities.materials) {
      return merge({}, state, action.response.entities.materials)
    }
    return state
  }
}
