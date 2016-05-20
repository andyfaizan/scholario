import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import QuestionItem from '../../components/QuestionItem/QuestionItem'

type Props = {
  questionId: PropTypes.string,
  questionStatement: PropTypes.string.isRequired,
  listItemClickable: PropTypes.bool,
  datePosted: PropTypes.string.isRequired,
  questionURL: PropTypes.string,
  currentLikes: PropTypes.number,
}

export class QuestionListInDetailsView extends React.Component {
  props: Props

  render () {
    return (
      <div>
        <Card>
          <CardText >
            <QuestionItem
              listItemClickable={this.props.listItemClickable}
              questionStatement={this.props.questionStatement}
              datePosted={this.props.datePosted}
              questionURL={this.props.questionURL}
              currentLikes={this.props.currentLikes}
              onClickVote={() => this.props.onClickVote(this.props.questionId)}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default QuestionListInDetailsView

