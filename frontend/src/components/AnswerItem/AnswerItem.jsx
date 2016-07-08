import React, { PropTypes } from 'react'
import Radium from 'radium'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import CardHeader from 'material-ui/Card/CardHeader'
import Avatar from 'material-ui/Avatar'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up'
import Delete from 'material-ui/svg-icons/action/delete'
import Edit from 'material-ui/svg-icons/image/edit'
import IconButton from 'material-ui/IconButton'

type Props = {
  answer: PropTypes.object,
  personWhoAnswered: PropTypes.object,
  dateAnswered: PropTypes.string,
  answerText: PropTypes.string,
  user: PropTypes.object,
  courseInstance: PropTypes.object,
  onClickDelAnswer: PropTypes.func,
  onClickEditAnswer: PropTypes.func,
  onClickVoteAnswer: PropTypes.func,
  onClickBestAnswer: PropTypes.func,
  onClickApproveAnswer: PropTypes.func,
  question: PropTypes.object,
}

export class AnswerItem extends React.Component {
  constructor(props) {
    super(props)
    this.getDateFromZulu = this.getDateFromZulu.bind(this)
  }

  getDateFromZulu(dateString) {
    const dateParts = dateString.slice(0, 10).split('-')
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }

  props: Props

  render() {
    const styles = getStyles()

    const { personWhoAnswered, user, courseInstance, question, answer, onClickVoteAnswer,
      onClickDelAnswer, onClickEditAnswer, onClickBestAnswer, onClickApproveAnswer } = this.props

    let nameInitial = ''
    if (personWhoAnswered) nameInitial = personWhoAnswered.firstname[0]

    const nodeHeader = []

    if (answer && question && question.approvedAnswer && question.approvedAnswer === answer._id) {
      nodeHeader.push(
        <Avatar key="approvedAnswerBadge" style={styles.teacherVerify} backgroundColor="grey">
          T
        </Avatar>
      )
    }
    if (answer && question && question.bestAnswer && question.bestAnswer === answer._id) {
      nodeHeader.push(<Avatar key="bestAnswerBadge" style={styles.studentVerify} backgroundColor="grey">S</Avatar>)
    }

    let actions = []
    if (user && personWhoAnswered && user._id === personWhoAnswered._id) {
      actions.push(
        <FlatButton
          key="answerEditingButton" label="Antwort bearbeiten" linkButton
          onTouchTap={onClickEditAnswer} hoverColor="#26A65B"
          style={styles.buttonStyle} rippleColor="#ffffff" icon={<Edit />}
        />
      )
      actions.push(
        <FlatButton
          key="answerDeletingButton" label="Antwort löschen" linkButton
          onTouchTap={onClickDelAnswer} hoverColor="#26A65B"
          style={styles.buttonStyle} rippleColor="#ffffff" icon={<Delete />}
        />
      )
    }
    if (user && question && question.user && user._id === question.user._id) {
      actions.push(
        <FlatButton
          key="bestAnswerButton" label="gute Antwort" linkButton
          onTouchTap={onClickBestAnswer} hoverColor="#26A65B" style={styles.buttonStyle} rippleColor="#ffffff"
        />
      )
    }
    if (user && courseInstance && courseInstance.prof &&
        user.role === 'Prof' && user._id === courseInstance.prof._id) {
      actions.push(
        <FlatButton
          key="answerApprovingButton" label="Antwort überprüfen" linkButton
          onTouchTap={onClickApproveAnswer} hoverColor="#26A65B" style={styles.buttonStyle} rippleColor="#ffffff"
        />
      )
    }

    const voting = (
      <div>
        <div key="thumbs" style={styles.buttonThumbsUp}>
          <IconButton disableTouchRipple onTouchTap={onClickVoteAnswer}>
            <ThumbsUp color="#26A65B" />
          </IconButton>
        </div>
        <div key="avatar" style={styles.avatar}>
          <Avatar size={25} color="#26A65B" backgroundColor="white">
            {answer ? answer.votes.length : 0}
          </Avatar>
        </div>
      </div>)

    const childVars = [
      voting,
      nodeHeader,
    ]

    return (
      <div>
        <Card>
          <CardHeader
            title={personWhoAnswered ? `${personWhoAnswered.firstname} ${personWhoAnswered.lastname}` : ''}
            subtitle={this.getDateFromZulu(this.props.dateAnswered)}
            actAsExpander={false}
            showExpandableButton={false}
            avatar={<Avatar backgroundColor="#446CB3">{nameInitial}</Avatar>}
            titleColor="#26A65B"
            children={childVars}
          />
          <CardText style={styles.textStyle}>
            {this.props.answerText}
          </CardText>
          <CardActions style={styles.actionPadding}>
            {actions}
          </CardActions>
        </Card>
        <br />
      </div>
    )
  }
}

function getStyles() {
  return {
    avatar: {
      position: 'relative',
      float: 'right',
      marginLeft: 'auto',
      marginTop: '-37px',
      marginRight: '30px',
      marginBottom: 'auto',
    },
    buttonThumbsUp: {
      position: 'relative',
      float: 'right',
      marginLeft: 'auto',
      marginTop: '-50px',
      marginRight: '-10px',
      marginBottom: 'auto',
    },
    textStyle: {
      paddingLeft: '70px',
      paddingRight: '50px',
    },
    actionPadding: {
      paddingLeft: '52px',
      backgroundColor: '#446cB3',
      color: '#ffffff',
    },
    teacherVerify: {
      position: 'relative',
      marginTop: '0px',
      float: 'right',
    },
    studentVerify: {
      position: 'relative',
      marginLeft: 'auto',
      marginTop: 0,
      marginRight: 0,
      marginBottom: 'auto',
      float: 'right',
    },
    buttonStyle: {
      color: '#ffffff',
    },
  }
}

export default Radium(AnswerItem)
