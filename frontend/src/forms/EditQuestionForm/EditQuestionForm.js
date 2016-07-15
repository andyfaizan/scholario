import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import CardHeader from 'material-ui/Card/CardHeader'
import CardActions from 'material-ui/Card/CardActions'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export const fields = ['title', 'description']

const validate = (values) => {
  const errors = {}

  if (!values.title) {
    errors.title = 'Erforderlich'
  }
  if (!values.description) {
    errors.description = 'Erforderlich'
  }

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

function EditQuestion({ fields: { title, description }, handleSubmit, onCancel }) {
  const styles = getStyles()

  return (
    <Card>
      <CardHeader
        style={styles.cardHeaderStyle}
        title={'Frage bearbeiten'}
        titleColor="#26A65B"
        titleStyle={styles.cardHeaderTitleStyle}
      />
      <form onSubmit={handleSubmit}>
        <CardText style={styles.textStyle}>
          <TextField
            {...title}
            errorText={title.touched && title.error ? title.error : ''}
            fullWidth
            floatingLabelText="Titel"
            floatingLabelStyle={styles.floatingLabel}
            underlineFocusStyle={styles.underlineColor}
          />
          <TextField
            {...description}
            multiLine
            rows={2}
            fullWidth
            floatingLabelText="Text"
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
  )
}

function getStyles() {
  return {
    textStyle: {
      paddingLeft: '70px',
      paddingRight: '50px',
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
    actionPadding: {
      paddingLeft: '52px',
      backgroundColor: '#446CB3',
      color: '#ffffff',
    },
  }
}

EditQuestion.propTypes = propTypes
EditQuestion.defaultProps = defaultProps

export default reduxForm({
  form: 'EditQuestion',
  fields,
  validate,
})(Radium(EditQuestion))
