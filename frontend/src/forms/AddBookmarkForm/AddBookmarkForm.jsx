import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'

export const fields = ['title', 'url']

const validate = (values) => {
  const errors = {}
  if (!values.title) {
    errors.password = 'Erforderlich'
  }
  if (!values.url) {
    errors.password = 'Erforderlich'
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

function AddBookmark() {
  const { fields: { title, url }, handleSubmit } = this.props

  const styles = getStyles()

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.addBookmarkContainer} fullWidth>
        <TextField
          {...title}
          errorText={title.touched && title.error ? title.error : ''}
          floatingLabelText="Titel"
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineFocusStyle={styles.underlineStyle}
          fullWidth
        />
        <br />
        <TextField
          {...url}
          errorText={url.touched && url.error ? url.error : ''}
          floatingLabelText="URL"
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineFocusStyle={styles.underlineStyle}
          fullWidth
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
AddBookmark.defaultProps = defaultProps

export default reduxForm({
  form: 'AddBookmark',
  fields,
  validate,
})(Radium(AddBookmark))
