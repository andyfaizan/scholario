import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import modal from './modules/modal'
import entities from './modules/entities'
import { loginReducer } from './modules/user'
import { recommendedCourseInstancesReducer } from './modules/course-instance'
import { curReducer } from './modules/cur'
import { questionReducer } from './modules/AskQuestion'
import { requestReducer } from './modules/request'
import { pkgReducer } from './modules/AddPkg'
import { materialReducer } from './modules/materials'
import { miscReducer } from './modules/Misc'
import { notificationsReducer } from './modules/notifications'

export default combineReducers({
  modal,
  form: formReducer,
  user: loginReducer,
  entities,
  recommendedCourseInstances: recommendedCourseInstancesReducer,
  curs: curReducer,
  requests: requestReducer,
  questionReducer,
  pkgReducer,
  materialReducer,
  misc: miscReducer,
  notifications: notificationsReducer,
  // curCourseInstance: curCourseInstanceReducer,
  // curPkg: curPkgReducer,
  router,
})
