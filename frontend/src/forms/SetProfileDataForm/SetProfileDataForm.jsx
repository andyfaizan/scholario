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

function SetProfileData({ handleSubmit }) {
  const styles = getStyles()
  return (
    <form onSubmit={handleSubmit}>
      <fieldset style={styles.fieldsetStyle}>
        <legend><h4>Ihre Profildaten</h4></legend>
        <div style={styles.standardFieldFormatting}>
          <Field
            name="firstname"
            component={TextField}
            floatingLabelText="Ihr Vorname"
            fullWidth={false}
            floatingLabelStyle={styles.floatingLabel}
            underlineFocusStyle={styles.underlineColor}
            style={styles.textFieldStyle}
          />
        </div>
        <div style={styles.standardFieldFormatting}>
          <Field
            name="lastname"
            component={TextField}
            floatingLabelText="Ihr Nachname"
            fullWidth={false}
            floatingLabelStyle={styles.floatingLabel}
            underlineFocusStyle={styles.underlineColor}
            style={styles.textFieldStyle}
          />
        </div>
        <div style={styles.standardFieldFormatting} >
          <Field
            name="university"
            component={TextField}
            floatingLabelText="Ihre Hochschule Name"
            fullWidth={false}
            floatingLabelStyle={styles.floatingLabel}
            underlineFocusStyle={styles.underlineColor}
            style={styles.textFieldStyle}
          />
        </div>
        <div style={styles.standardFieldFormatting}>
          <Field
            name="program"
            component={TextField}
            floatingLabelText="Ihr Programmnamen"
            fullWidth={false}
            floatingLabelStyle={styles.floatingLabel}
            underlineFocusStyle={styles.underlineColor}
            style={styles.textFieldStyle}
          />
        </div>
        <br />
        <div style={styles.standardFieldFormatting}>
          <RaisedButton
            label="Update- Profildaten"
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

SetProfileData.propTypes = propTypes

export default reduxForm({
  form: 'SetProfileData',
  // validate,
})(SetProfileData)
