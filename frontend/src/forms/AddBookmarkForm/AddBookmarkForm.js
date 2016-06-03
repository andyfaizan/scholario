import React from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
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

type Props = {
  handleSubmit: Function,
  fields: Object,
}

export class AddBookmark extends React.Component {
  props: Props

  defaultProps = {
    fields: {},
  }

  render() {
    const { fields: { title, url }, handleSubmit } = this.props

    const styles = {
      errorStyle:
      {
        backgroundColor: '#e74c3c'
      },
      underlineStyle:
      {
        borderColor: '#446CB3'
      },
      focusStyle:
      {
        borderColor: '#446CB3'
      },
      floatingLabelStyle:
      {
        color: '#26A65B'
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.addBookmarkContainer} fullWidth={true}>
          <TextField
            {...title}
            errorText={title.touched && title.error ? title.error : ''}
            floatingLabelText="Titel"
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.underlineStyle}
            fullWidth={true}
          />
          <br/>
          <TextField
            {...url}
            errorText={url.touched && url.error ? url.error : ''}
            floatingLabelText="URL"
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.underlineStyle}
            fullWidth={true}
          />
        </div>
      </form>
    )
  }
}

AddBookmark = reduxForm({
  form: 'AddBookmark',
  fields,
  validate
})(AddBookmark)

export default AddBookmark
