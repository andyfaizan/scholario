import { combineReducers } from 'redux'
import { userReducer } from './user'
import { courseReducer } from './course'
import { courseInstanceReducer } from './course-instance'
import { programReducer } from './program'
import { universityReducer } from './university'
import { questionReducer } from './question'
import { answerReducer } from './answer'
import { commentReducer } from './comment'
import { pkgReducer } from './pkg'
import { materialReducer } from './materials'
import { bookmarkReducer } from './bookmark'


const entities = combineReducers({
  users: userReducer,
  courses: courseReducer,
  courseInstances: courseInstanceReducer,
  programs: programReducer,
  universities: universityReducer,
  questions: questionReducer,
  answers: answerReducer,
  comments: commentReducer,
  pkgs: pkgReducer,
  materials: materialReducer,
  bookmarks: bookmarkReducer,
})

export default entities
