import React from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

export const fields = ['password']

const validate = (values) => {
  const errors = {}

  if (!values.password) {
    errors.password = 'Erforderlich'
  } else if (values.password.length < 8) {
    errors.password = 'Mindestens 8 zeichnen'
  }

  console.log(errors)
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
}

export class ChangePassword extends React.Component {
  props: Props

  defaultProps = {
    fields: {},
  }

  render() {
    const { fields: { password }, handleSubmit } = this.props

    const floatingLabel = {
      color:'#26A65B'
    }
    const underlineColor = {
      borderColor:'#446CB3'
    }

    return (
      <form onSubmit={handleSubmit}>
        <div >
          <TextField
            {...password}
            errorText={password.touched && password.error ? password.error : ''}
            floatingLabelText="Neues Passwort"
            floatingLabelStyle={floatingLabel}
            underlineFocusStyle={underlineColor}
          />
          <FlatButton label="Senden" linkButton={true} onTouchTap={handleSubmit} hoverColor="#26A65B" />
        </div>
      </form>
    )
  }
}

ChangePassword = reduxForm({
  form: 'ChangePassword',
  fields,
  validate
})(ChangePassword)

export default ChangePassword
