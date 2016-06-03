import React from 'react'
import { connect } from 'react-redux'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import SetForgotPasswordForm from '../../forms/SetForgotPasswordForm/SetForgotPasswordForm'
import classes from './ForgotPasswordView.scss'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import { forgotPassword, resetPassword } from '../../redux/modules/user'

type Props = {

};

export class ForgotPasswordView extends React.Component {
  props: Props;


  render () {

    const pathForgotPass = '/forgot-password' ;
    const pathResetPass = '/reset-password';
    var displayCard

    if (this.props.location.pathname === pathForgotPass) {
      displayCard = <ForgotPassword onSubmitForgotPassword={(data) => this.props.dispatch(forgotPassword(data.email))} />
    } else if (this.props.location.pathname.startsWith(pathResetPass)) {
      displayCard = <SetForgotPasswordForm onSubmit={(data) => this.props.dispatch(resetPassword(this.props.params.code, data.password))} />
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

export default connect(
)(ForgotPasswordView)
