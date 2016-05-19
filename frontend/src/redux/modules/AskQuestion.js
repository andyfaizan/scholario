// Constants
export const LOAD_ASK_QUESTION = 'LOAD_ASK_QUESTION'

// Action Creators
export const load = data => ({ type: LOAD_ASK_QUESTION, data })

const questionReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ASK_QUESTION:
      return {
        data: action.data
      }
    default:
      return state
  }
}

export default questionReducer
