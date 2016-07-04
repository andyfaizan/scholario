import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import SetForgotPasswordForm from '../../forms/SetForgotPasswordForm/SetForgotPasswordForm'
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
  const styles = getStyles()

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
      <div style={styles.landing}>
        <div>
          <NavBarLandingPage />
        </div>
        <div style={styles.container}>
          {displayCard}
        </div>
        <Divider />
      </div>
      <div>
      </div>
      <div style={styles.footer}>
        <FooterLanding />
      </div>
    </div>
  )
}

function getStyles() {
  return {
    landing: {
      backgroundColor: '#FBF6EC',
      minHeight: '100vh',
    },
    container: {
      fontWeight: 'bold',
      backgroundColor: 'white',
      height: '87%',
      backgroundSize: 'cover', /* for IE9+, Safari 4.1+, Chrome 3.0+, Firefox 3.6+ */
      '-webkit-background-size': 'cover', /* for Safari 3.0 - 4.0 , Chrome 1.0 - 3.0 */
      '-moz-background-size': 'cover', /* optional for Firefox 3.6 */
      '-o-background-size': 'cover', /* for Opera 9.5 */
      margin: 0, /* to remove the default white margin of body */
      padding: 0, /* to remove the default white margin of body */
      overflow: 'hidden',
    },
    footer: {
      fontSize: '20px',
      backgroundColor: 'white',
      color: 'darkslategray',
      height: '10%',
    },
    dash: {
      display: 'block',
      width: '100%',
    },
    a: {
      ':link': {
        backgroundColor: 'rebeccapurple',
      },
    },
  }
}

ForgotPasswordView.propTypes = propTypes

const mapStateToProps = (state) => ({
  forgotPasswordOk: selectors.getRequest(state, FORGOT_PASSWORD_OK),
  forgotPasswordErr: selectors.getRequest(state, FORGOT_PASSWORD_ERR),
  resetPasswordOk: selectors.getRequest(state, RESET_PASSWORD_OK),
})

export default connect(
  mapStateToProps,
)(Radium(ForgotPasswordView))
