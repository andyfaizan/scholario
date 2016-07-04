import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'
import classes from './ChangePasswordForm.scss'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export const fields = ['password']

const validate = (values) => {
  const errors = {}

  if (!values.password) {
    errors.password = 'Erforderlich'
  } else if (values.password.length < 8) {
    errors.password = 'Mindestens 8 zeichnen'
  }

  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
  feedbackTrue: PropTypes.number,
}

const defaultProps = {
  fields: {},
}

function ChangePassword({ fields: { password }, handleSubmit, feedbackTrue }) {
  let feedbackMessage

  if (feedbackTrue === 0) {
    feedbackMessage = <div className={classes.error}>Es gibt einen Fehler</div>
  } else if (feedbackTrue === 1) {
    feedbackMessage = <div className={classes.success}>Passwort ist verändert</div>
  } else feedbackMessage = ''

  return (
    <form onSubmit={handleSubmit}>
      <div >
        <TextField
          {...password}
          errorText={password.touched && password.error ? password.error : ''}
          floatingLabelText="Neues Passwort"
          floatingLabelStyle={classes.floatingLabel}
          underlineFocusStyle={classes.underlineColor}
          type="password"
        />
        <FlatButton label="Senden" linkButton onTouchTap={handleSubmit} hoverColor="#26A65B" />
        <div className={classes.feedback}>
          <h4>{feedbackMessage}</h4>
        </div>
      </div>
    </form>
  )
}

ChangePassword.propTypes = propTypes
ChangePassword.defaultProps = defaultProps

export default reduxForm({
  form: 'ChangePassword',
  fields,
  validate,
})(Radium(ChangePassword))
