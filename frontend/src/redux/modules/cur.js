import { SET_CUR_PKG, GET_PKG_REQUEST } from './pkg'
import { SET_CUR_COURSE_INSTANCE } from './course-instance'
import { SET_CUR_MATERIAL } from './materials'
import { SET_CUR_QUESTION } from './question'

export function curReducer(state={}, action) {
  switch (action.type) {
    case GET_PKG_REQUEST:
      if (action.payload && action.payload.setCur) {
        return Object.assign({}, state, {
          pkg: action.payload.pid,
        })
      }
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
    case SET_CUR_MATERIAL:
      if (action.payload && action.payload.mid) {
        return Object.assign({}, state, {
          material: action.payload.mid,
        })
      }
    case SET_CUR_QUESTION:
      if (action.payload && action.payload.qid) {
        return Object.assign({}, state, {
          question: action.payload.qid,
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
