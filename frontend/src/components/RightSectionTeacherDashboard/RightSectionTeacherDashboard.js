import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import AddBox from 'material-ui/lib/svg-icons/content/add-box'
import ViewList from 'material-ui/lib/svg-icons/action/view-list'
import IconButton from 'material-ui/lib/icon-button'
import QuestionItem from '../../components/QuestionItem/QuestionItem'
import Subheader from 'material-ui/lib/Subheader'
import ModalRoot from '../../containers/ModalRoot'
import {ADD_QUESTION_MODAL as add_question} from '../../redux/modules/modal'


type Props = {
  questions: PropTypes.array,
  modal: PropTypes.object,
  show: PropTypes.func
};

export class RightSectionTeacherDashboard extends React.Component {
  props: Props;

  render () {

    const border = {
      color:'#26A65B',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#26A65B'
           };
    const subheader ={
      color:'#26A65B'
    } ;

    const iconStyles = {
      float: 'right',
    };

    const allQuestionsTooltip = "Alle Frage"
    const askQuestion = "Eine Frage stellen"

    return (
      <div>
        <Card style={border}>
          <CardText >
            <List>
              <Subheader style={subheader}>
                Popular Questions
                <IconButton tooltip={allQuestionsTooltip} style={iconStyles}>
                  <ViewList />
                </IconButton>
                <IconButton tooltip={askQuestion} style={iconStyles} onTouchTap={this.props.show}>
                  <AddBox />
                  {this.props.modal ? (this.props.modal.visible ? <ModalRoot {...add_question} /> : null) : null}
                </IconButton>
              </Subheader>
              <div>
              {this.props.questions? this.props.questions.map(question =>
                <QuestionItem
                  key={question._id}
                  questionStatement={question.title}
                  datePosted={question.createDate}
                />
            ) : null}

              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
              </div>
            </List>
            <List>
              <Subheader style={subheader}>Recent Questions</Subheader>
              <div>
              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
              <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
              </div>
            </List>
          </CardText>
       </Card>
      </div>
    )
  }
}

export default RightSectionTeacherDashboard
