import _ from 'lodash'

export const REMOVE_REQUEST = 'REMOVE_REQUEST'

export function removeRequest(requestType) {
  return {
    type: REMOVE_REQUEST,
    request: requestType,
  }
}

export function requestReducer(state = {}, action) {
  if (action.type.endsWith('_REQUEST')) {
    if (action.type === REMOVE_REQUEST) {
      return _.omit(state, action.request)
    }
    return Object.assign({}, state, {
      [action.type]: action,
    })
  } else if (action.type.endsWith('_OK')) {
    const reqAction = action.type.replace(/_OK$/, '_REQUEST')
    const newState = _.omit(state, reqAction)
    return Object.assign({}, newState, {
      [action.type]: action,
    })
  } else if (action.type.endsWith('_ERR')) {
    const reqAction = action.type.replace(/_ERR$/, '_REQUEST')
    const newState = _.omit(state, reqAction)
    return Object.assign({}, newState, {
      [action.type]: action,
    })
  }
  return state
}
