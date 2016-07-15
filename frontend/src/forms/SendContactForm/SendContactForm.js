import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Radium from 'radium'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import { ScholarioBlue } from '../../styles/colors'

export const fields = ['name', 'telephone']

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
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
}

const defaultProps = {
  fields: {},
}

function SendContact({ fields: { name, telephone }, handleSubmit }) {
  const styles = getStyles()

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        {...name}
        errorText={name.touched && name.error ? name.error : ''}
        floatingLabelText="Name"
        style={styles.textFieldName}
        floatingLabelStyle={styles.floatingLabel}
        underlineFocusStyle={styles.underlineColor}
      />
      <TextField
        {...telephone}
        errorText={telephone.touched && telephone.error ? telephone.error : ''}
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
SendContact.defaultProps = defaultProps

export default reduxForm({
  form: 'SendContact',
  fields,
  validate,
})(Radium(SendContact))
