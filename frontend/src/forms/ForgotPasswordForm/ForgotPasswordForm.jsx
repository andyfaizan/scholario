import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import Mail from 'material-ui/svg-icons/communication/mail-outline'
import IconButton from 'material-ui/IconButton'
import classes from './ForgotPasswordForm.scss'


export const fields = ['email']

const validate = () => {
  const errors = {}
  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
}

const defaultProps = {
  fields: {},
}

function ForgotPassword({ fields: { email }, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        {...email}
        floatingLabelText="Deine Email Addresse"
        fullWidth={false}
        floatingLabelStyle={classes.floatingLabel}
        underlineFocusStyle={classes.underlineColor}
        style={classes.stextFieldStyle}
      />
      <IconButton
        iconStyle={classes.medium}
        style={classes.mediumIcon}
        linkButton
        onTouchTap={handleSubmit}
      >
        <Mail style={classes.sendEmail} color="#446CB3" />
      </IconButton>
    </form>
  )
}

ForgotPassword.propTypes = propTypes
ForgotPassword.defaultProps = defaultProps

export default reduxForm({
  form: 'ForgotPassword',
  fields,
  validate,
})(ForgotPassword)
