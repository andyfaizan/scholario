import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Mail from 'material-ui/svg-icons/communication/mail-outline'
import IconButton from 'material-ui/IconButton'

const validate = () => {
  const errors = {}
  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
}

function ForgotPassword({ handleSubmit }) {
  const styles = getStyles()

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="email"
        component={TextField}
        floatingLabelText="Deine Email Addresse"
        fullWidth={false}
        floatingLabelStyle={styles.floatingLabel}
        underlineFocusStyle={styles.underlineColor}
        style={styles.textFieldStyle}
      />
      <IconButton
        iconStyle={styles.medium}
        style={styles.mediumIcon}
        linkButton
        onTouchTap={handleSubmit}
      >
        <Mail style={styles.sendEmail} color="#446CB3" />
      </IconButton>
    </form>
  )
}

function getStyles() {
  return {
    floatingLabel: {
      opacity: '0.7',
      fontSize: '80%',
      color: '#26A65B',
    },
    underlineColor: {
      borderColor: '#446CB3',
    },
    iconStyle: {
      height: '50px',
      width: '50px',
      opacity: '0.8',
    },
    textFieldStyle: {
      width: '80%',
      padding: '0',
      fontSize: '200%',
    },
    mediumIcon: {
      width: '120px',
      height: '120px',
      paddingRight: '10px',
      paddingLeft: '10px',
      paddingTop: '10px',
      paddingBottom: '0px',
      marginTop: '0px',
      marginRight: '0px',
    },
    medium: {
      width: '60px',
      height: '60px',
    },
    sendEmail: {
      opacity: '0.8',
    },
  }
}

ForgotPassword.propTypes = propTypes

export default reduxForm({
  form: 'ForgotPassword',
  validate,
})(Radium(ForgotPassword))
