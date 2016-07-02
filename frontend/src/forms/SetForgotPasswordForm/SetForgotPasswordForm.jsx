import React, { PropTypes } from 'react'
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
  let feedbackMessage
  const feedbackTrue = null

  if (feedbackTrue === 0) {
    feedbackMessage = <div className={classes.error}>Passwörter stimmen nicht überein</div>
  } else if (feedbackTrue === 1) {
    feedbackMessage = <div className={classes.success}>Ihr Passwort wurde geändert</div>
  } else feedbackMessage = ''

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.rootForgotPass}>
        <div className={classes.forgotPassword}>
          <div className={classes.inner} >
            <Card>
              <CardHeader
                title="Setze dein Passwort zurück"
                titleStyle={classes.titleStyle}
                titleColor="#26A65B"
                avatar={<Edit className={classes.iconStyle} />}
              />
              <Divider />
              <CardText>
                <div className={classes.containingEmail}>
                  <TextField
                    {...password}
                    errorText={password.touched && password.error ? password.error : ''}
                    floatingLabelText="Das neue Passwort eingeben"
                    fullWidth={false}
                    floatingLabelStyle={classes.floatingLabel}
                    underlineFocusStyle={classes.underlineColor}
                    className={classes.textFieldStyle}
                    type="password"
                  />
                  <TextField
                    {...confirmPassword}
                    floatingLabelText="Geben Sie Ihr neues Passwort noch Einmal"
                    fullWidth={false}
                    floatingLabelStyle={classes.floatingLabel}
                    underlineFocusStyle={classes.underlineColor}
                    className={classes.textFieldStyle}
                    type="password"
                  />
                </div>
                <br />
                <br />
                <div className={classes.containingEmail}>
                  <RaisedButton
                    label="zurückstellen"
                    primary={false}
                    labelColor="#ffffff"
                    backgroundColor="#446CB3"
                    className={classes.buttonStyle}
                    linkButton
                    onTouchTap={handleSubmit}
                  />
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
    </form>
  )
}

SetForgotPassword.propTypes = propTypes
SetForgotPassword.defaultProps = defaultProps

export default reduxForm({
  form: 'SetForgotPassword',
  fields,
  validate,
})(SetForgotPassword)
