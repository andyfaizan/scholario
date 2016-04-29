import { normalize } from 'normalizr'
import request from 'superagent'
import { browserHistory } from '../../history'
import { userSchema } from '../schemas'

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_OK = 'LOGIN_OK'
export const LOGIN_ERR = 'LOGIN_ERR'

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_OK = 'SIGNUP_OK'
export const SIGNUP_ERR = 'SIGNUP_ERR'


// ------------------------------------
// Actions
// ------------------------------------
export function loginRequest() {
  return {
    type: REQUEST_LOGIN,
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

export function requestLogin(email, password) {
  return function (dispatch) {
    dispatch(loginRequest())
    return request
            .post('https://api.scholario.de/auth/login')
            .send({ email: email, password: password })
            .end(function (err, res) {
              if (err || !res.ok) {
                dispatch(loginErr(res.body.err))
              } else {
                var response = normalize(res.body.user, userSchema)
                dispatch(loginOk({ token: res.body.user.token, _id: res.body.user._id },
                                 response))
                browserHistory.push('/dashboard')
              }
            });
  }
}

export function signupRequest() {
  return {
    type: REQUEST_SIGNUP,
  }
}

export function signupOk() { //user, data) {
  //console.log(data)
  return {
    type: SIGNUP_OK
    // ,
    // response: data,
    // user,
  }
}

export function signupErr(err) {
  return {
    type: SIGNUP_ERR,
    payload: {
      err: err
    }
  }
}

export function requestSignup(firstname, lastname, role, email, password) {
  return function (dispatch) {
    dispatch(signupRequest())
    return request
    .post('https://api.scholario.de/users')
    .send({ email: email, password: password,
      firstname: firstname, lastname: lastname, role: role })
      .end(function(err, res){
        if (err || !res.ok) {
          dispatch(signupErr(res.body.err))
        } else {
          //var response = normalize(res.body.user, userSchema)
          // dispatch(signupOk({ token: res.body.user.token, _id: res.body.user._id },
          //                  response))
          dispatch(signupOk())
        }
      })
  }
}

export const actions = {
  loginRequest,
  loginOk,
  loginErr,
  requestLogin,
  signupRequest,
  signupOk,
  signupErr,
  requestSignup
}

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
  id: '',
  firstname: '',
  lastname: '',
}

// Fake state returned on signup for testing
const bogusState = {
  token: 'blah',
  id: 'blah',
  firstname: 'Andy',
  lastname: 'Faizan',
}

export default function loginReducer(state=initialState, action) {
  switch (action.type) {
    case LOGIN_OK:
      return action.user
    case SIGNUP_OK:
      return bogusState
    default:
      return state
  }
  //const handler = ACTION_HANDLERS[action.type]

  //return handler ? handler(state, action) : state
}
