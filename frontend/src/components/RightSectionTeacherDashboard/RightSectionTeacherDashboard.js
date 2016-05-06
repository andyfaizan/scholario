import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import QuestionItem from '../../components/QuestionItem/QuestionItem'
import Subheader from 'material-ui/lib/Subheader'

type Props = {
  questions: React.PropTypes.array,
};

export class RightSectionTeacherDashboard extends React.Component {
  props: Props;

  render () {

    const border = {
      color:'#26A65B'
           };

    return (
      <div>
        <Card style={border}>
          <CardText style={border}>
            <List style={border}>
              <Subheader style={border}>Popular Questions</Subheader>
              {this.props.questions.map(question =>
                <QuestionItem
                  key={question._id}
                  questionStatement={question.title}
                  datePosted={question.createDate}
                />
              )}

              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
            </List>
            <List>
              <Subheader>Recent Questions</Subheader>
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

