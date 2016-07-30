import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import Radium from 'radium'

import { TextField } from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'

import { ScholarioBlue } from '../../styles/colors'

const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Erforderlich'
  }
  if (!values.telephone) {
    errors.telephone = 'Erforderlich'
  }
  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
}

function SendContact({ handleSubmit }) {
  const styles = getStyles()

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        floatingLabelText="Name"
        style={styles.textFieldName}
        floatingLabelStyle={styles.floatingLabel}
        underlineFocusStyle={styles.underlineColor}
      />
      <Field
        name="telephone"
        floatingLabelText="Telefon"
        style={styles.textFieldTelefon}
        floatingLabelStyle={styles.floatingLabel}
        underlineFocusStyle={styles.underlineColor}
      />
      <FlatButton
        backgroundColor={ScholarioBlue}
        label="Abschicken"
        labelStyle={styles.demoButtonLabelStyle}
        onTouchTap={handleSubmit}
      />
    </form>
  )
}

function getStyles() {
  return {
    textFieldName: {
      marginLeft: '25%',
      marginRight: '3%',
    },
    floatingLabel: {
      opacity: '0.7',
      color: '#26A65B',
    },
    underlineColor: {
      borderColor: '#446CB3',
    },
    textFieldTelefon: {
      marginRight: '3%',
    },
    demoButtonLabelStyle: {
      color: 'white',
    },
  }
}

SendContact.propTypes = propTypes

export default reduxForm({
  form: 'SendContact',
  validate,
})(Radium(SendContact))
