import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {submit} from 'redux-form'
import Dialog from 'material-ui/lib/dialog'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import RaisedButton from 'material-ui/lib/raised-button'
import LoginFields from '../forms/LoginFields/LoginFields'
import SignupFields from '../forms/SignupFields/SignupFields'
import {hide} from '../redux/modules/modal'
//import { browserHistory } from 'react-router'
import { login, createUser } from '../redux/modules/user'
import { browserHistory } from '../history'
import * as selectors from '../redux/selectors'

var request = require('superagent');
var self;

export class ModalComponent extends React.Component {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    hide: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.sendLoginRequest = this.sendLoginRequest.bind(this)
    this.sendSignupRequest = this.sendSignupRequest.bind(this)
    this.confirmLogin = this.confirmLogin.bind(this)
    this.confirmSignup = this.confirmSignup.bind(this)
    self = this
  }

  confirmLogin = () => {
    this.refs.loginForm.submit()
  }

  confirmSignup = () => {
    this.refs.signupForm.submit()
  }

  hideError = () => {
    this.refs.loginErrorText.style.visibility = 'hidden'
  }

  showError = () => {
    this.refs.loginErrorText.style.visibility = 'visible'
  }

  sendLoginRequest = (data) => {
    this.props.onLoginSubmit(data)
    this.props.hide()
    //browserHistory.push('/dashboard')
    //this.props.router.push('/dashboard')
    //this.context.router.push('/dashboard')

    // TODO async wait and then check
    // if (this.props.user.token !== ''){
    //   this.props.hide()
    //   this.context.router.push('/dashboard')
    // } else {
    //     this.showError()
    // }
  }

    sendSignupRequest = (data) => {
      this.props.onSignupSubmit(data)
      this.props.hide()
      //this.context.router.push('/dashboard')

      // TODO async wait and then check
      // if (this.props.user.token !== ''){
      //   this.props.hide()
      //   this.context.router.push('/dashboard')
      // } else {
      //     this.showError()
      // }
    }

  render () {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
      }
    }
    const buttonStyle = {
      align: 'center',
      marginLeft: '10%',
      marginRight: '10%'
    }
    const customContentStyle = {
      padding: 2,
      marginBottom: 0,
      marginTop: 0,
    }
    const customContentStyleTwo = {
      margin: 0,
      padding: '0px',
      lineHeight: '0px',
    }
    const customContentStyleThree = {
      padding: 1,
      marginBottom: 0,
      marginTop: 0,
      width: '30%',
      margin: '0 auto',
    }
    const customContentStyleFour = {
      padding: 0,
      marginBottom: 0,
      marginTop: 0,
      width: '100%',
      margin: 0,
    }
    const dialogRootStyle = {
      overflowY: 'scroll',
    }
    const tabItemContainerStyle = {
      backgroundColor: '#1abc9c',
      fontWeight: 'bold',
    }
    const inkBarStyle = {
      backgroundColor: 'yellow' //temporary color
    }

    const labelStyle = {
      color: 'white',
      fontWeight: 'bold'
    }

    const errorTextStyle = {
      visibility: 'hidden',
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '3%'
    }

    const mainComponentStyle = {

      position: 'absolute',
      marginTop: '-15%'

    }

    const actions = [
      <Tabs tabItemContainerStyle={tabItemContainerStyle} inkBarStyle={inkBarStyle}>
        <Tab label='Login' >
          <div>
            <LoginFields ref="loginForm" onSubmit={this.sendLoginRequest}/>
          </div>
          <div ref="loginErrorText" style={errorTextStyle}>
            Falsches Email oder Kennwort
          </div>
          <div style={buttonStyle}>
          <br/>
          <RaisedButton
            // TODO disabled={submitting}
            type='submit'
            label='Login'
            primary={false}
            backgroundColor='#f1c40f'
            fullWidth={true}
            labelStyle={labelStyle}
            onTouchTap={this.confirmLogin}
            />
        </div>
        <br/>
        </Tab>
        <Tab label='Sign Up' >
          <div>
            <SignupFields ref="signupForm" onSubmit={this.sendSignupRequest} universities={this.props.universities} />
          </div>
          <div ref="signupErrorText" style={errorTextStyle}>
            Falsches Email oder Kennwort
          </div>
          <div style={buttonStyle}>
            <RaisedButton
              label='Signup'
              type='submit'
              primary={false}
              backgroundColor='#f1c40f'
              fullWidth={true}
              labelStyle={labelStyle}
              onTouchTap={this.confirmSignup} />
          </div>
          <br/>
        </Tab>
      </Tabs>
    ]
    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.modal.visible}
          onRequestClose={this.props.hide}
          actionsContainerStyle={customContentStyle}
          titleStyle={customContentStyleTwo}
          contentStyle={customContentStyleThree}
          bodyStyle={customContentStyleFour}
          repositionOnUpdate={true}
          style = {mainComponentStyle}
          //style={dialogRootStyle}
          />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    user: state.user,
    router: state.router,
    universities: selectors.getUniversitiesWithPrograms(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hide: () => dispatch(hide('LOGIN_MODAL')),
    onLoginSubmit: values => {
      dispatch(login(values.email, values.password))
    },
    onSignupSubmit: values => {
      dispatch(createUser(
        values.firstname, values.lastname, values.email,
        values.password, values.role, values.university, values.program,
      ))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalComponent)
