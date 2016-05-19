import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import counter from './modules/counter'
import modal from './modules/modal'
import entities from './modules/entities'
import { loginReducer } from './modules/user'
import { recommendedCourseInstancesReducer, curCourseInstanceReducer } from './modules/course-instance'
import { curPkgReducer } from './modules/pkg'
import { curReducer } from './modules/cur'

export default combineReducers({
  counter,
  modal,
  form : formReducer,
  user: loginReducer,
  entities,
  recommendedCourseInstances: recommendedCourseInstancesReducer,
  curs: curReducer,
  //curCourseInstance: curCourseInstanceReducer,
  //curPkg: curPkgReducer,

router})
