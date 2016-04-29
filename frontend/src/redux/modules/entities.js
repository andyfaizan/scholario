import { merge } from 'lodash'



export default function entities(state = { users: {}, courses: {}, questions: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}
