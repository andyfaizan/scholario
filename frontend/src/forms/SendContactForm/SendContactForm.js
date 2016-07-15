import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Radium from 'radium'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import { ScholarioBlue } from '../../styles/colors'

export const fields = []

const validate = (values) => {
  const errors = {}
  return errors
}

const propTypes = {
  handleSubmit: Function,
  fields: Object,
}

const defaultProps = {
  fields: {},
}

function SendContact({ fields, handleSubmit }) {
  const styles = getStyles()

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        floatingLabelText="Name"
        style={styles.textFieldName}
        floatingLabelStyle={styles.floatingLabel}
        underlineFocusStyle={styles.underlineColor}
      />
      <TextField
        floatingLabelText="Telefon"
        style={styles.textFieldTelefon}
        floatingLabelStyle={styles.floatingLabel}
        underlineFocusStyle={styles.underlineColor}
      />
      <FlatButton
        backgroundColor={ScholarioBlue}
        label="Abschicken"
        labelStyle={styles.demoButtonLabelStyle}
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
SendContact.defaultProps = defaultProps

export default reduxForm({
  form: 'SendContact',
  fields,
  validate,
})(Radium(SendContact))