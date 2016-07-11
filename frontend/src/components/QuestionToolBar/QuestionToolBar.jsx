import React from 'react'

import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import CardTitle from 'material-ui/Card/CardTitle'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'


const propTypes = {

}

function QuestionToolBar() {
  const TITLE_OF_QUESTIONS = 'Liste aller Fragen'
  const SUBTITLE_OF_QUESTIONS = 'Klicke auf eine Frage um Antworten zu sehen oder stell eine neue Frage'

  return (
    <div>
      <Card>
        <CardText >
          <CardTitle titleColor="#26A65B" title={TITLE_OF_QUESTIONS} subtitle={SUBTITLE_OF_QUESTIONS} />
          <CardActions hoverColor="#26A65B" >
            <FlatButton hoverColor="#26A65B" label="Neue Frage Hinzufügen" linkButton />
            <FlatButton hoverColor="#26A65B" label="Alle Fragen Löschen" linkButton />
          </CardActions>
        </CardText>
      </Card>
    </div>
  )
}

QuestionToolBar.propTypes = propTypes

export default QuestionToolBar
