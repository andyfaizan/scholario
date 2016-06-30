import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import SetForgotPasswordForm from '../../forms/SetForgotPasswordForm/SetForgotPasswordForm'
import classes from './ForgotPasswordView.scss'
import Divider from 'material-ui/Divider'
import * as selectors from '../../redux/selectors'
import {
  forgotPassword, resetPassword, FORGOT_PASSWORD_OK, RESET_PASSWORD_OK,
  FORGOT_PASSWORD_ERR } from '../../redux/modules/user'

const propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  forgotPasswordOk: PropTypes.string,
  forgotPasswordErr: PropTypes.string,
  resetPasswordOk: PropTypes.string,
  dispatch: PropTypes.func,
}

function ForgotPasswordView({
  params, location,
  forgotPasswordOk, forgotPasswordErr, resetPasswordOk,
  dispatch }) {
  const pathForgotPass = '/forgot-password'
  const pathResetPass = '/reset-password'
  let displayCard

  let forgotPasswordFeedback = -1
  if (forgotPasswordOk) {
    forgotPasswordFeedback = 1
  } else if (forgotPasswordErr) {
    forgotPasswordFeedback = 0
  }
  if (resetPasswordOk) {
    // if (forgotPasswordOk)
      // dispatch(removeRequest(FORGOT_PASSWORD_OK))
    // dispatch(removeRequest(RESET_PASSWORD_OK))
    dispatch(push('/'))
  }
  if (location.pathname === pathForgotPass) {
    displayCard = (
      <ForgotPassword
        feedbackTrue={forgotPasswordFeedback}
        onSubmitForgotPassword={(data) => dispatch(forgotPassword(data.email))}
      />
    )
  } else if (location.pathname.startsWith(pathResetPass)) {
    displayCard = (
      <SetForgotPasswordForm
        onSubmit={(data) => dispatch(resetPassword(params.code, data.password))}
      />
    )
  } else {
    displayCard = null
  }

  return (
    <div>
      <div className={classes.landing}>
        <div>
          <NavBarLandingPage />
        </div>
        <div className={classes.container}>
          {displayCard}
        </div>
        <Divider />
      </div>
      <div>
      </div>
      <div className={classes.footer}>
        <FooterLanding />
      </div>
    </div>
  )
}

ForgotPasswordView.propTypes = propTypes

const mapStateToProps = (state) => ({
  forgotPasswordOk: selectors.getRequest(state, FORGOT_PASSWORD_OK),
  forgotPasswordErr: selectors.getRequest(state, FORGOT_PASSWORD_ERR),
  resetPasswordOk: selectors.getRequest(state, RESET_PASSWORD_OK),
})

export default connect(
  mapStateToProps,
)(ForgotPasswordView)
