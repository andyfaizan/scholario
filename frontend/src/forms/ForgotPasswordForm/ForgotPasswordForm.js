import React from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import LiveHelp from 'material-ui/svg-icons/communication/live-help'
import Mail from 'material-ui/svg-icons/communication/mail-outline'
import IconButton from 'material-ui/IconButton'


export const fields = ['email']

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
}

export class ForgotPassword extends React.Component {
  props: Props

  defaultProps = {
    fields: {},
  }

  render() {
    const { fields: { email }, handleSubmit } = this.props

    const floatingLabel = {
      opacity:0.7,
      fontSize:'80%',
      color:'#26A65B'
    }
    const underlineColor = {
      borderColor:'#446CB3'
    }
    const iconStyle = {
      height: 50,
      width: 50,
      opacity: 0.8
    }
    const textFieldStyle = {
      width:'80%',
      padding:'0',
      fontSize:'200%'
    }
    const mediumIcon = {
       width: 120,
       height: 120,
       paddingRight: 10,
       paddingLeft: 10,
       paddingTop: 10,
       paddingBottom: 0,
       marginTop:0 ,
       marginRight:0
    }
    const medium = {
      width: 60,
      height: 60,
    }
    const sendEmail = {
      opacity: 0.8
    }


    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...email}
          floatingLabelText="Deine Email Addresse"
          fullWidth={false}
          floatingLabelStyle={floatingLabel}
          underlineFocusStyle={underlineColor}
          style={textFieldStyle}
        />
          <IconButton
            iconStyle={medium}
            style={mediumIcon}
            linkButton={true}
            onTouchTap={handleSubmit}
          >
            <Mail style={sendEmail} color='#446CB3'/>
          </IconButton>
      </form>
    )
  }
}

ForgotPassword = reduxForm({
  form: 'ForgotPassword',
  fields,
  validate
})(ForgotPassword)

export default ForgotPassword
