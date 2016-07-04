import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'
import classes from './SetForgotPasswordForm.scss'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Edit from 'material-ui/svg-icons/image/edit'
import RaisedButton from 'material-ui/RaisedButton'


export const fields = ['password', 'confirmPassword']

const validate = (values) => {
  const errors = {}

  if (!values.password) {
    errors.password = 'Erforderlich'
  } else if (values.password.length < 8) {
    errors.password = 'Mindestens 8 zeichnen'
  } else if (values.password !== values.confirmPassword) {
    errors.password = 'Die Passwörter Stimmen nicht überein'
  }

  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
}

const defaultProps = {
  fields: {},
}

function SetForgotPassword({ fields: { password, confirmPassword }, handleSubmit }) {
  const styles = getStyles()

  let feedbackMessage
  const feedbackTrue = null

  if (feedbackTrue === 0) {
    feedbackMessage = <div style={styles.error}>Passwörter stimmen nicht überein</div>
  } else if (feedbackTrue === 1) {
    feedbackMessage = <div style={styles.success}>Ihr Passwort wurde geändert</div>
  } else feedbackMessage = ''

  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.rootForgotPass}>
        <div style={styles.forgotPassword}>
          <div style={styles.inner} >
            <Card>
              <CardHeader
                title="Setze dein Passwort zurück"
                titleStyle={classes.titleStyle}
                titleColor="#26A65B"
                avatar={<Edit style={styles.iconStyle} />}
              />
              <Divider />
              <CardText>
                <div style={styles.containingEmail}>
                  <TextField
                    {...password}
                    errorText={password.touched && password.error ? password.error : ''}
                    floatingLabelText="Das neue Passwort eingeben"
                    fullWidth={false}
                    floatingLabelStyle={classes.floatingLabel}
                    underlineFocusStyle={classes.underlineColor}
                    style={styles.textFieldStyle}
                    type="password"
                  />
                  <TextField
                    {...confirmPassword}
                    floatingLabelText="Geben Sie Ihr neues Passwort noch Einmal"
                    fullWidth={false}
                    floatingLabelStyle={classes.floatingLabel}
                    underlineFocusStyle={classes.underlineColor}
                    style={styles.textFieldStyle}
                    type="password"
                  />
                </div>
                <br />
                <br />
                <div style={styles.containingEmail}>
                  <RaisedButton
                    label="zurückstellen"
                    primary={false}
                    labelColor="#ffffff"
                    backgroundColor="#446CB3"
                    style={styles.buttonStyle}
                    linkButton
                    onTouchTap={handleSubmit}
                  />
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
    </form>
  )
}

function getStyles() {
  return {
    forgotPassword: {
      display: 'tableCell',
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
    floatingLabel: {
      opacity: 0.7,
      fontSize: '80%',
      color: '#26A65B',
    },
    underlineColor: {
      borderColor: '#446CB3',
    },
    iconStyle: {
      height: '50px',
      width: '50px',
      opacity: 0.8,
    },
    textFieldStyle: {
      width: '80%',
      padding: 0,
      fontSize: '200%',
    },
    mediumIcon: {
      width: '120px',
      height: '120px',
      paddingRight: '10px',
      paddingLeft: '10px',
      paddingTop: '10px',
      paddingBottom: 0,
      marginTop: 0,
      marginRight: 0,
    },
    medium: {
      width: '60px',
      height: '60px',
    },
    sendEmail: {
      opacity: 0.8,
    },
    buttonStyle: {
      width: '80%',
    },
  }
}

SetForgotPassword.propTypes = propTypes
SetForgotPassword.defaultProps = defaultProps

export default reduxForm({
  form: 'SetForgotPassword',
  fields,
  validate,
})(Radium(SetForgotPassword))
