import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

const propTypes = {
  handleSubmit: PropTypes.func,
}

function AddBookmark({ handleSubmit }) {
  const styles = getStyles()
  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.addBookmarkContainer}>
        <Field
          name="title"
          component={TextField}
          fullWidth
          floatingLabelText="Titel"
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineFocusStyle={styles.focusStyle}
        />
        <br />
        <Field
          name="url"
          component={TextField}
          fullWidth
          floatingLabelText="URL"
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineFocusStyle={styles.focusStyle}
        />
      </div>
    </form>
  )
}

function getStyles() {
  return {
    addBookmarkContainer: {
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

AddBookmark.propTypes = propTypes

export default reduxForm({
  form: 'AddBookmark',
})(Radium(AddBookmark))
