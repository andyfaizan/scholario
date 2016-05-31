import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import CardHeader from 'material-ui/Card/CardHeader';
import Avatar from 'material-ui/Avatar';
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from 'material-ui/FlatButton';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import IconButton from 'material-ui/IconButton';
import classes from './AnswerItem.scss'

type Props = {
  answer: PropTypes.Object,
  personWhoAnswered: PropTypes.Object,
  dateAnswered: PropTypes.string,
  answerText: PropTypes.string,
  user: PropTypes.Object,
  courseInstance: PropTypes.Object,
  onClickDelAnswer: PropTypes.func,
  onClickEditAnswer: PropTypes.func,
  onClickVoteAnswer: PropTypes.func,
  question: PropTypes.Object,
}

export class AnswerItem extends React.Component {
  props: Props

  render () {
    const { personWhoAnswered, user, courseInstance, question, answer, onClickVoteAnswer,
      onClickDelAnswer, onClickEditAnswer, onClickBestAnswer, onClickApproveAnswer } = this.props

    var nameInitial = ''
    if (personWhoAnswered)
      nameInitial = personWhoAnswered.firstname[0]

    const textStyle = {

      paddingLeft: 70,
      paddingRight: 50

    }

    const actionPadding = {
        
      paddingLeft: 52

    }

    const teacherVerify = {

      postion: 'relative',
      marginTop: 0,
      float:'right'
    }

    const studentVerify = {

      postion: 'relative',
      margin:'auto',
      marginTop: 0,
      marginRight:0,
      float:'right'
    }

    const nodeHeader = []

    if (answer && question && question.approvedAnswer && question.approvedAnswer === answer._id) {
      nodeHeader.push(<Avatar key='approvedAnswerBadge' style={teacherVerify} backgroundColor="grey">T</Avatar>)
    }
    if (answer && question && question.bestAnswer && question.bestAnswer === answer._id) {
      nodeHeader.push(<Avatar key='bestAnswerBadge' style={studentVerify} backgroundColor="grey">S</Avatar>)
    }

    var actions = []
    if (user && personWhoAnswered && user._id === personWhoAnswered._id) {
      actions.push(<FlatButton key='answerEditingButton' label="Antwort bearbeiten" linkButton={true}
                   onTouchTap={onClickEditAnswer} hoverColor="#26A65B" />)
      actions.push(<FlatButton key='answerDeletingButton' label="Antwort löschen" linkButton={true}
                   onTouchTap={onClickDelAnswer} hoverColor="#26A65B" />)
    }
    if (user && question && question.user && user._id === question.user._id) {
      actions.push(<FlatButton key='bestAnswerButton' label="gute Antwort" linkButton={true}
                   onTouchTap={onClickBestAnswer} hoverColor="#26A65B" />)
    }
    if (user && courseInstance && courseInstance.prof &&
        user.role === 'Prof' && user._id === courseInstance.prof._id) {
      actions.push(<FlatButton key='answerApprovingButton' label="überprüfen Antwort" linkButton={true}
                   onTouchTap={onClickApproveAnswer} hoverColor="#26A65B" />)
    }

    var voting =<div> 
                  <div key="thumbs" className={classes.buttonThumbsUp}>
                     <IconButton onTouchTap={onClickVoteAnswer}>
                     <ThumbsUp color="#26A65B" />
                     </IconButton>
                   </div>
                  <div key="avatar" className={classes.avatar}>
                    <Avatar size={25} color="#26A65B" backgroundColor="white">
                      {answer ? answer.votes.length : 0}
                    </Avatar>
                  </div>
                </div>

    const childVars = [
      
      voting,
      nodeHeader
      

    ]

    return (
      <div>
        <Card>
          <CardHeader
            title={personWhoAnswered ? `${personWhoAnswered.firstname} ${personWhoAnswered.lastname}` : ''}
            subtitle={this.props.dateAnswered}
            actAsExpander={false}
            showExpandableButton={false}
            avatar={<Avatar backgroundColor='#446CB3'>{nameInitial}</Avatar>}
            titleColor="#26A65B"
            children={childVars}
          />
          <CardText style={textStyle}>
            {this.props.answerText}
          </CardText>
          <CardActions style={actionPadding}>
            {actions}
          </CardActions>
        </Card>
        <br/>
      </div>
    )
  }
}

export default AnswerItem

