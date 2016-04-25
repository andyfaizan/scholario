import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'

type Props = {

};
export class RightSectionTeacherDashboard extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <Card>
          <CardText>
            <List subheader="Popular Questions" insetSubheader={false}>
              <Divider />
            <ListItem
        primaryText="Photos"
        secondaryText="Jan 9, 2014"
      />
            </List>
            <Divider />
            <List subheader="Recent Questions" insetSubheader={false}>
              <Divider />
            </List>
          </CardText>
       </Card>
      </div>
    )
  }
}

export default RightSectionTeacherDashboard

