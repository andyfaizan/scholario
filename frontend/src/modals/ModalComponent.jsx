import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Dialog from 'material-ui/Dialog'
import Tabs from 'material-ui/Tabs/Tabs'
import Tab from 'material-ui/Tabs/Tab'
import RaisedButton from 'material-ui/RaisedButton'

import LoginFields from '../forms/LoginFields/LoginFields'
import SignupFields from '../forms/SignupFields/SignupFields'
import { hide } from '../redux/modules/modal'
import { login, createUser } from '../redux/modules/user'
import { removeRequest } from '../redux/modules/request'
import * as selectors from '../redux/selectors'


const propTypes = {
  modal: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  router: PropTypes.object,
  universities: PropTypes.array,
  loginErr: PropTypes.string,
  signupErr: PropTypes.string,
  hide: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func,
  onSignupSubmit: PropTypes.func,
  push: PropTypes.func,
}

const contextTypes = {
  router: PropTypes.object,
}

export class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
    this.sendLoginRequest = this.sendLoginRequest.bind(this)
    this.sendSignupRequest = this.sendSignupRequest.bind(this)
    this.confirmLogin = this.confirmLogin.bind(this)
    this.confirmSignup = this.confirmSignup.bind(this)
  }

  confirmLogin = () => {
    this.refs.loginForm.submit()
  }

  confirmSignup = () => {
    this.refs.signupForm.submit()
  }

  sendLoginRequest = (data) => {
    this.props.onLoginSubmit(data)
  }

  sendSignupRequest = (data) => {
    this.props.onSignupSubmit(data)
    this.props.hide()
  }

  render() {
    const styles = getStyles()

    const actions = [
      <Tabs tabItemContainerStyle={styles.tabItemContainerStyle} inkBarStyle={styles.inkBarStyle}>
        <Tab label="Einloggen" >
          <div>
            <LoginFields
              ref="loginForm"
              onSubmit={this.sendLoginRequest}
              confirm={this.confirmLogin}
              onClickForgotPassword={() => { this.props.hide(); this.props.push('/forgot-password') }}
            />
          </div>
          <div
            ref="loginErrorText"
            style={this.props.loginErr ? styles.errorTextShownStyle : styles.errorTextHiddenStyle}
          >
            Falsche Email oder Kennwort
          </div>
          <div style={styles.buttonStyle}>
            <br />
            <RaisedButton
            // TODO disabled={submitting}
              type="submit"
              label="Einloggen"
              primary={false}
              backgroundColor="#446CB3"
              fullWidth
              labelStyle={styles.labelStyle}
              onTouchTap={this.confirmLogin}
            />
          </div>
          <br />
        </Tab>
        <Tab label="Registrieren" >
          <div>
            <SignupFields
              ref="signupForm"
              onSubmit={this.sendSignupRequest}
              universities={this.props.universities}
              confirm={this.confirmSignup}
            />
          </div>
          <div style={styles.buttonStyle}>
            <RaisedButton
              label="Registrieren"
              type="submit"
              primary={false}
              backgroundColor="#446CB3"
              fullWidth
              labelStyle={styles.labelStyle}
              onTouchTap={this.confirmSignup}
            />
          </div>
          <br />
        </Tab>
      </Tabs>,
    ]
    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.modal.visible}
          onRequestClose={this.props.hide}
          actionsContainerStyle={styles.customContentStyle}
          titleStyle={styles.customContentStyleTwo}
          contentStyle={styles.customContentStyleThree}
          bodyStyle={styles.customContentStyleFour}
          repositionOnUpdate
          style={styles.mainComponentStyle}
        />
      </div>
    )
  }
}

function getStyles() {
  return {
    labelStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    buttonStyle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '10%',
      marginRight: '10%',
    },
    customContentStyle: {
      padding: '2px',
      marginBottom: '0px',
      marginTop: '0px',
    },
    customContentStyleTwo: {
      margin: '0px',
      padding: '0px',
      lineHeight: '0px',
    },
    customContentStyleThree: {
      padding: '1px',
      marginBottom: '0px',
      marginTop: '0px',
      width: '30%',
      margin: '0 auto',
    },
    customContentStyleFour: {
      padding: '0px',
      marginBottom: '0px',
      marginTop: '0px',
      width: '100%',
      margin: '0px',
    },
    tabItemContainerStyle: {
      backgroundColor: '#26A65B',
      fontWeight: 'bold',
    },
    inkBarStyle: {
      backgroundColor: '#446CB3',
    },
    errorTextHiddenStyle: {
      visibility: 'hidden',
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '3%',
    },
    errorTextShownStyle: {
      visibility: 'visible',
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '3%',
    },
    mainComponentStyle: {
      position: 'absolute',
      marginTop: '-10%',
    },
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
  user: state.user,
  router: state.router,
  universities: selectors.getUniversitiesWithPrograms(state),
  loginErr: selectors.getRequest(state, 'LOGIN_ERR'),
  signupErr: selectors.getRequest(state, 'SIGNUP_ERR'),
})

const mapDispatchToProps = (dispatch) => ({
  hide: () => {
    dispatch(hide('LOGIN_MODAL'))
    dispatch(removeRequest('LOGIN_ERR'))
  },
  onLoginSubmit: values => {
    dispatch(login(values.email, values.password))
  },
  onSignupSubmit: values => {
    dispatch(createUser(
      values.firstname, values.lastname, values.email,
      values.password, 'student', values.university, values.program,
    ))
  },
  push: path => dispatch(push(path)),
})

ModalComponent.propTypes = propTypes
ModalComponent.contextTypes = contextTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Radium(ModalComponent))
