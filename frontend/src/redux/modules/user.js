import { normalize } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { push, replace } from 'react-router-redux'
import urlJoin from 'url-join'
import config from '../../config'
import { userSchema } from '../schemas'
import { FOLLOW_COURSE_INSTANCE_OK } from './course-instance'
import { hide } from './modal'
import { removeRequest } from './request'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
//export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_OK = 'LOGIN_OK'
export const LOGIN_ERR = 'LOGIN_ERR'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_OK = 'GET_USER_OK'
export const GET_USER_ERR = 'GET_USER_ERR'

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_OK = 'CREATE_USER_OK'
export const CREATE_USER_ERR = 'CREATE_USER_ERR'

export const PUT_USER_REQUEST = 'PUT_USER_REQUEST'
export const PUT_USER_OK = 'PUT_USER_OK'
export const PUT_USER_ERR = 'PUT_USER_ERR'

export const LOGOUT = 'LOGOUT'
export const LOGOUT_OK = 'LOGOUT_OK'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_OK = 'FORGOT_PASSWORD_OK'
export const FORGOT_PASSWORD_ERR = 'FORGOT_PASSWORD_ERR'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_OK = 'RESET_PASSWORD_OK'
export const RESET_PASSWORD_ERR = 'RESET_PASSWORD_ERR'

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST'
export const FOLLOW_USER_OK = 'FOLLOW_USER_OK'
export const FOLLOW_USER_ERR = 'FOLLOW_USER_ERR'

// ------------------------------------
// Actions
// ------------------------------------
export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  }
}

export function loginOk(user, data) {
  return {
    type: LOGIN_OK,
    response: data,
    user,
  }
}

export function loginErr(err) {
  return {
    type: LOGIN_ERR,
    payload: {
      err: err
    }
  }
}

export function login(email, password) {
  return function (dispatch) {
    dispatch(loginRequest())
    return superagent
            .post('https://api.scholario.de/auth/login')
            .send({ email: email, password: password })
            .end(function (err, res) {
              if (err || !res.ok) {
                dispatch(loginErr(res.body.err))
              } else {
                var response = normalize(res.body.user, userSchema)
                const user = {
                  token: res.body.user.token,
                  _id: res.body.user._id,
                  fetchedData: true,
                }
                dispatch(hide('LOGIN_MODAL'))
                dispatch(removeRequest('LOGIN_ERR'))
                dispatch(loginOk(user, response))
                dispatch(replace('/dashboard'))
              }
            });
  }
}

export function getUser() {
  var endpoint = urlJoin(config.apiURL, 'user')

  return {
    types: [GET_USER_REQUEST, GET_USER_OK, GET_USER_ERR],
    callAPI: () => request.get(endpoint),
    schema: userSchema,
  }
}

export function putUser(firstname = '', lastname = '', bio = '', password = '') {
  const endpoint = urlJoin(config.apiURL, 'user')
  var data = {}
  if (firstname) data.firstname = firstname
  if (lastname) data.lastname = lastname
  if (bio) data.bio = bio
  if (password) data.password = password

  return {
    types: [PUT_USER_REQUEST, PUT_USER_OK, PUT_USER_ERR],
    callAPI: () => request.put(endpoint).send(data),
    schema: userSchema,
  }
}

export function createUserRequest() {
  return {
    type: CREATE_USER_REQUEST,
  }
}

export function createUserOk() { //user, data) {
  return {
    type: CREATE_USER_OK
    // ,
    // response: data,
    // user,
  }
}

export function createUserErr(err) {
  return {
    type: CREATE_USER_ERR,
    payload: {
      err: err
    }
  }
}

export function createUser(firstname, lastname, email, password, role, university, program) {
  return function (dispatch) {
    dispatch(createUserRequest())
    return superagent
    .post('https://api.scholario.de/users')
    .accept('json')
    .send({ firstname, lastname, email, password, role, university, program })
      .end(function(err, res){
        if (err || !res.ok) {
          dispatch(createUserErr(res.body.err))
        } else {
          //var response = normalize(res.body, {user:userSchema, question:questionSchema})
          // dispatch(signupOk({ token: res.body.user.token, _id: res.body.user._id },
          //                  response))
          dispatch(createUserOk())
        }
      })
  }
}

export function followUser(uid) {
  const endpoint = urlJoin(config.apiURL, 'users', uid,'follow')
  return {
    types: [FOLLOW_USER_REQUEST, FOLLOW_USER_OK, FOLLOW_USER_ERR],
    callAPI: () => request.get(endpoint),
    payload: { uid },
  }
}

export function logout() {
  return function (dispatch) {
    dispatch(logoutOk())
    dispatch(replace('/'))
  }
}

export function logoutOk() {
  return {
    type: LOGOUT_OK,
    response: {
      entities: {}
    },
    user: {},
  }
}

export function forgotPassword(email) {
  const endpoint = urlJoin(config.apiURL, 'auth', 'forgot-password')
  return {
    types: [FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_OK, FORGOT_PASSWORD_ERR],
    callAPI: () => request.post(endpoint).send({ email }),
    payload: { email },
  }
}

export function resetPassword(code, password) {
  const endpoint = urlJoin(config.apiURL, 'auth', 'reset-password', code)
  return {
    types: [RESET_PASSWORD_REQUEST, RESET_PASSWORD_OK, RESET_PASSWORD_ERR],
    callAPI: () => request.post(endpoint).send({ password }),
    payload: { code },
  }
}

/*export const actions = {*/
  //loginRequest,
  //loginOk,
  //loginErr,
  //requestLogin,
  //signupRequest,
  //signupOk,
  //signupErr,
  //requestSignup
//}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_OK]: (state, action) => state + action.payload,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: '',
  _id: '',
}

// Fake state returned on signup for testing
const bogusState = {
  token: 'blah',
  id: 'blah',
  firstname: 'Andy',
  lastname: 'Faizan',
}

export function loginReducer(state=initialState, action) {
  switch (action.type) {
    case LOGIN_OK:
      return action.user
    case LOGOUT_OK:
      return initialState
    //case SIGNUP_OK:
      //return bogusState
    default:
      return state
  }
  //const handler = ACTION_HANDLERS[action.type]

  //return handler ? handler(state, action) : state
}

export function userReducer(state={}, action) {
  switch (action.type) {
    case FOLLOW_COURSE_INSTANCE_OK:
      let cid = action.cid
      let uid = action.uid
      if (state[uid]) {
        let u = Object.assign({}, state[uid], {
          courseInstances: [
            ...state[uid].courseInstances,
            cid
          ],
        })
        return Object.assign({}, state, { [uid]: u })
      }

    default:
      if (action.response && action.response.entities && action.response.entities.users) {
        return merge({}, state, action.response.entities.users)
      }
      return state
  }
}
