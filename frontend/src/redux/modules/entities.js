import { merge } from 'lodash'
import { combineReducers } from 'redux'
import { userReducer } from './user'
import { courseInstanceReducer } from './course-instance'
import { programReducer } from './program'
import { universityReducer } from './university'
import { questionReducer } from './question'
import { materialReducer } from './materials'


const entities = combineReducers({
  users: userReducer,
  courseInstances: courseInstanceReducer,
  programs: programReducer,
  universities: universityReducer,
  questions: questionReducer,
  materials: materialReducer
})

export default entities

//export default function entities(state = { users: {}, courses: {}, questions: {} }, action) {
  //if (action.response && action.response.entities) {
    //return merge({}, state, action.response.entities)
  //}

  //return state
/*}*/
