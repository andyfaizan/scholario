/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const MODAL_SHOW = 'MODAL_SHOW'

// ------------------------------------
// Actions
// ------------------------------------
export function show (value: bool = true): Action {
  return {
    type: MODAL_SHOW,
    payload: value
  }
}

export const actions = {
  show
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MODAL_SHOW]: (state: bool, action: {payload: bool}): bool => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = false
export default function modalReducer (state: bool = initialState, action: Action): bool {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}