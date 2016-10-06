import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

const propTypes = {
  handleSubmit: PropTypes.func,
}

function UploadAssignment({ handleSubmit }) {
  const styles = getStyles()
  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.container}>
        <Field
          name="Upload"
          component={TextField}
          floatingLabelText="Upload"
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineFocusStyle={styles.focusStyle}
        />
      </div>
    </form>
  )
}

function getStyles() {
  return {
    container: {
      alignItems: 'center',
      marginLeft: '10%',
      marginRight: '10%',
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
      color: '#26A65B',
    },
  }
}

UploadAssignment.propTypes = propTypes

export default reduxForm({
  form: 'UploadAssignment',
})(Radium(UploadAssignment))
