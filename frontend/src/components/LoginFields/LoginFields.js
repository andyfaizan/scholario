import React from 'react'
import TextField from 'material-ui/lib/text-field'
import classes from './LoginFields.scss'
import RaisedButton from 'material-ui/lib/raised-button'
var request = require('superagent');

export class LoginFields extends React.Component {

  sendRequest = () => {
  //   request
  // .post('http://api.scholario.de/user')
  // .send({ email: this.props.email, password: this.props.password, role: 'student' }) // role can be 'prof'
  // .end(function(err, res){
  //   // Calling the end function will send the request
    // console.log("Error is : " + err);
  }

  // validateEmail () {
  //   //TODO Regex Solution not final
  //   // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  //   var value = this.props.email;
  //   console.log("Inside RegisterPage validateEmail(). Value is : " + value);
  //   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return (re.test(value));
  // };

  render () {
    const styles = {
      errorStyle:
      {
        backgroundColor: '#9fa8a3'
      },
      underlineStyle:
      {
        borderColor: '#e3e0cf'
      },
      focusStyle:
      {
        borderColor: '#e3e0cf'
      },
      floatingLabelStyle:
      {
        color: '#9fa8a3'
      },
      labelStyle:
      {
        color: '#fff',
        fontWeight: 'bold'
      }
    }
    return (
      <div>
        <div className={classes.loginContainer}>
          <TextField 
            hintText='abc@hotmail.com' 
            floatingLabelStyle={styles.floatingLabelStyle} 
            floatingLabelText='Email or Username' 
            underlineFocusStyle={styles.focusStyle}
            />
          <br/>
          <TextField 
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
          <RaisedButton label='Login' primary={false} backgroundColor='#9fa8a3' fullWidth={true} labelStyle={styles.labelStyle} 
            onClick = {this.sendRequest.bind(this)}/>
          <br/>
          <br/>
          <br/>
        </div>
      </div>
    )
  }
}

export default LoginFields

