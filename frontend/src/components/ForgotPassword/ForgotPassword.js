import React from 'react'
import classes from './ForgotPassword.scss'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardHeader from 'material-ui/lib/card/card-header'
import Divider from 'material-ui/lib/divider'
import TextField from 'material-ui/lib/text-field'

type Props = {

};

export class ForgotPassword extends React.Component {
  props: Props;

  render () {
    const titleStyle = {

        fontSize:'150%'
    }
     const floatingLabel = {

      color:'#26A65B'
    }

    const underlineColor = {

      borderColor:'#446CB3'
    }
    
    return (
      <div className={classes.rootForgotPass}>
        <div className={classes.forgotPassword}>
          <div className={classes.inner} >
            <Card>
              <CardHeader
                title="Passwort vergessen. Bitte geben Sie Ihre E-Mail - ID"
                titleStyle={titleStyle}
                titleColor="#26A65B"
              />
              <Divider />
              <CardText>
                <div>
                  <TextField
                    floatingLabelText="Deine Antwort"
                    multiLine={true}
                    rows={2}
                    fullWidth={true}
                    floatingLabelStyle={floatingLabel}
                    underlineFocusStyle={underlineColor}
                  />
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

