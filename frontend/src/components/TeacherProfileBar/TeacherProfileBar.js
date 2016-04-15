import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'
import Divider from 'material-ui/lib/divider'

type Props = {

};
export class TeacherProfileBar extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <Card>
    <CardHeader
      title="Muhammad Rohan Ali Asmat"
      subtitle="RWTH Aachen ( Media Informatics )"
      avatar="http://lorempixel.com/100/100/nature/"
      actAsExpander={true}
      showExpandableButton={true}
    ></CardHeader>
    <Divider />
    <CardText expandable={true}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    <CardActions expandable={true}>
      <FlatButton label="Action1"/>
      <FlatButton label="Action2"/>
    </CardActions>
  </Card>
      </div>
    )
  }
}

export default TeacherProfileBar

