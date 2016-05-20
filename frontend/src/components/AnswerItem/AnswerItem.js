import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardHeader from 'material-ui/lib/card/card-header'
import Avatar from 'material-ui/lib/avatar'

type Props = {
  personWhoAnswered: PropTypes.string,
  dateAnswered: PropTypes.string,
  answerText: PropTypes.string,
}

export class AnswerItem extends React.Component {
  props: Props

  render () {
    return (
      <div>
        <Card>
          <CardHeader
              title={this.props.personWhoAnswered}
		      subtitle={this.props.dateAnswered}
		      actAsExpander={false}
		      showExpandableButton={false}
		      avatar = {<Avatar>A</Avatar>} 
		  />
            <CardText>
            	{this.props.answerText}
            </CardText>
        </Card>
      </div>
    )
  }
}

export default AnswerItem

