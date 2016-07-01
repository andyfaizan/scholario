import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import CardHeader from 'material-ui/Card/CardHeader'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import classes from './NewAnswerComp.scss'

const propTypes = {
  personWhoAnswered: PropTypes.object,
  dateAnswered: PropTypes.string,
  answerText: PropTypes.string,
  user: PropTypes.object,
  courseInstance: PropTypes.object,
  onClickDelAnswer: PropTypes.func,
}

function NewAnswerComp({ personWhoAnswered, user, courseInstance, onClickDelAnswer }) {
  const actions = []
  if (user && personWhoAnswered && user._id === personWhoAnswered._id) {
    actions.push(
      <FlatButton
        key="answerEditingButton" label="Antwort bearbeiten" linkButton
        hoverColor="#26A65B"
      />
    )
    actions.push(
      <FlatButton
        key="answerDeletingButton" label="Antwort löschen" linkButton
        onTouchTap={onClickDelAnswer} hoverColor="#26A65B"
      />
    )
  }

  if (user && courseInstance && user.role === 'Prof' && user._id === courseInstance.prof._id) {
    actions.push(
      <FlatButton
        key="answerApprovingButton" label="überprüfen Antwort" linkButton
        hoverColor="#26A65B"
      />
    )
  }

  return (
    <div>
      <Card>
        <CardHeader
          title={"Antwort"}
        />
        <CardText style={classes.textStyle}>
          <TextField
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
            key="answerApprovingButton" label="Abschicken" linkButton
            hoverColor="#26A65B"
          />
        </CardActions>
      </Card>
    </div>
  )
}

NewAnswerComp.propTypes = propTypes

export default NewAnswerComp

