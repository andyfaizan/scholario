import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import Mail from 'material-ui/svg-icons/communication/mail-outline'
import IconButton from 'material-ui/IconButton'

export const fields = ['email']

const validate = () => {
  const errors = {}
  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
}

const defaultProps = {
  fields: {},
}

function ForgotPassword({ fields: { email }, handleSubmit }) {
  const styles = getStyles()

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        {...email}
        floatingLabelText="Deine Email Addresse"
        fullWidth={false}
        floatingLabelStyle={styles.floatingLabel}
        underlineFocusStyle={styles.underlineColor}
        styles={styles.stextFieldStyle}
      />
      <IconButton
        iconStyle={styles.medium}
        styles={styles.mediumIcon}
        linkButton
        onTouchTap={handleSubmit}
      >
        <Mail styles={styles.sendEmail} color="#446CB3" />
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
ForgotPassword.defaultProps = defaultProps

export default reduxForm({
  form: 'ForgotPassword',
  fields,
  validate,
})(Radium(ForgotPassword))
