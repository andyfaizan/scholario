import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import QuestionItem from '../../components/QuestionItem/QuestionItem'

type Props = {

};

export class QuestionListInDetailsView extends React.Component {
  props: Props;

  render () {
    return (
      <div>
      	<Card>
          <CardText >
          	<QuestionItem />
          	<QuestionItem />
          	<QuestionItem />
          	<QuestionItem />
          	<QuestionItem />
          	<QuestionItem />
          	<QuestionItem />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default QuestionListInDetailsView

