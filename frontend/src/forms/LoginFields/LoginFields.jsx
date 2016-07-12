import React, { PropTypes } from 'react'
import Radium from 'radium'
import { TextField } from 'redux-form-material-ui'
import { reduxForm, Field } from 'redux-form'

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
    const styles = getStyles()

    return (
      <div>
        <div style={styles.loginContainer}>
          <Field
            name="email"
            component={TextField}
            label="Blah"
            floatingLabelText="Email"
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
          />
          <br />
          <Field
            name="password"
            component={TextField}
            floatingLabelText="Passwort"
            type="password"
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          />
          <br />
          <a onTouchTap={this.props.onClickForgotPassword} style={styles.forgotLink}>Passwort vergessen? </a>
        </div>
      </div>
    )
  }
}

function getStyles() {
  return {
    loginContainer: {
      alignItems: 'center',
      marginLeft: '10%',
      marginRight: '10%',
    },
    forgotLink: {
      color: '#27ae60',
      cursor: 'pointer',
    },
    errorStyle: {
      backgroundColor: '#e74c3c',
    },
    underlineStyle: {
      borderColor: '#446CB3',
    },
    focusStyle: {
      borderColor: '#446CB3',
    },
    floatingLabelStyle: {
      color: '#27ae60',
    },
  }
}

LoginFields.propTypes = propTypes

export default reduxForm({
  form: 'loginForm',
  validate,
})(Radium(LoginFields))
