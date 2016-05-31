import React from 'react'
import classes from './ForgotPassword.scss'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import LiveHelp from 'material-ui/svg-icons/communication/live-help'
import Mail from 'material-ui/svg-icons/communication/mail-outline'
import IconButton from 'material-ui/IconButton'


type Props = {

};

export class ForgotPassword extends React.Component {
  props: Props;

  render () {
    const titleStyle = {

        marginTop: 15,
        fontSize:'170%',
        opacity: 0.7
    }
     const floatingLabel = {

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
    return (
      <div className={classes.rootForgotPass}>
        <div className={classes.forgotPassword}>
          <div className={classes.inner} >
            <Card>
              <CardHeader
                title="Passwort vergessen. Bitte geben Sie Ihre E-Mail Addresse"
                titleStyle={titleStyle}
                titleColor="#26A65B"
                avatar={<LiveHelp style={iconStyle}  />}
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
              </CardText>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default ForgotPassword

