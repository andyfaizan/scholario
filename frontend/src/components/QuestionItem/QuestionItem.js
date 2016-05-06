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
    numberOfVotes: PropTypes.number,
    questionURL: PropTypes.string
  };

  render () { 

    const styleSecondaryText = {

      color: '#26A65B',
      opacity: 0.2
    }; 
    
    const secondaryText = <div className={styleSecondaryText}>{this.props.datePosted}</div>
    return (
      <div>
      	<ListItem
        leftIcon={<ActionQuestionAnswer color="#26A65B"/>}
        primaryText= {this.props.questionStatement}
        secondaryText={secondaryText}
        innerDivStyle={{color:'#26A65B'}}
        style={{color:'#26A65B'}}
      	/>
      </div>
    )
  }
}

export default QuestionItem

