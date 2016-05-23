import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardHeader from 'material-ui/lib/card/card-header'
import Avatar from 'material-ui/lib/avatar'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'

type Props = {
  personWhoAnswered: PropTypes.string,
  dateAnswered: PropTypes.string,
  answerText: PropTypes.string,
}

export class AnswerItem extends React.Component {
  props: Props

  render () {
    var nameInitial = ''
    if (this.props.personWhoAnswered)
      nameInitial = this.props.personWhoAnswered[0]

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

    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.personWhoAnswered}
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
                      <FlatButton label="Antwort bearbeiten" linkButton={true}
                      hoverColor="#26A65B" />
                      <FlatButton label="Antwort löschen" linkButton={true}
                      hoverColor="#26A65B" />
                      <FlatButton label="überprüfen Antwort" linkButton={true}
                      hoverColor="#26A65B" />
                    </CardActions>
          
            
        </Card>
        
      </div>
    )
  }
}

export default AnswerItem

