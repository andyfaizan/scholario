import { merge } from 'lodash'


// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
export function courseReducer(state = {}, action) {
  switch (action.type) {
  default:
    if (action.response && action.response.entities && action.response.entities.courses) {
      return merge({}, state, action.response.entities.courses)
    }
    return state
  }
}
