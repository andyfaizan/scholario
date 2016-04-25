import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'
import QuestionItem from '../../components/QuestionItem/QuestionItem'

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
              <QuestionItem />
              <QuestionItem />
              <QuestionItem />
            </List>
            <Divider />
            <List subheader="Recent Questions" insetSubheader={false}>
              <Divider />
               <QuestionItem />
               <QuestionItem />
               <QuestionItem />
            </List>
          </CardText>
       </Card>
      </div>
    )
  }
}

export default RightSectionTeacherDashboard

