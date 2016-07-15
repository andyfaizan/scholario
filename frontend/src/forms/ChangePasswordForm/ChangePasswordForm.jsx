import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export const fields = ['password']

const validate = (values) => {
  const errors = {}

  if (!values.password) {
    errors.password = 'Erforderlich'
  } else if (values.password.length < 8) {
    errors.password = 'Mindestens 8 zeichnen'
  }

  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
  status: PropTypes.number,
}

const defaultProps = {
  fields: {},
}

function ChangePassword({ fields: { password }, handleSubmit, status }) {
  const styles = getStyles()
  let feedbackMessage

  if (status === 1) {
    feedbackMessage = <div style={styles.error}>Es gibt einen Fehler</div>
  } else if (status === 0) {
    feedbackMessage = <div style={styles.success}>Passwort ist verändert</div>
  } else feedbackMessage = ''

  return (
    <form onSubmit={handleSubmit}>
      <div >
        <TextField
          {...password}
          errorText={password.touched && password.error ? password.error : ''}
          floatingLabelText="Neues Passwort"
          floatingLabelStyle={styles.floatingLabel}
          underlineFocusStyle={styles.underlineColor}
          type="password"
        />
        <FlatButton label="Senden" linkButton onTouchTap={handleSubmit} hoverColor="#26A65B" />
        <div style={styles.feedback}>
          <h4>{feedbackMessage}</h4>
        </div>
      </div>
    </form>
  )
}

function getStyles() {
  return {
    feedback: {
      marginLeft: '0.5em',
    },
    error: {
      color: 'red',
    },
    success: {
      color: '#26A65B',
    },
    floatingLabel: {
      color: '#26A65B',
    },
    underlineColor: {
      borderColor: '#446CB3',
    },
  }
}

ChangePassword.propTypes = propTypes
ChangePassword.defaultProps = defaultProps

export default reduxForm({
  form: 'ChangePassword',
  fields,
  validate,
})(Radium(ChangePassword))
