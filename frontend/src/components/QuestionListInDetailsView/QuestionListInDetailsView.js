import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'

type Props = {

};
export class QuestionListInDetailsView extends React.Component {
  props: Props;

  render () {
    return (
      <div>
      	<Card>
          <CardText >
          	Complete List Of Questions
          </CardText>
        </Card>
      </div>
    )
  }
}

export default QuestionListInDetailsView

