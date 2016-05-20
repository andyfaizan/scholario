import React, { PropTypes } from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import Colors from 'material-ui/lib/styles/colors'
import ActionQuestionAnswer from 'material-ui/lib/svg-icons/action/question-answer'
import Avatar from 'material-ui/lib/avatar'
import IconButton from 'material-ui/lib/icon-button'
import ThumbsUp from 'material-ui/lib/svg-icons/action/thumb-up'
import classes from './QuestionItem.scss'
import { Router, Route, Link } from 'react-router'

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
    questionURL: PropTypes.string,
    listItemClickable: PropTypes.bool,
    currentLikes: PropTypes.number
  };

  render () { 

    const styleSecondaryText = {

      color: '#26A65B',
      opacity: 0.2
    }; 

      const border = {
      color:'#26A65B'
 
           };

      const touchQuestion = () => { 

              

      } ;

    const secondaryText = <div className={styleSecondaryText}>{this.props.datePosted}</div>
    return (
      <div>
      	<ListItem
        leftIcon={<ActionQuestionAnswer color="#26A65B"/>}
        primaryText= {this.props.questionStatement}
        secondaryText={secondaryText}
        innerDivStyle={{color:'#26A65B'}}
        style={border}
        disabled ={this.props.listItemClickable}
        rightAvatar = {<div className={classes.avatar}><Avatar size={25} color="#26A65B" backgroundColor="white">52</Avatar></div>}
        rightIconButton = {<div className={classes.buttonThumbsUp}><IconButton>
                           <ThumbsUp color="#26A65B" /></IconButton></div>}
        onTouchTap={ touchQuestion }
      	/>
      </div>
    )
  }
}

export default QuestionItem

