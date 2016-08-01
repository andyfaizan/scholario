// Constants

export const FILE_UP_PROGRESS = 'FILE_UP_PROGRESS'

// Action Creators
export function setUpProgress(e) {
  return {
    type: FILE_UP_PROGRESS,
    payload: {
      progress: e,
    },
  }
}


// Reducer
export function miscReducer(state = {}, action) {
  switch (action.type) {
  case FILE_UP_PROGRESS:
    if (action.payload && action.payload.progress) {
      return Object.assign({}, state, {
        progress: action.payload.progress,
      })
    }
    return state
  default:
    return state
  }
}
