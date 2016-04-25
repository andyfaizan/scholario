import React, { PropTypes } from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import Colors from 'material-ui/lib/styles/colors'
import ActionQuestionAnswer from 'material-ui/lib/svg-icons/action/question-answer'

type Props = {

	questionStatement: string,
	datePosted: string,
	numberOfVotes: number,
	questionURL: string
};
export class QuestionItem extends React.Component {
  static propTypes = {
    questionStatement: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
    numberOfVotes: PropTypes.number.isRequired,
    questionURL: PropTypes.string.isRequired
  };

  render () { 
    return (
      <div>
      	<ListItem
        leftIcon={<ActionQuestionAnswer/>}
        primaryText= {this.props.questionStatement}
        secondaryText={this.props.datePosted}
      	/>
      </div>
    )
  }
}

export default QuestionItem

