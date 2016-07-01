import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import classes from './FeedbackForm.scss'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Edit from 'material-ui/svg-icons/image/edit'
import RaisedButton from 'material-ui/RaisedButton'

export const fields = ['subject', 'content']

const validate = () => {
  const errors = {}
  return errors
}

const propTypes = {
  handleSubmit: PropTypes.funct,
  fields: PropTypes.object,
}

const defaultProps = {
  fields: {},
}

function FeedbackForm({ fields: { subject, content }, handleSubmit }) {
  let feedbackMessage
  const feedbackTrue = this.props.feedbackTrue

  if (feedbackTrue === 0) {
    feedbackMessage = <div className={classes.error}>There is an error submiting Form</div>
  } else if (feedbackTrue === 1) {
    feedbackMessage = <div className={classes.success}>Feedback-Formular wurde eingestellt</div>
  } else feedbackMessage = ''

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.rootForgotPass}>
        <div className={classes.forgotPassword}>
          <div className={classes.inner} >
            <Card>
              <CardHeader
                title="Lass uns wissen was du denkst"
                titleStyle={classes.titleStyle}
                titleColor="#26A65B"
                avatar={<Edit style={classes.iconStyle} />}
              />
              <Divider />
              <CardText>
                <div className={classes.containingEmail}>
                  <TextField
                    {...subject}
                    floatingLabelText="Thema"
                    fullWidth={false}
                    floatingLabelStyle={classes.floatingLabel}
                    underlineFocusStyle={classes.underlineColor}
                    style={classes.textFieldStyle}
                  />
                  <TextField
                    {...content}
                    floatingLabelText="Feedback zu unserer Webseite"
                    hintText="Bewerte Scholario hart aber fair :)"
                    fullWidth={false}
                    floatingLabelStyle={classes.floatingLabel}
                    underlineFocusStyle={classes.underlineColor}
                    style={classes.textFieldStyle}
                    multiLine
                    rows={5}
                  />
                </div>
                <br />
                <br />
                <div className={classes.containingEmail}>
                  <RaisedButton
                    label="Abschicken"
                    primary={false}
                    labelColor="#ffffff"
                    backgroundColor="#446CB3"
                    style={classes.buttonStyle}
                    linkButton
                    onTouchTap={handleSubmit}
                  />
                </div>
                <br />
                <div className={classes.feedback}>
                  <h4>{feedbackMessage}</h4>
                </div>
                <br />
              </CardText>
            </Card>
          </div>
        </div>
      </div>
    </form>
  )
}

FeedbackForm.propTypes = propTypes
FeedbackForm.defaultProps = defaultProps

export default reduxForm({
  form: 'FeedbackForm',
  fields,
  validate,
})(FeedbackForm)
