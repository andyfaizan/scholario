import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import CardHeader from 'material-ui/Card/CardHeader'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import classes from './NewAnswerForm.scss'


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
  return (
    <div>
      <Card>
        <CardHeader
          style={classes.cardHeaderStyle}
          title={'Frage beantworten'}
          titleColor="#26A65B"
          titleStyle={classes.cardHeaderTitleStyle}
        />
        <form onSubmit={handleSubmit}>
          <CardText style={classes.textStyle}>
            <TextField
              {...content}
              floatingLabelText="Deine Antwort"
              multiLine
              rows={2}
              fullWidth
              floatingLabelStyle={classes.floatingLabel}
              underlineFocusStyle={classes.underlineColor}
            />
          </CardText>
          <CardActions style={classes.actionPadding}>
            <FlatButton
              label="Senden" linkButton
              onTouchTap={handleSubmit} hoverColor="#26A65B"
              style={classes.buttonStyle} rippleColor="#ffffff"
            />
            <FlatButton
              label="Abbrechen" linkButton
              onTouchTap={onCancel} hoverColor="#26A65B"
              style={classes.buttonStyle} rippleColor="#ffffff"
            />
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

NewAnswer.propTypes = propTypes
NewAnswer.defaultProps = defaultProps

export default reduxForm({
  form: 'NewAnswer',
  fields,
  validate,
})(NewAnswer)
