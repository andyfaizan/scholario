import React from 'react'
import TextField from 'material-ui/lib/text-field'
import classes from './LoginFields.scss'
import RaisedButton from 'material-ui/lib/raised-button'

type Props = {

};
export class LoginFields extends React.Component {
  props: Props;

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
          <div align='center'>
            <TextField hintText='abc@hotmail.com' floatingLabelStyle={styles.floatingLabelStyle} floatingLabelText='Email or Username' underlineFocusStyle={styles.focusStyle} />
            <br/>
          </div>
          <TextField floatingLabelText='Password' type='password' floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.focusStyle} />
          <br/>
          <br/>
          <a className={classes.forgotLink}>Forgot your password ? </a>
          <br/>
          <br/>
          <RaisedButton label='Login' primary={0} backgroundColor='#9fa8a3' fullWidth={1} labelStyle={styles.labelStyle} />
          <br/>
          <br/>
          <br/>
        </div>
      </div>
    )
  }
}

export default LoginFields

