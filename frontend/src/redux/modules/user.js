import { normalize } from 'normalizr'
var request = require('superagent');
import { userSchema } from '../schemas'

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_OK = 'LOGIN_OK'
export const LOGIN_ERR = 'LOGIN_ERR'


// ------------------------------------
// Actions
// ------------------------------------
export function loginRequest() {
  return {
    type: REQUEST_LOGIN,
  }
}

export function loginOk(user, data) {
  console.log(data)
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
              }
            });
  }
}

export const actions = {
  loginRequest,
  loginOk,
  loginErr,
  requestLogin,
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

export default function loginReducer(state=initialState, action) {
  switch (action.type) {
    case LOGIN_OK:
      return action.user
    default:
      return state
  }
  //const handler = ACTION_HANDLERS[action.type]

  //return handler ? handler(state, action) : state
}
