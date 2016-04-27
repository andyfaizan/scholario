import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import QuestionItem from '../../components/QuestionItem/QuestionItem'
import Subheader from 'material-ui/lib/Subheader'

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
              <Subheader>Popular Questions</Subheader>
              <Divider />
              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
            </List>
            <Divider />
            <List>
              <Subheader>Recent Questions</Subheader>
              <Divider />
              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
            </List>
          </CardText>
       </Card>
      </div>
    )
  }
}

export default RightSectionTeacherDashboard

