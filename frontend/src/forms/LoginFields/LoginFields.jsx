import React, { PropTypes } from 'react'
import Radium from 'radium'
import TextField from 'material-ui/TextField'
import classes from './LoginFields.scss'
import { reduxForm } from 'redux-form'

export const fields = ['email', 'password']

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Erforderlich'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Ungültige Email Addresse'
  }
  if (!values.password) {
    errors.password = 'Erforderlich'
  } else if (values.password.length < 8) {
    errors.password = 'Mindestens 8 zeichnen'
  }
  return errors
}

const propTypes = {
  fields: PropTypes.object.isRequired,
  confirm: PropTypes.func,
  onClickForgotPassword: PropTypes.func,
}

export class LoginFields extends React.Component {
  constructor(props) {
    super(props)
    this.checkKeyAndSubmit = this.checkKeyAndSubmit.bind(this)
  }

  checkKeyAndSubmit = (e) => {
    if (e.keyCode === 13) this.props.confirm()
  }

  render() {
    const { fields: { email, password } } = this.props

    return (
      <div>
        <div className={classes.loginContainer}>
          <TextField
            {...email}
            hintText="abc@hotmail.com"
            errorText={email.touched && email.error ? email.error : ''}
            floatingLabelStyle={classes.floatingLabelStyle}
            floatingLabelText="Email"
            underlineFocusStyle={classes.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          />
          <br />
          <TextField
            {...password}
            errorText={password.touched && password.error ? password.error : ''}
            floatingLabelText="Passwort"
            type="password"
            floatingLabelStyle={classes.floatingLabelStyle}
            underlineFocusStyle={classes.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          />
          <br />
          <br />
          <a onTouchTap={this.props.onClickForgotPassword} className={classes.forgotLink}>Passwort vergessen? </a>
        </div>
      </div>
    )
  }
}

LoginFields.propTypes = propTypes

export default reduxForm({
  form: 'loginForm',
  fields,
  validate,
})(Radium(LoginFields))
