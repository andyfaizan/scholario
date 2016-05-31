import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField';
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
    confirm: PropTypes.func
    // resetForm: PropTypes.func.isRequired,te
  }

  constructor(props){
    super(props)
    this.checkKeyAndSubmit = this.checkKeyAndSubmit.bind(this)
  }

  checkKeyAndSubmit = (e) => {
    if(e.keyCode === 13){
      this.props.confirm()
    }
  }

  render () {
    const styles = {
      errorStyle:
      {
        backgroundColor: '#e74c3c'
      },
      underlineStyle:
      {
        borderColor: '#446CB3'
      },
      focusStyle:
      {
        borderColor: '#446CB3'
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
              floatingLabelText='Email'
              underlineFocusStyle={styles.focusStyle}
              onKeyDown={this.checkKeyAndSubmit}
              />
            <br/>
            <TextField
              {...password}
              errorText={password.touched && password.error ? password.error : ''}
              floatingLabelText='Passwort'
              type='password'
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.focusStyle}
              onKeyDown={this.checkKeyAndSubmit}
              />
            {/*<br/>
            <br/>
            <a className={classes.forgotLink}>Forgot your password ? </a>*/}
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
