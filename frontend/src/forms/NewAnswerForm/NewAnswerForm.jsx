import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm, Field } from 'redux-form'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import CardHeader from 'material-ui/Card/CardHeader'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
import { TextField } from 'redux-form-material-ui'

const validate = () => {
  const errors = {}
  return errors
}

const propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}

function NewAnswer({ handleSubmit, onCancel }) {
  const styles = getStyles()

  return (
    <div>
      <Card>
        <CardHeader
          style={styles.cardHeaderStyle}
          title={'Frage beantworten'}
          titleColor="#26A65B"
          titleStyle={styles.cardHeaderTitleStyle}
        />
        <form onSubmit={handleSubmit}>
          <CardText style={styles.textStyle}>
            <Field
              name="content"
              component={TextField}
              floatingLabelText="Deine Antwort"
              multiLine
              rows={2}
              fullWidth
              floatingLabelStyle={styles.floatingLabel}
              underlineFocusStyle={styles.underlineColor}
            />
          </CardText>
          <CardActions style={styles.actionPadding}>
            <FlatButton
              label="Senden" linkButton
              onTouchTap={handleSubmit} hoverColor="#26A65B"
              style={styles.buttonStyle} rippleColor="#ffffff"
            />
            <FlatButton
              label="Abbrechen" linkButton
              onTouchTap={onCancel} hoverColor="#26A65B"
              style={styles.buttonStyle} rippleColor="#ffffff"
            />
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

function getStyles() {
  return {
    textStyle: {
      paddingLeft: '70px',
      paddingRight: '50px',
    },
    actionPadding: {
      paddingLeft: '52px',
      backgroundColor: '#446CB3',
      color: '#ffffff',
    },
    floatingLabel: {
      color: '#26A65B',
    },
    underlineColor: {
      borderColor: '#446CB3',
    },
    buttonStyle: {
      color: '#ffffff',
    },
    cardHeaderStyle: {
      paddingLeft: '70px',
      color: '#26A65B',
    },
    cardHeaderTitleStyle: {
      fontWeight: '100%',
      fontSize: '130%',
    },
  }
}

NewAnswer.propTypes = propTypes

export default reduxForm({
  form: 'NewAnswer',
  validate,
})(Radium(NewAnswer))
