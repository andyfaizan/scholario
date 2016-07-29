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
export function eventReducer(state = {}, action) {
  switch (action.type) {
  default:
    if (action.response && action.response.entities && action.response.entities.events) {
      return merge({}, state, action.response.entities.events)
    }
    return state
  }
}
