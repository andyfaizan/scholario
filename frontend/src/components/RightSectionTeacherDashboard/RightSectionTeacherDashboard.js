import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'

type Props = {

};
export class RightSectionTeacherDashboard extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <Card>
          <CardText>
            
             <List>
                <ListItem primaryText="Inbox"  />
                <ListItem primaryText="Starred" />
     
             </List>
                            
          </CardText>
       </Card>
      </div>
    )
  }
}

export default RightSectionTeacherDashboard

