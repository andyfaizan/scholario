import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import classes from './AddBookmarkForm.scss'

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

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.addBookmarkContainer} fullWidth>
        <TextField
          {...title}
          errorText={title.touched && title.error ? title.error : ''}
          floatingLabelText="Titel"
          floatingLabelStyle={classes.floatingLabelStyle}
          underlineFocusStyle={classes.underlineStyle}
          fullWidth
        />
        <br />
        <TextField
          {...url}
          errorText={url.touched && url.error ? url.error : ''}
          floatingLabelText="URL"
          floatingLabelStyle={classes.floatingLabelStyle}
          underlineFocusStyle={classes.underlineStyle}
          fullWidth
        />
      </div>
    </form>
  )
}

AddBookmark.propTypes = propTypes
AddBookmark.defaultProps = defaultProps

export default reduxForm({
  form: 'AddBookmark',
  fields,
  validate,
})(AddBookmark)
