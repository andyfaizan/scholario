import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import SetForgotPasswordForm from '../../forms/SetForgotPasswordForm/SetForgotPasswordForm'
import classes from './ForgotPasswordView.scss'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import * as selectors from '../../redux/selectors'
import { forgotPassword, resetPassword, FORGOT_PASSWORD_OK, RESET_PASSWORD_OK, FORGOT_PASSWORD_ERR, RESET_PASSWORD_ERR } from '../../redux/modules/user'
import { removeRequest } from '../../redux/modules/request'

type Props = {

};

export class ForgotPasswordView extends React.Component {
  props: Props;


  render () {
    const { forgotPasswordOk, forgotPasswordErr, resetPasswordOk } = this.props

    const pathForgotPass = '/forgot-password' ;
    const pathResetPass = '/reset-password';
    var displayCard

    var forgotPasswordFeedback = -1
    if (forgotPasswordOk) {
      forgotPasswordFeedback = 1
    } else if (forgotPasswordErr) {
      forgotPasswordFeedback = 0
    }
    if (resetPasswordOk) {
      //if (forgotPasswordOk)
        //this.props.dispatch(removeRequest(FORGOT_PASSWORD_OK))
      //this.props.dispatch(removeRequest(RESET_PASSWORD_OK))
      this.props.dispatch(push('/'))
    }
    if (this.props.location.pathname === pathForgotPass) {
      displayCard = <ForgotPassword
                     feedbackTrue={forgotPasswordFeedback}
                     onSubmitForgotPassword={(data) => this.props.dispatch(forgotPassword(data.email))}
                    />
    } else if (this.props.location.pathname.startsWith(pathResetPass)) {
      displayCard = <SetForgotPasswordForm
                     onSubmit={(data) => this.props.dispatch(resetPassword(this.props.params.code, data.password))}
                    />
    } else {
      console.log('Invalid pathname')
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
}

const mapStateToProps = (state) => {
  return {
    forgotPasswordOk: selectors.getRequest(state, FORGOT_PASSWORD_OK),
    forgotPasswordErr: selectors.getRequest(state, FORGOT_PASSWORD_ERR),
    resetPasswordOk: selectors.getRequest(state, RESET_PASSWORD_OK),
  }
}
export default connect(
  mapStateToProps,
)(ForgotPasswordView)
