import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import LiveHelp from 'material-ui/svg-icons/communication/live-help'
import ForgotPasswordForm from '../../forms/ForgotPasswordForm/ForgotPasswordForm'
import classes from './ForgotPassword.scss'

function ForgotPassword() {
  let feedbackMessage
  const feedbackTrue = this.props.feedbackTrue

  if (feedbackTrue === 0) {
    feedbackMessage = <div className={classes.error}>Falsche E-Mail-Konto</div>
  } else if (feedbackTrue === 1) {
    feedbackMessage = <div className={classes.success}>E-Mail wurde auf Ihr Konto gesendet</div>
  } else {
    feedbackMessage = ''
  }

  return (
    <div className={classes.rootForgotPass}>
      <div className={classes.forgotPassword}>
        <div className={classes.inner} >
          <Card>
            <CardHeader
              title="Passwort vergessen. Bitte geben Sie Ihre E-Mail Addresse"
              titleStyle={classes.titleStyle}
              titleColor="#26A65B"
              avatar={<LiveHelp className={classes.iconStyle} />}
            />
            <Divider />
            <CardText>
              <div className={classes.containingEmail}>
                <ForgotPasswordForm onSubmit={this.props.onSubmitForgotPassword} />
              </div>
              <br />
              <div className={classes.feedback}>
                <h4>{feedbackMessage}</h4>
              </div>
              <br />
            </CardText>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
