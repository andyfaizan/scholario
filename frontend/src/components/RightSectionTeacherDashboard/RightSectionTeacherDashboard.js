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
import { Router, Route, Link } from 'react-router'


type Props = {
  recentQuestions: PropTypes.array,
  popularQuestions: PropTypes.array,
  modal: PropTypes.object,
  show: PropTypes.func,
  location: PropTypes.object,
  linkToQuestionsList: PropTypes.string,
};

export class RightSectionTeacherDashboard extends React.Component {
  props: Props;

  render () {

    //question item is clickable ......
    const boolQuestionClickable = false ;

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
      float: 'left',
      position: 'relative',
      marginLeft: -15
    };

    const allQuestionsTooltip = "Alle Fragen"
    const askQuestion = "Eine Frage stellen"
    const { linkToQuestionsList } = this.props

    return (
      <div>
        <Card style={border}>
          <CardText >
            <List>
              <Subheader style={subheader}>
                <IconButton tooltip={allQuestionsTooltip} style={iconStyles} containerElement={<Link to={linkToQuestionsList}  />}>
                  <ViewList color='#26A65B' />
                </IconButton>
                <IconButton tooltip={askQuestion} style={iconStyles} onTouchTap={this.props.show}>
                  <AddBox color='#26A65B' />
                  {this.props.modal ? (this.props.modal.visible ? <ModalRoot modalType={add_question} location={this.props.location} /> : null) : null}
                </IconButton>
                Wichtigste Fragen
              </Subheader>
              <div>
              {this.props.popularQuestions ? this.props.popularQuestions.map(question =>
                <QuestionItem
                  key={question._id}
                  questionStatement={question.title}
                  datePosted={question.createDate}
                  questionURL={`/question/${question._id}`}
                  currentLikes={question.votes.length}
                  onClickVote={() => this.props.onClickVote(question._id)}
                />
                ) : null
              }

              </div>
            </List>
            <List>
              <Subheader style={subheader}> Neueste Fragen</Subheader>
              <div>
                {this.props.recentQuestions ? this.props.recentQuestions.map(question =>
                  <QuestionItem
                    key={question._id}
                    questionStatement={question.title}
                    datePosted={question.createDate}
                    questionURL={`/question/${question._id}`}
                    currentLikes={question.votes.length}
                    onClickVote={() => this.props.onClickVote(question._id)}
                  />
                  ) : null
                }


              </div>
            </List>
          </CardText>
       </Card>
      </div>
    )
  }
}

export default RightSectionTeacherDashboard
