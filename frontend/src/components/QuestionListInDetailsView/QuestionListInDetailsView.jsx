import React, { PropTypes } from 'react'

import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'

import QuestionItem from '../../components/QuestionItem/QuestionItem'


const propTypes = {
  questionId: PropTypes.string,
  questionStatement: PropTypes.string.isRequired,
  listItemClickable: PropTypes.bool,
  datePosted: PropTypes.string.isRequired,
  questionURL: PropTypes.string,
  currentLikes: PropTypes.number,
  onClickVote: PropTypes.func,
}

function QuestionListInDetailsView({
  questionId, questionStatement, questionURL,
  currentLikes, listItemClickable, datePosted, onClickVote }) {
  return (
    <div>
      <Card>
        <CardText >
          <QuestionItem
            listItemClickable={listItemClickable}
            questionStatement={questionStatement}
            datePosted={datePosted}
            questionURL={questionURL}
            currentLikes={currentLikes}
            onClickVote={() => onClickVote(questionId)}
          />
        </CardText>
      </Card>
    </div>
  )
}

QuestionListInDetailsView.propTypes = propTypes

export default QuestionListInDetailsView
