import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import counter from './modules/counter'
import modal from './modules/modal'
import entities from './modules/entities'
import { loginReducer } from './modules/user'
import { recommendedCourseInstancesReducer, currentCourseInstanceReducer } from './modules/course-instance.js'

export default combineReducers({
  counter,
  modal,
  form : formReducer,
  user: loginReducer,
  entities,
  recommendedCourseInstances: recommendedCourseInstancesReducer,
  currentCourseInstance: currentCourseInstanceReducer,

router})
