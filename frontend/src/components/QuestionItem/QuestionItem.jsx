import React, { PropTypes } from 'react'
import Radium from 'radium'

import { browserHistory } from '../../history'

import ListItem from 'material-ui/List/ListItem'
import ActionQuestionAnswer from 'material-ui/svg-icons/action/question-answer'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up'


const propTypes = {
  questionStatement: PropTypes.string,
  datePosted: PropTypes.string,
  numberOfVotes: PropTypes.number,
  questionURL: PropTypes.string,
  postedBy: PropTypes.string,
  listItemClickable: PropTypes.bool,
  currentLikes: PropTypes.number,
  onClickVote: PropTypes.func,
}

export class QuestionItem extends React.Component {
  constructor(props) {
    super(props)
    this.getDateFromZulu = this.getDateFromZulu.bind(this)
  }

  getDateFromZulu(dateString) {
    const dateParts = dateString.slice(0, 10).split('-')
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }

  render() {
    const styles = getStyles()

    const touchQuestion = () => {
      browserHistory.push(this.props.questionURL)
    }

    const date = this.props.datePosted

    const secondaryText = (
      <div style={styles.styleSecondaryText}>
        {this.props.postedBy} gepostet am {date ? this.getDateFromZulu(date) : ''}
      </div>
    )

    return (
      <div>
        <ListItem
          leftIcon={<ActionQuestionAnswer color="#26A65B" />}
          primaryText={this.props.questionStatement}
          secondaryText={secondaryText}
          innerDivStyle={{ color: '#26A65B' }}
          style={styles.border}
          disabled={this.props.listItemClickable}
          rightAvatar={
            <div style={styles.avatar}>
              <Avatar size={25} color="#26A65B" backgroundColor="white">
                {this.props.currentLikes}
              </Avatar>
            </div>
          }
          rightIconButton={
            <div style={styles.buttonThumbsUp}>
              <IconButton disableTouchRipple onTouchTap={this.props.onClickVote}>
                <ThumbsUp color="#26A65B" />
              </IconButton>
            </div>
          }
          onTouchTap={touchQuestion}
        />
      </div>
    )
  }
}

function getStyles() {
  return {
    avatar: {
      float: 'right',
      marginLeft: 'auto',
      marginTop: '10px',
      marginRight: '25px',
      marginBottom: 'auto',
    },
    buttonThumbsUp: {
      margin: 'auto',
      float: 'right',
    },
    styleSecondaryText: {
      color: '#26A65B',
      opacity: 0.5,
    },
    border: {
      color: '#26A65B',
    },
  }
}

QuestionItem.propTypes = propTypes

export default Radium(QuestionItem)
