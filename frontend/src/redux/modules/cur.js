import { SET_CUR_PKG } from './pkg'
import { SET_CUR_COURSE_INSTANCE } from './course-instance'

export function curReducer(state={}, action) {
  switch (action.type) {
    case SET_CUR_PKG:
      if (action.payload && action.payload.pid) {
        return Object.assign({}, state, {
          pkg: action.payload.pid,
        })
      }
    case SET_CUR_COURSE_INSTANCE:
      if (action.payload && action.payload.cid) {
        return Object.assign({}, state, {
          courseInstance: action.payload.cid,
        })
      }
    //case GET_PKG_OK:
      //if (action.response && action.response.entities && action.response.entities.pkgs &&
          //action.result && action.response.entities.pkgs[action.result]) {
        //return Object.assign({})

    default:
      return state
  }
}
