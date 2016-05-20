import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import QuestionItem from '../../components/QuestionItem/QuestionItem'

type Props = {
  questionStatement: PropTypes.string.isRequired,
  listItemClickable: PropTypes.bool,
  datePosted: PropTypes.string.isRequired,
  questionURL: PropTypes.string,
}

export class QuestionListInDetailsView extends React.Component {
  props: Props

  render () {
    return (
      <div>
        <Card>
          <CardText >
            <QuestionItem listItemClickable={this.props.listItemClickable} questionStatement={this.props.questionStatement} datePosted={this.props.datePosted}  questionURL={this.props.questionURL} />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default QuestionListInDetailsView

