import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as selectors from '../../redux/selectors'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import DashboardToolBar from '../../containers/DashboardToolBar'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import QuestionItem from '../../components/QuestionItem/QuestionItem'
import AnswerItem from '../../components/AnswerItem/AnswerItem'
import NewAnswerForm from '../../forms/NewAnswerForm/NewAnswerForm'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import { postAnswer, deleteAnswer, putAnswer, voteAnswer } from '../../redux/modules/answer'
import {
  getQuestion, voteQuestion, setCurQuestion,
  deleteQuestion, putQuestion } from '../../redux/modules/question'
import { browserHistory } from '../../history'
import Feedback from '../../containers/Feedback'
import Reply from 'material-ui/svg-icons/content/reply'
import Pageview from 'material-ui/svg-icons/action/pageview'


const propTypes = {
  params: PropTypes.object,
  user: PropTypes.object,
  courseInstance: PropTypes.object,
  question: PropTypes.object,
  curCourseInstanceId: PropTypes.string,
  dispatch: PropTypes.func,
}

export class Question extends React.Component {
  constructor(props) {
    super(props)
    this.toggleNewAnswerForm = this.toggleNewAnswerForm.bind(this)
    this.editAnswer = this.editAnswer.bind(this)
    this.state = {
      didGetCourseInstance: false,
      showNewAnswerForm: false,
      answerBeingEdited: null,
    }
  }

  componentDidMount() {
    const qid = this.props.params.id
    this.props.dispatch(setCurQuestion(qid))
    this.props.dispatch(getQuestion(qid))
  }

  componentWillReceiveProps(newProps) {
    if (_.isEmpty(this.props.courseInstance) &&
        !this.props.curCourseInstanceId &&
        !this.state.didGetCourseInstance &&
        newProps && newProps.question && newProps.question.courseInstance) {
      this.setState({
        didGetCourseInstance: true,
      })
      this.props.dispatch(setCurCourseInstance(newProps.question.courseInstance))
      this.props.dispatch(getCourseInstance(newProps.question.courseInstance))
    }
  }

  toggleNewAnswerForm() {
    this.setState({
      showNewAnswerForm: this.state.showNewAnswerForm,
      answerBeingEdited: null,
    })
  }

  editAnswer(answer) {
    if (!this.state.showNewAnswerForm) {
      this.setState({
        showNewAnswerForm: true,
      })
    }
    this.setState({
      answerBeingEdited: answer,
    })
  }

  render() {
    const styles = getStyles()

    const questionClickable = true
    const { courseInstance, question, user } = this.props

    const answerOkayType = 'POST_ANSWER_OK'
    const answerErrorType = 'POST_ANSWER_ERR'

    let answerEls = []
    if (question.answers && question.answers.length > 0) {
      answerEls = question.answers.map(a =>
        <AnswerItem
          key={a._id}
          personWhoAnswered={a.user}
          dateAnswered={a.createDate}
          answerText={a.content}
          answer={a}
          question={question}
          user={user}
          courseInstance={courseInstance}
          onClickDelAnswer={() => this.props.dispatch(deleteAnswer(a._id, question._id))}
          onClickBestAnswer={() => this.props.dispatch(putQuestion(question._id, '', '', a._id, ''))}
          onClickApproveAnswer={() => this.props.dispatch(putQuestion(question._id, '', '', '', a._id))}
          onClickEditAnswer={() => this.editAnswer(a)}
          onClickVoteAnswer={() => this.props.dispatch(voteAnswer(a._id))}
        />

      )
    }
    const showMaterial = () => {
      browserHistory.push(`/material/${question.material}`)
    }

    let actions = [
      <FlatButton
        key="questionAnsweringButton" label="Frage Beantworten" linkButton
        onTouchTap={this.toggleNewAnswerForm} hoverColor="#26A65B" style={styles.buttonStyle}
        rippleColor="#ffffff" icon={<Reply />}
      />,
    ]
    const showMaterialAction = (
      <FlatButton
        key="go to related material view" label="Material anzeigen" linkButton
        onTouchTap={showMaterial} hoverColor="#26A65B"
        style={styles.buttonStyle} rippleColor="#ffffff" icon={<Pageview />}
      />
    )
    if (question.material) actions.push(showMaterialAction)

    if (question.user && user._id === question.user._id) {
      actions.push(
        <FlatButton
          key="questionEditingButton" label="Frage bearbeiten" linkButton
          hoverColor="#26A65B" style={styles.buttonStyle} rippleColor="#ffffff"
        />
      )
      actions.push(
        <FlatButton
          key="questionDeletingButton" label="Frage löschen" linkButton
          onTouchTap={() => { this.props.dispatch(deleteQuestion(question._id)); browserHistory.goBack() }}
          hoverColor="#26A65B" style={styles.buttonStyle} rippleColor="#ffffff"
        />
      )
    }

    let newAnswerForm
    if (this.state.showNewAnswerForm) {
      if (this.state.answerBeingEdited) {
        newAnswerForm = (
          <NewAnswerForm
            initialValues={this.state.answerBeingEdited}
            onSubmit={(data) => {
              this.props.dispatch(putAnswer(this.state.answerBeingEdited._id, data.content)); this.toggleNewAnswerForm()
            }}
            onCancel={() => this.toggleNewAnswerForm()}
          />
        )
      } else {
        newAnswerForm = (
          <NewAnswerForm
            onSubmit={(data) => {
              this.props.dispatch(postAnswer(question._id, data.content)); this.toggleNewAnswerForm()
            }}
            onCancel={() => this.toggleNewAnswerForm()}
          />
        )
      }
    }

    return (
      <div>
        <div style={styles.dashboardRoot}>
          <DashboardToolBar />
          <CourseInfoBar
            courseTitle={courseInstance.course ? courseInstance.course.name : ''}
            courseUrl={`/course/${courseInstance._id}`}
            semesterInstance={
              courseInstance.semester ? `${courseInstance.semester.term} ${courseInstance.semester.year}` : ''
            }
            teachersName={courseInstance.prof ? `${courseInstance.prof.firstname} ${courseInstance.prof.lastname}` : ''}
            shortInformation={courseInstance.description}
            participantsNum={courseInstance.participantsNum}
          />
          <Grid>
            <br />
            <Row>
              <Col xs={24} md={12}>
                <Card style={styles.cardStyle}>
                  <QuestionItem
                    key={question._id}
                    listItemClickable={questionClickable}
                    questionStatement={question.title}
                    datePosted={question.createDate}
                    questionUrl={`/question/${question._id}`}
                    currentLikes={question.votes ? question.votes.length : null}
                    onClickVote={() => this.props.dispatch(voteQuestion(question._id))}
                    postedBy={question.user ? question.user.lastname : ''}
                  />
                  <CardText style={styles.textStyle}>
                    {question.description}
                  </CardText>
                  <CardActions style={styles.actionPadding}>
                    {actions}
                  </CardActions>
                </Card>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col xs={24} md={12}>
                {newAnswerForm}
                <br />
                {answerEls}
              </Col>
            </Row>
          </Grid>
          <br />
        </div>
        <Feedback errorType={answerErrorType} okayType={answerOkayType} />

        <div style={styles.footer} >
          <FooterLanding />
        </div>
      </div>
    )
  }
}

function getStyles() {
  return {
    dashboardRoot: {
      backgroundColor: '#FBF6EC',
      minHeight: '100vh',
    },
    footer: {
      fontSize: '20px',
      backgroundColor: 'white',
      color: 'darkslategray',
      height: '10%',
    },
    textStyle: {
      paddingLeft: '70px',
      paddingRight: '70px',
    },
    actionPadding: {
      paddingLeft: '52px',
      backgroundColor: '#446CB3',
      color: '#ffffff',
    },
    buttonStyle: {
      color: '#ffffff',
    },
    cardStyle: {
      borderStyle: 'solid',
      borderWidth: '2px',
      borderColor: '#446CB3',
    },
  }
}

const mapStateToProps = (state) => ({
  user: selectors.getUser(state),
  courseInstance: selectors.getCurCourseInstance(state),
  curCourseInstanceId: selectors.getCurCourseInstanceId(state),
  question: selectors.getCurQuestion(state),
})

Question.propTypes = propTypes

export default connect(
  mapStateToProps
)(Radium(Question))
