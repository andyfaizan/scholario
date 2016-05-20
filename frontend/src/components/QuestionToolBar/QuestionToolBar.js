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

  	const TITLE_OF_QUESTIONS = "List of Questions"
  	const SUBTITLE_OF_QUESTIONS = "Tap of the question to view the answer or post a new question"

    return (
      <div>
      	<Card>
          <CardText >
              <CardTitle title={TITLE_OF_QUESTIONS} subtitle={SUBTITLE_OF_QUESTIONS} />
                  <CardActions >
                    <FlatButton label="Add New Question" linkButton={true}  />
                    <FlatButton label="Add Material To Question" linkButton={true}  />

                  </CardActions>
              </CardText>
        </Card>
      </div>
    )
  }
}

export default QuestionToolBar

