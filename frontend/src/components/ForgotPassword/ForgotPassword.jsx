import React from 'react'
import Radium from 'radium'

import ForgotPasswordForm from '../../forms/ForgotPasswordForm/ForgotPasswordForm'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import LiveHelp from 'material-ui/svg-icons/communication/live-help'


const propTypes = {
}

function ForgotPassword() {
  const styles = getStyles()

  let feedbackMessage
  const feedbackTrue = this.props.feedbackTrue

  if (feedbackTrue === 0) {
    feedbackMessage = <div style={styles.error}>Falsche E-Mail-Konto</div>
  } else if (feedbackTrue === 1) {
    feedbackMessage = <div style={styles.success}>E-Mail wurde auf Ihr Konto gesendet</div>
  } else {
    feedbackMessage = ''
  }

  return (
    <div style={styles.rootForgotPass}>
      <div style={styles.forgotPassword}>
        <div style={styles.inner} >
          <Card>
            <CardHeader
              title="Passwort vergessen. Bitte geben Sie Ihre E-Mail Addresse"
              titleStyle={styles.titleStyle}
              titleColor="#26A65B"
              avatar={<LiveHelp style={styles.iconStyle} />}
            />
            <Divider />
            <CardText>
              <div style={styles.containingEmail}>
                <ForgotPasswordForm onSubmit={this.props.onSubmitForgotPassword} />
              </div>
              <br />
              <div style={styles.feedback}>
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

function getStyles() {
  return {
    forgotPassword: {
      display: 'table-cell',
      verticalAlign: 'middle',
    },
    rootForgotPass: {
      display: 'table',
      position: 'absolute',
      height: '70%',
      width: '100%',
    },
    inner: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '70%',
    },
    containingEmail: {
      marginLeft: '10%',
      marginRight: '10%',
    },
    feedback: {
      color: '#26A65B',
      textAlign: 'center',
      marginLeft: '-16px',
    },
    error: {
      color: 'red',
    },
    success: {
      color: '#26A65B',
    },
    titleStyle: {
      marginTop: '15px',
      fontSize: '170%',
      opacity: 0.7,
    },
    iconStyle: {
      height: '50px',
      width: '50px',
      opacity: 0.8,
    },
  }
}

ForgotPassword.propTypes = propTypes

export default Radium(ForgotPassword)
