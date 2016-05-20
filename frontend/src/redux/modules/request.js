import _ from 'lodash'



export function requestReducer(state={}, action) {
  if (action.type.endsWith('_REQUEST')) {
    return Object.assign({}, state, {
      [action.type]: action
    })
  } else if (action.type.endsWith('_OK')) {
    var reqAction = action.type.replace(/_OK$/, '_REQUEST')
    return _.omit(state, reqAction)
  } else if (action.type.endsWith('_ERR')) {
    var reqAction = action.type.replace(/_ERR$/, '_REQUEST')
    return _.omit(state, reqAction)
  }
  return state
}
