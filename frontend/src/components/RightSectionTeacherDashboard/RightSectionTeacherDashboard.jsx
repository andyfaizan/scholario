import React, { PropTypes } from 'react'
import Radium from 'radium'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import List from 'material-ui/List/List'
import AddBox from 'material-ui/svg-icons/content/add-box'
import ViewList from 'material-ui/svg-icons/action/view-list'
import IconButton from 'material-ui/IconButton'
import QuestionItem from '../../components/QuestionItem/QuestionItem'
import Subheader from 'material-ui/Subheader'
import ModalRoot from '../../modals/ModalRoot'
import { ADD_QUESTION_MODAL as addQuestionModalAction } from '../../redux/modules/modal'
import { Link } from 'react-router'


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
  const styles = getStyles()

  const allQuestionsTooltip = 'Alle Fragen'
  const askQuestion = 'Eine Frage stellen'

  let addQuestionModal
  if (modal && modal.visible &&
      modal.modalType === addQuestionModalAction) {
    addQuestionModal = <ModalRoot modalType={addQuestionModalAction} location={location} />
  }

  return (
    <div>
      <Card style={styles.border}>
        <CardText >
          <List>
            <Subheader style={styles.subheader}>
              <IconButton
                disableTouchRipple tooltip={allQuestionsTooltip}
                style={styles.iconStyles} containerElement={<Link to={linkToQuestionsList} />}
              >
                <ViewList color="#26A65B" />
              </IconButton>
              <IconButton disableTouchRipple tooltip={askQuestion} style={styles.iconStyles} onTouchTap={show}>
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
            <Subheader style={styles.subheader}> Neueste Fragen</Subheader>
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

function getStyles() {
  return {
    border: {
      color: '#26A65B',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#26A65B',
    },
    subheader: {
      color: '#26A65B',
    },
    iconStyles: {
      float: 'left',
      position: 'relative',
      marginLeft: '-15px',
    },
  }
}

RightSectionTeacherDashboard.propTypes = propTypes

export default Radium(RightSectionTeacherDashboard)
