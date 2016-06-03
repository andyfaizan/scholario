import React from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

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

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            {...title}
            errorText={title.touched && title.error ? title.error : ''}
            floatingLabelText="Titel"
            floatingLabelStyle={floatingLabel}
            underlineFocusStyle={underlineColor}
          />
          <TextField
            {...url}
            errorText={url.touched && url.error ? url.error : ''}
            floatingLabelText="URL"
            floatingLabelStyle={floatingLabel}
            underlineFocusStyle={underlineColor}
          />

          <FlatButton label="Senden" linkButton={true} onTouchTap={handleSubmit} hoverColor="#26A65B" />

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
