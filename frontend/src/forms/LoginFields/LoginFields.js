import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import classes from './LoginFields.scss'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

export const fields = [ 'email' , 'password' ]

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

export class LoginFields extends React.Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    // resetForm: PropTypes.func.isRequired,te
  }

  render () {
    const styles = {
      errorStyle:
      {
        backgroundColor: '#e74c3c'
      },
      underlineStyle:
      {
        borderColor: '#f1c40f'
      },
      focusStyle:
      {
        borderColor: '#f1c40f'
      },
      floatingLabelStyle:
      {
        color: '#27ae60'
      }
    }

    const { fields: { email, password } } = this.props

    return (
      <div>
          <div className={classes.loginContainer}>
            <TextField
              {...email}
              hintText='abc@hotmail.com'
              errorText={email.touched && email.error ? email.error : ''}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelText='Email or Username'
              underlineFocusStyle={styles.focusStyle}
              />
            <br/>
            <TextField
              {...password}
              errorText={password.touched && password.error ? password.error : ''}
              floatingLabelText='Password'
              type='password'
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.focusStyle}
              />
            <br/>
            <br/>
            <a className={classes.forgotLink}>Forgot your password ? </a>
            <br/>
          </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'loginForm',
  fields,
  validate
})(LoginFields)
