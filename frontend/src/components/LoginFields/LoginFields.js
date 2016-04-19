import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import classes from './LoginFields.scss'
import RaisedButton from 'material-ui/lib/raised-button'
import { reduxForm } from 'redux-form'

var request = require('superagent');
export const fields = [ 'email' , 'password' ]

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Mindestens 8 zeichnen'
  }
  return errors
}

export class LoginFields extends React.Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
    // resetForm: PropTypes.func.isRequired,te
    // submitting: PropTypes.bool.isRequired
  }

    sendRequest = (data) => {
      request
    .post('https://api.scholario.de/auth/login')
    .send({ email: data.email, password: data.password })
    .end(function(err, res){
      // Calling the end function will send the request
      console.log("Data is : " + data.email + " " + data.password);
      if(res.ok){
        console.log("Status : " + res.status);
        console.log("Response body : " + res.text);
      } else{
        console.log("Response not ok. Error is : " + err);
      }
    })
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
      },
      labelStyle:
      {
        color: 'white',
        fontWeight: 'bold'
      }
    }

    const { fields: { email, password }, handleSubmit } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.sendRequest.bind(this))}>
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
            <br/>
            <RaisedButton
              // TODO disabled={submitting}
              type='submit'
              label='Login'
              primary={false}
              backgroundColor='#f1c40f'
              fullWidth={true}
              labelStyle={styles.labelStyle}
              />
            <br/>
            <br/>
            <br/>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'loginForm',
  fields,
  validate
})(LoginFields)
