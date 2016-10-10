// ------------------------------------
// Constants
// ------------------------------------
export const MODAL_SHOW = 'MODAL_SHOW'
export const MODAL_HIDE = 'MODAL_HIDE'
export const LOGIN_MODAL = 'LOGIN_MODAL'
export const CREATE_COURSE_MODAL = 'CREATE_COURSE_MODAL'
export const ADD_QUESTION_MODAL = 'ADD_QUESTION_MODAL'
export const ADD_PACKAGE_MODAL = 'ADD_PACKAGE_MODAL'
export const ADD_MATERIAL_MODAL = 'ADD_MATERIAL_MODAL'
export const ADD_BOOKMARK_MODAL = 'ADD_BOOKMARK_MODAL'
export const UPLOAD_SOLUTION_MODAL = 'UPLOAD_SOLUTION_MODAL'



// ------------------------------------
// Actions
// ------------------------------------
export function show(modal) {
  return {
    type: MODAL_SHOW,
    visible: true,
    modalType: modal,
  }
}

export function hide(modal) {
  return {
    type: MODAL_HIDE,
    visible: false,
    modalType: modal,
  }
}

export const actions = {
  show,
  hide,
}

const initialState = {
  visible: false,
  modalType: null,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function modalReducer(state = initialState, action) {
  switch (action.type) {
  case MODAL_SHOW:
    return { visible: action.visible, modalType: action.modalType }
  case MODAL_HIDE:
    return initialState
  default:
    return state
  }
}
