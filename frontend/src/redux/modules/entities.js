import { merge } from 'lodash'
import { combineReducers } from 'redux'
import { userReducer } from './user'
import { courseReducer } from './course'
import { courseInstanceReducer } from './course-instance'
import { programReducer } from './program'
import { universityReducer } from './university'
import { questionReducer } from './question'


const entities = combineReducers({
  users: userReducer,
  courses: courseReducer,
  courseInstances: courseInstanceReducer,
  programs: programReducer,
  universities: universityReducer,
  questions: questionReducer,
})

export default entities

//export default function entities(state = { users: {}, courses: {}, questions: {} }, action) {
  //if (action.response && action.response.entities) {
    //return merge({}, state, action.response.entities)
  //}

  //return state
/*}*/
