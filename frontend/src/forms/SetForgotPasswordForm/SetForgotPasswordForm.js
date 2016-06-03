import React from 'react'
import { reduxForm } from 'redux-form'
import classes from './SetForgotPasswordForm.scss'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Edit from 'material-ui/svg-icons/image/edit'
import Mail from 'material-ui/svg-icons/communication/mail-outline'
import IconButton from 'material-ui/IconButton'

export const fields = []

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
}
export class SetForgotPassword extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
  }

  render() {
    const { fields, handleSubmit } = this.props

    const titleStyle = {

        marginTop: 15,
        fontSize:'170%',
        opacity: 0.7
    }
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
      height: 60 
    }

    const sendEmail = {

      opacity: 0.8
    }

     var feedbackMessage
    var feedbackTrue = null

    if( feedbackTrue == 0 ) 
      feedbackMessage = "Falsche E-Mail-Konto"
    else if ( feedbackTrue == 1 ) 
      feedbackMessage = "E-Mail wurde auf Ihr Konto gesendet"
    else
      feedbackMessage = ""

    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.rootForgotPass}>
        <div className={classes.forgotPassword}>
          <div className={classes.inner} >
            <Card>
              <CardHeader
                title="Das neue Passwort eingeben"
                titleStyle={titleStyle}
                titleColor="#26A65B"
                avatar={<Edit style={iconStyle}  />}
              />
              <Divider />
              <CardText>
                <div className={classes.containingEmail}>
                  <TextField
                    floatingLabelText="Deine Email Addresse"
                    fullWidth={false}
                    floatingLabelStyle={floatingLabel}
                    underlineFocusStyle={underlineColor}
                    style={textFieldStyle}
                  />
                    <IconButton
                      iconStyle={medium}
                      style={mediumIcon}
                    >
                      <Mail style={sendEmail} color='#446CB3'/>
                    </IconButton>
                </div>
                <br/>
                <div className={classes.feedback}>
                  <h4>{feedbackMessage}</h4>
                </div>
                <br/>
              </CardText>
            </Card>
          </div>
        </div>
      </div>
      </form>
    )
  }
}

SetForgotPassword = reduxForm({
  form: 'SetForgotPassword',
  fields,
  validate
})(SetForgotPassword)

export default SetForgotPassword
