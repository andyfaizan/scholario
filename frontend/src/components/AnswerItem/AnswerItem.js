import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardHeader from 'material-ui/lib/card/card-header'
import Avatar from 'material-ui/lib/avatar'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'
import ThumbsUp from 'material-ui/lib/svg-icons/action/thumb-up'
import IconButton from 'material-ui/lib/icon-button'
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
  question: PropTypes.Object,
}

export class AnswerItem extends React.Component {
  props: Props

  render () {
    const { personWhoAnswered, user, courseInstance, question, answer,
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
      marginRight:10,
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
                     <IconButton >
                     <ThumbsUp color="#26A65B" />
                     </IconButton>
                   </div>
                  <div key="avatar" className={classes.avatar}>
                    <Avatar size={25} color="#26A65B" backgroundColor="white">
                    25
                    </Avatar>
                  </div>
                </div>

    const childVars = [
      
      nodeHeader,
      voting

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

