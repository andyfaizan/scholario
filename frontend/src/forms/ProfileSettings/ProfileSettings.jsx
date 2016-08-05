import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { Card, CardTitle } from 'material-ui/Card'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'

import { ToolBarGreen, CardBlue } from '../../styles/colors'

export const fields = []

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

function ProfileSettings({ fields: { personName, university, program, email,
  password, facebookConnect, linkedinConnect, xingConnect }, handleSubmit }) {
  const styles = getStyles()

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardTitle
          title="Profileinstellungen"
          subtitle="Aktualisieren Sie Ihre aktuellen Informationen reagarding Profil."
        />
        <br />
        <fieldset style={styles.fieldsetStyle}>
          <legend><h4>Ihre Profildaten</h4></legend>
          <div style={styles.standardFieldFormatting}>
            <TextField
              {...personName}
              floatingLabelText="Dein Name"
              fullWidth={false}
              floatingLabelStyle={styles.floatingLabel}
              underlineFocusStyle={styles.underlineColor}
              style={styles.textFieldStyle}
            />
          </div>
          <div style={styles.standardFieldFormatting} >
            <TextField
              {...university}
              floatingLabelText="Ihre Hochschule Name"
              fullWidth={false}
              floatingLabelStyle={styles.floatingLabel}
              underlineFocusStyle={styles.underlineColor}
              style={styles.textFieldStyle}
            />
          </div>
          <div style={styles.standardFieldFormatting}>
            <TextField
              {...program}
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
        <fieldset style={styles.fieldsetStyle}>
          <legend><h4>Ihre E-Mail- Daten</h4></legend>
          <div style={styles.standardFieldFormatting}>
            <TextField
              {...email}
              floatingLabelText="Deine Emailadresse"
              fullWidth={false}
              floatingLabelStyle={styles.floatingLabel}
              underlineFocusStyle={styles.underlineColor}
              style={styles.textFieldStyle}
            />
          </div>
          <div style={styles.standardFieldFormatting}>
            <TextField
              {...password}
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
        <fieldset style={styles.fieldsetStyle}>
          <legend><h4>Ihre sozialen Connects</h4></legend>
          <div style={styles.standardFieldFormatting}>
            <TextField
              {...facebookConnect}
              floatingLabelText="Ihre Facebook - Link"
              fullWidth={false}
              floatingLabelStyle={styles.floatingLabel}
              underlineFocusStyle={styles.underlineColor}
              style={styles.textFieldStyle}
            />
          </div>
          <div style={styles.standardFieldFormatting}>
            <TextField
              {...linkedinConnect}
              floatingLabelText="Ihre LinkedIn - Link"
              fullWidth={false}
              floatingLabelStyle={styles.floatingLabel}
              underlineFocusStyle={styles.underlineColor}
              style={styles.textFieldStyle}
            />
          </div>
          <div style={styles.standardFieldFormatting}>
            <TextField
              {...xingConnect}
              floatingLabelText="Ihre Xing - Link"
              fullWidth={false}
              floatingLabelStyle={styles.floatingLabel}
              underlineFocusStyle={styles.underlineColor}
              style={styles.textFieldStyle}
            />
          </div>
          <br />
          <div style={styles.standardFieldFormatting}>
            <RaisedButton
              label="Update Social Verbindungen"
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
        <br />
        <br />
      </Card>
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

ProfileSettings.propTypes = propTypes
ProfileSettings.defaultProps = defaultProps

export default reduxForm({
  form: 'ProfileSettings',
  fields,
  validate,
})(ProfileSettings)
