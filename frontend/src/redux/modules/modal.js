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



// ------------------------------------
// Actions
// ------------------------------------
export function show (modal) {
  return {
    type: MODAL_SHOW,
    visible: true,
    modalType: modal
  }
}

export function hide (modal) {
  return {
    type: MODAL_HIDE,
    visible: false,
    modalType: modal
  }
}

export const actions = {
  show,
  hide
}

const initialState = {
  visible: false,
  modalType: null
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MODAL_SHOW]: (state, action) => ({visible : action.visible, modalType : action.modalType}),
  [MODAL_HIDE]: (state, action) => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function modalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
