import React from 'react'
import TextField from 'material-ui/lib/text-field'
import classes from './LoginFields.scss'
import RaisedButton from 'material-ui/lib/raised-button'
var request = require('superagent');

type Props = {

};
export class LoginFields extends React.Component {
  props: Props;

  sendRequest = () => {
    request
  .post('http://api.scholario.de/user')
  .send({ email: 'abc@ss.com', password: 'cat', role: 'student' }) // role can be 'prof'
  .end(function(err, res){
    // Calling the end function will send the request
    console.log("Error is : " + err);
  });
  }

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
          <TextField hintText='abc@hotmail.com' floatingLabelStyle={styles.floatingLabelStyle} floatingLabelText='Email or Username' underlineFocusStyle={styles.focusStyle} />
          <br/>
          <TextField floatingLabelText='Password' type='password' floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.focusStyle} />
          <br/>
          <br/>
          <a className={classes.forgotLink}>Forgot your password ? </a>
          <br/>
          <br/>
          <RaisedButton label='Login' primary={false} backgroundColor='#9fa8a3' fullWidth={false} labelStyle={styles.labelStyle} 
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

