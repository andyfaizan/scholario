import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardHeader from 'material-ui/lib/card/card-header'
import Avatar from 'material-ui/lib/avatar'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'

type Props = {
  personWhoAnswered: PropTypes.Object,
  dateAnswered: PropTypes.string,
  answerText: PropTypes.string,
  user: PropTypes.Object,
  courseInstance: PropTypes.Object,
}

export class AnswerItem extends React.Component {
  props: Props

  render () {
    const { personWhoAnswered, user, courseInstance } = this.props

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

    const StudentVerify = {

      postion: 'relative',
      margin:'auto',
      marginTop: 0,
      marginRight:10,
      float:'right'
    }

    const nodeHeader = [
      <Avatar style={teacherVerify} backgroundColor="grey">T</Avatar>,
      <Avatar style={StudentVerify} backgroundColor="grey">S</Avatar>
    ]

    var actions = []
    if (user && personWhoAnswered && user._id === personWhoAnswered._id) {
      actions.push(<FlatButton label="Antwort bearbeiten" linkButton={true}
                   hoverColor="#26A65B" />)
      actions.push(<FlatButton label="Antwort löschen" linkButton={true}
                   hoverColor="#26A65B" />)
    }
    if (user && courseInstance && user.role === 'Prof' && user._id === courseInstance.prof._id) {
      actions.push(<FlatButton label="überprüfen Antwort" linkButton={true}
                   hoverColor="#26A65B" />)
    }
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
            children={nodeHeader}
          />
            <CardText style={textStyle}>
              {this.props.answerText}
            </CardText>
          <CardActions style={actionPadding}>
            {actions}
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default AnswerItem

