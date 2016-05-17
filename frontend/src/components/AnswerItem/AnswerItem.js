import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardHeader from 'material-ui/lib/card/card-header'
import Avatar from 'material-ui/lib/avatar'

type Props = {

};
export class AnswerItem extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <Card>
          <CardHeader
              title="Without Avatar"
		      subtitle="Subtitle"
		      actAsExpander={false}
		      showExpandableButton={false}
		      avatar = {<Avatar>A</Avatar>} 
		  />
            <CardText>
              dasdlasldjasljdljasljdljasldjslasldjjlajdlksjaldjlalsdjlalsjdjsaldljlsaldjlsljldjlalkdsll
            </CardText>
        </Card>
      </div>
    )
  }
}

export default AnswerItem

