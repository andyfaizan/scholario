import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import modal from './modules/modal'
import user from './modules/user'
import entities from './modules/entities'
import Material from './modules/Material'
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  counter,
  modal,
  form : formReducer,
  user,
  entities,
  Material,
router})
