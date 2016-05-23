import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardTitle from 'material-ui/lib/card/card-title'
import AddCircle from 'material-ui/lib/svg-icons/content/add'
import classes from './QuestionToolBar.scss'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'

type Props = {

};
export class QuestionToolBar extends React.Component {
  props: Props;

  render () {

  	const TITLE_OF_QUESTIONS = "Liste aller Fragen"
  	const SUBTITLE_OF_QUESTIONS = "Klicke auf eine Frage um Antworten zu sehen or stell eine neue Frage"

    return (
      <div>
      	<Card>
          <CardText >
              <CardTitle titleColor='#26A65B' title={TITLE_OF_QUESTIONS} subtitle={SUBTITLE_OF_QUESTIONS} />
                  <CardActions hoverColor='#26A65B' >
                    <FlatButton hoverColor='#26A65B' label="Neue Frage hinzufügen" linkButton={true}  />
                    <FlatButton hoverColor='#26A65B' label="Löschen Alle Fragen" linkButton={true}  />
                  </CardActions>
              </CardText>
        </Card>
      </div>
    )
  }
}

export default QuestionToolBar

