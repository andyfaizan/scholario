import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import modal from './modules/modal'

export default combineReducers({
  counter,
  modal,
router})
