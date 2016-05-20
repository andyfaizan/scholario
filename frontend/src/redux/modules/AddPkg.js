// Constants
export const LOAD_ADD_PKG = 'LOAD_ADD_PKG'

// Action Creators
export const load = data => ({ type: LOAD_ADD_PKG, data })

const pkgReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ADD_PKG:
      return {
        data: action.data
      }
    default:
      return state
  }
}

export default pkgReducer
