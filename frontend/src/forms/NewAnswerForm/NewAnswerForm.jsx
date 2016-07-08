import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import CardHeader from 'material-ui/Card/CardHeader'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

export const fields = ['content']

const validate = () => {
  const errors = {}
  return errors
}

const propTypes = {
  fields: PropTypes.object,
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}

const defaultProps = {
  fields: {},
}

function NewAnswer({ fields: { content }, handleSubmit, onCancel }) {
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
            <TextField
              {...content}
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
      paddingLeft: '70',
      color: '#26A65B',
    },
    cardHeaderTitleStyle: {
      fontWeight: '100%',
      fontSize: '130%',
    },
  }
}

NewAnswer.propTypes = propTypes
NewAnswer.defaultProps = defaultProps

export default reduxForm({
  form: 'NewAnswer',
  fields,
  validate,
})(Radium(NewAnswer))
