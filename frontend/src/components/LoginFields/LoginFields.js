import React from 'react'
import TextField from 'material-ui/lib/text-field'
import classes from './LoginFields.scss'
import RaisedButton from 'material-ui/lib/raised-button'
var request = require('superagent');

export class LoginFields extends React.Component {

  sendRequest = () => {
    request
  .post('https://api.scholario.de/auth/login')
  .send({ email: 'andy@scholario.de', password: 'abcd' })
  .end(function(err, res){
    // Calling the end function will send the request
    console.log("Error is : " + err);
    if(res.ok){
      console.log(res.body);
    } else{
      console.log("Response not ok");
    }
  })
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
          <RaisedButton label='Login' primary={false} backgroundColor='#f1c40f' fullWidth={true} labelStyle={styles.labelStyle} 
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

