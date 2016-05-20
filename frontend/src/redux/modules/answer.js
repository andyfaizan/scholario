import { merge } from 'lodash'



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
