import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'

import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'

import { ToolBarGreen, CardBlue } from '../../styles/colors'


// const validate = () => {
//   const errors = {}
//   return errors
// }

const propTypes = {
  handleSubmit: PropTypes.func,
}

function SetEmail({ handleSubmit }) {
  const styles = getStyles()
  return (
    <form onSubmit={handleSubmit}>
      <fieldset style={styles.fieldsetStyle}>
        <legend><h4>Ihre E-Mail- Daten</h4></legend>
        <div style={styles.standardFieldFormatting}>
          <Field
            name="email"
            component={TextField}
            floatingLabelText="Ihr Emailadresse"
            fullWidth={false}
            floatingLabelStyle={styles.floatingLabel}
            underlineFocusStyle={styles.underlineColor}
            style={styles.textFieldStyle}
          />
        </div>
        <div style={styles.standardFieldFormatting}>
          <Field
            name="password"
            type="password"
            component={TextField}
            floatingLabelText="Ihr Passwort"
            fullWidth={false}
            floatingLabelStyle={styles.floatingLabel}
            underlineFocusStyle={styles.underlineColor}
            style={styles.textFieldStyle}
          />
        </div>
        <br />
        <div style={styles.standardFieldFormatting}>
          <RaisedButton
            label="Update- E-Mail- Daten"
            primary={false}
            labelColor="#ffffff"
            backgroundColor="#446CB3"
            style={styles.buttonStyle}
            linkButton
            onTouchTap={handleSubmit}
          />
        </div>
        <br />
      </fieldset>
    </form>
  )
}

function getStyles() {
  return {
    floatingLabel: {
      opacity: '0.7',
      fontSize: '60%',
      color: ToolBarGreen,
    },
    underlineColor: {
      borderColor: CardBlue,
    },
    iconStyle: {
      height: '50px',
      width: '50px',
      opacity: '0.8',
    },
    textFieldStyle: {
      width: '90%',
      fontSize: '200%',
    },
    standardFieldFormatting: {
      marginLeft: '10%',
    },
    fieldsetStyle: {
      marginLeft: '10%',
      marginRight: '10%',
      marginTop: '5%',
      marginBottom: '5%',
    },
    buttonStyle: {
      width: '80%',
    },
  }
}

SetEmail.propTypes = propTypes

export default reduxForm({
  form: 'SetEmail',
  // validate,
})(SetEmail)
