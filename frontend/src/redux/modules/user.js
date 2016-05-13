import { normalize } from 'normalizr'
import { merge } from 'lodash'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { push, replace } from 'react-router-redux'
import { userSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

// ------------------------------------
// Constants
// ------------------------------------
//export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_OK = 'LOGIN_OK'
export const LOGIN_ERR = 'LOGIN_ERR'

//export const REQUEST_SIGNUP = 'REQUEST_SIGNUP'
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_OK = 'CREATE_USER_OK'
export const CREATE_USER_ERR = 'CREATE_USER_ERR'

export const LOGOUT = 'LOGOUT'
export const LOGOUT_OK = 'LOGOUT_OK'

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
                }
                dispatch(loginOk(user, response))
       /*         window.localStorage.setItem('scholario:store', JSON.stringify({*/
                  //user: user,
                  //entities: {
                    //users: response.entities.users,
                  //},
                /*}))*/
                dispatch(push('/dashboard'))
              }
            });
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
    default:
      if (action.response && action.response.entities && action.response.entities.users) {
        return merge({}, state, action.response.entities.users)
      }
      return state
  }
}
