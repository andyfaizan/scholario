import React from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import Colors from 'material-ui/lib/styles/colors'
import ActionQuestionAnswer from 'material-ui/lib/svg-icons/action/question-answer'

type Props = {

};
export class QuestionItem extends React.Component {
  props: Props;

  render () {
  	// variables to be set for question item
  	var questionStatement = 'What is Neuclear Physics?' ;
  	var datePosted = 'Jan 17, 2014' ;
  	var numberOfVotes = '' ;

    return (
      <div>
      	<ListItem
        leftIcon={<ActionQuestionAnswer/>}
        primaryText= { questionStatement }
        secondaryText={datePosted}
      	/>
      </div>
    )
  }
}

export default QuestionItem

