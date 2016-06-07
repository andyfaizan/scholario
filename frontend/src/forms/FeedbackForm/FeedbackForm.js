import React from 'react'
import { reduxForm } from 'redux-form'
import classes from './FeedbackForm.scss'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Edit from 'material-ui/svg-icons/image/edit'
import Mail from 'material-ui/svg-icons/communication/mail-outline'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'

export const fields = ['subject', 'content']

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
}
export class FeedbackForm extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
  }

  render() {
    const { fields: { subject, content }, handleSubmit } = this.props

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
      fontSize:'150%'
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

    const buttonStyle = {
      width:'80%'
    }

    var feedbackMessage
    var feedbackTrue = this.props.feedbackTrue

    if( feedbackTrue == 0 )
      feedbackMessage = <div className={classes.error}>There is an error submiting Form</div>
    else if ( feedbackTrue == 1 )
      feedbackMessage = <div className={classes.success}>Feedback-Formular wurde eingestellt</div>
    else
      feedbackMessage = ""

    return (
      <form onSubmit={handleSubmit}>
          <div className={classes.rootForgotPass}>
            <div className={classes.forgotPassword}>
              <div className={classes.inner} >
                <Card>
                  <CardHeader
                    title="Lass uns wisser was du denkst"
                    titleStyle={titleStyle}
                    titleColor="#26A65B"
                    avatar={<Edit style={iconStyle}  />}
                  />
                  <Divider />
                  <CardText>
                    <div className={classes.containingEmail}>
                      <TextField
                        {...subject}
                        floatingLabelText="Subject"
                        fullWidth={false}
                        floatingLabelStyle={floatingLabel}
                        underlineFocusStyle={underlineColor}
                        style={textFieldStyle}
                      />
                      <TextField
                        {...content}
                        floatingLabelText="Feedback zu unsere website"
                        hintText="Scholario ist eine gute website"
                        fullWidth={false}
                        floatingLabelStyle={floatingLabel}
                        underlineFocusStyle={underlineColor}
                        style={textFieldStyle}
                        multiLine={true}
                        rows={5}
                      />
                    </div>
                    <br/>
                    <br/>
                    <div className={classes.containingEmail}>
                      <RaisedButton
                        label="zurückstellen"
                        primary={false}
                        labelColor="#ffffff"
                        backgroundColor="#446CB3"
                        style={buttonStyle}
                        linkButton={true}
                        onTouchTap={handleSubmit}
                      />
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

FeedbackForm = reduxForm({
  form: 'FeedbackForm',
  fields,
  validate
})(FeedbackForm)

export default FeedbackForm

