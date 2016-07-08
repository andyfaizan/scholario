import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'
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
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
  feedbackTrue: PropTypes.number,
}

const defaultProps = {
  fields: {},
}

function FeedbackForm({ fields: { subject, content }, handleSubmit, feedbackTrue }) {
  const styles = getStyles()
  let feedbackMessage

  if (feedbackTrue === 0) {
    feedbackMessage = <div style={styles.error}>There is an error submiting Form</div>
  } else if (feedbackTrue === 1) {
    feedbackMessage = <div style={styles.success}>Feedback-Formular wurde eingestellt</div>
  } else feedbackMessage = ''

  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.rootForgotPass}>
        <div style={styles.forgotPassword}>
          <div style={styles.inner} >
            <Card>
              <CardHeader
                title="Lass uns wissen was du denkst"
                titleStyle={styles.titleStyle}
                titleColor="#26A65B"
                avatar={<Edit style={styles.iconStyle} />}
              />
              <Divider />
              <CardText>
                <div style={styles.containingEmail}>
                  <TextField
                    {...subject}
                    floatingLabelText="Thema"
                    fullWidth={false}
                    floatingLabelStyle={styles.floatingLabel}
                    underlineFocusStyle={styles.underlineColor}
                    style={styles.textFieldStyle}
                  />
                  <TextField
                    {...content}
                    floatingLabelText="Feedback zu unserer Webseite"
                    hintText="Bewerte Scholario hart aber fair :)"
                    fullWidth={false}
                    floatingLabelStyle={styles.floatingLabel}
                    underlineFocusStyle={styles.underlineColor}
                    style={styles.textFieldStyle}
                    multiLine
                    rows={5}
                  />
                </div>
                <br />
                <br />
                <div style={styles.containingEmail}>
                  <RaisedButton
                    label="Abschicken"
                    primary={false}
                    labelColor="#ffffff"
                    backgroundColor="#446CB3"
                    style={styles.buttonStyle}
                    linkButton
                    onTouchTap={handleSubmit}
                  />
                </div>
                <br />
                <div style={styles.feedback}>
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

function getStyles() {
  return {
    forgotPassword: {
      display: 'table-cell',
      verticalAlign: 'middle',
    },
    rootForgotPass: {
      display: 'table',
      position: 'absolute',
      height: '70%',
      width: '100%',
    },
    inner: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '70%',
    },
    containingEmail: {
      marginLeft: '10%',
      marginRight: '10%',
    },
    feedback: {
      textAlign: 'center',
      marginLeft: '-16px',
    },
    error: {
      color: 'red',
    },
    success: {
      color: '#26A65B',
    },
    titleStyle: {
      marginTop: '15px',
      fontSize: '170%',
      opacity: '0.7',
    },
    floatingLabel: {
      opacity: '0.7',
      fontSize: '80%',
      color: '#26A65B',
    },
    underlineColor: {
      borderColor: '#446CB3',
    },
    iconStyle: {
      height: '50px',
      width: '50px',
      opacity: '0.8',
    },
    textFieldStyle: {
      width: '80%',
      padding: '0px',
      fontSize: '150%',
    },
    mediumIcon: {
      width: '120px',
      height: '120px',
      paddingRight: '10px',
      paddingLeft: '10px',
      paddingTop: '10px',
      paddingBottom: '0px',
      marginTop: '0px',
      marginRight: '0px',
    },
    medium: {
      width: '60px',
      height: '60px',
    },
    sendEmail: {
      opacity: '0.8',
    },
    buttonStyle: {
      width: '80%',
    },
  }
}

FeedbackForm.propTypes = propTypes
FeedbackForm.defaultProps = defaultProps

export default reduxForm({
  form: 'FeedbackForm',
  fields,
  validate,
})(Radium(FeedbackForm))
