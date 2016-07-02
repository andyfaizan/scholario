import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import List from 'material-ui/List/List'
import AddBox from 'material-ui/svg-icons/content/add-box'
import ViewList from 'material-ui/svg-icons/action/view-list'
import IconButton from 'material-ui/IconButton'
import QuestionItem from '../../components/QuestionItem/QuestionItem'
import Subheader from 'material-ui/Subheader'
import ModalRoot from '../../containers/ModalRoot'
import { ADD_QUESTION_MODAL as addQuestionModalAction } from '../../redux/modules/modal'
import { Link } from 'react-router'
import classes from './RightSectionTeacherDashboard.scss'


const propTypes = {
  recentQuestions: PropTypes.array,
  popularQuestions: PropTypes.array,
  modal: PropTypes.object,
  location: PropTypes.object,
  linkToQuestionsList: PropTypes.string,
  show: PropTypes.func,
  onClickVote: PropTypes.func,
}

function RightSectionTeacherDashboard({
  modal, popularQuestions, recentQuestions,
  location, linkToQuestionsList, show, onClickVote }) {
  const allQuestionsTooltip = 'Alle Fragen'
  const askQuestion = 'Eine Frage stellen'

  let addQuestionModal
  if (modal && modal.visible &&
      modal.modalType === addQuestionModalAction) {
    addQuestionModal = <ModalRoot modalType={addQuestionModalAction} location={location} />
  }

  return (
    <div>
      <Card className={classes.border}>
        <CardText >
          <List>
            <Subheader className={classes.subheader}>
              <IconButton
                disableTouchRipple tooltip={allQuestionsTooltip}
                className={classes.iconStyles} containerElement={<Link to={linkToQuestionsList} />}
              >
                <ViewList color="#26A65B" />
              </IconButton>
              <IconButton disableTouchRipple tooltip={askQuestion} className={classes.iconStyles} onTouchTap={show}>
                <AddBox color="#26A65B" />
                {addQuestionModal}
              </IconButton>
              Wichtigste Fragen
            </Subheader>
            <div>
            {popularQuestions ? popularQuestions.map(question =>
              <QuestionItem
                key={question._id}
                questionStatement={question.title}
                datePosted={question.createDate}
                questionURL={`/question/${question._id}`}
                currentLikes={question.votes.length}
                onClickVote={() => onClickVote(question._id)}
              />
              ) : null
            }

            </div>
          </List>
          <List>
            <Subheader className={classes.subheader}> Neueste Fragen</Subheader>
            <div>
              {recentQuestions ? recentQuestions.map(question =>
                <QuestionItem
                  key={question._id}
                  questionStatement={question.title}
                  datePosted={question.createDate}
                  questionURL={`/question/${question._id}`}
                  currentLikes={question.votes.length}
                  onClickVote={() => onClickVote(question._id)}
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

RightSectionTeacherDashboard.propTypes = propTypes

export default RightSectionTeacherDashboard
