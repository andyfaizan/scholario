import React from 'react'
import { reduxForm } from 'redux-form'
import classes from './ChangePasswordForm.scss'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export const fields = ['password']

const validate = (values) => {
  const errors = {}

  if (!values.password) {
    errors.password = 'Erforderlich'
  } else if (values.password.length < 8) {
    errors.password = 'Mindestens 8 zeichnen'
  }

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

    var feedbackMessage
    var feedbackTrue = this.props.feedbackTrue

    if( feedbackTrue == 0 )
      feedbackMessage = <div className={classes.error}>Es gibt einen Fehler</div>
    else if ( feedbackTrue == 1 )
      feedbackMessage = <div className={classes.success}>Passwort ist verändert</div>
    else
      feedbackMessage = ""

    return (
      <form onSubmit={handleSubmit}>
        <div >
          <TextField
            {...password}
            errorText={password.touched && password.error ? password.error : ''}
            floatingLabelText="Neues Passwort"
            floatingLabelStyle={floatingLabel}
            underlineFocusStyle={underlineColor}
            type="password"
          />
          <FlatButton label="Senden" linkButton={true} onTouchTap={handleSubmit} hoverColor="#26A65B" />
          <div className={classes.feedback}>
            <h4>{feedbackMessage}</h4>
          </div>
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
