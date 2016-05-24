import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as selectors from '../../redux/selectors'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import { getQuestion, setCurQuestion, voteQuestion } from '../../redux/modules/question'
import TeacherProfileBar from '../../components/TeacherProfileBar/TeacherProfileBar'
import DashboardToolBar from '../../containers/DashboardToolBar'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import QuestionItem from '../../components/QuestionItem/QuestionItem'
import QuestionToolBar from '../../components/QuestionToolBar/QuestionToolBar'
import QuestionListInDetailsView from '../../components/QuestionListInDetailsView/QuestionListInDetailsView'
import AnswerItem from '../../components/AnswerItem/AnswerItem'
import NewAnswerForm from '../../forms/NewAnswerForm/NewAnswerForm'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'
import classes from './QuestionView.scss'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import Snackbar from 'material-ui/lib/snackbar'
import { postAnswer, deleteAnswer, putAnswer, voteAnswer } from '../../redux/modules/answer'
import { deleteQuestion, putQuestion } from '../../redux/modules/question'
import { browserHistory } from '../../history'
import Feedback from '../../containers/Feedback'


type Props = {

};

export class Question extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.toggleNewAnswerForm = this.toggleNewAnswerForm.bind(this)
    this.editAnswer = this.editAnswer.bind(this)
    this.state = {
      didGetCourseInstance: false,
      showNewAnswerForm: false,
      answerBeingEdited: null,
    }
  }

  componentDidMount () {
    const qid = this.props.params.id
    //this.props.dispatch(setCurCourseInstance(cid))
    //this.props.dispatch(getCourseInstance(cid))
    this.props.dispatch(setCurQuestion(qid))
    this.props.dispatch(getQuestion(qid))
  }

  componentWillReceiveProps (newProps) {
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

  toggleNewAnswerForm (e) {
    this.setState({
      showNewAnswerForm: this.state.showNewAnswerForm ? false : true,
      answerBeingEdited: null,
    })
  }

  editAnswer (answer) {
    if (!this.state.showNewAnswerForm) {
      this.setState({
        showNewAnswerForm: true
      })
    }
    this.setState({
      answerBeingEdited: answer,
    })
  }

  render () {
    //question item const display
    const questionClickable = true
    const { courseInstance, question, user } = this.props

    const voteErrorType = 'VOTE_QUESTION_ERR'
    const voteOkayType = 'VOTE_QUESTION_OK'
    const answerOkayType = 'POST_ANSWER_OK'
    const answerErrorType = 'POST_ANSWER_ERR'

    var answerEls = []
    if (question.answers && question.answers.length > 0) {
      answerEls = question.answers.map(a =>
        <AnswerItem
          key={a._id}
          personWhoAnswered={a.user}
          dateAnswered={a.createDate.slice(0,10)}
          answerText={a.content}
          answer={a}
          user={user}
          courseInstance={courseInstance}
          onClickDelAnswer={() => this.props.dispatch(deleteAnswer(a._id, question._id))}
          onClickBestAnswer={() => this.props.dispatch(putQuestion(question._id, '', '', a._id, ''))}
          onClickApproveAnswer={() => this.props.dispatch(putQuestion(question._id, '', '', '', a._id))}
          onClickEditAnswer={(e) => this.editAnswer(a)}
          onClickVoteAnswer={() => this.props.dispatch(voteAnswer(a._id))}
        />

      )
    }

    const textStyle = {
      paddingLeft: 70,
      paddingRight: 70
    }
    const actionPadding = {
      paddingLeft: 52
    }

    var actions = [<FlatButton key='questionAnsweringButton' label="Beantworte die Frage" linkButton={true}
                    onTouchTap={this.toggleNewAnswerForm} hoverColor="#26A65B"
                  />]

    if (question.user && user._id === question.user._id) {
      actions.push(<FlatButton key='questionEditingButton' label="Frage bearbeiten" linkButton={true}
                    hoverColor="#26A65B"/>)
      actions.push(<FlatButton key='questionDeletingButton' label="Frage löschen" linkButton={true}
                    onTouchTap={() => { this.props.dispatch(deleteQuestion(question._id)); browserHistory.goBack()}} hoverColor="#26A65B"/>)
    }

    var newAnswerForm
    if (this.state.showNewAnswerForm) {
      if (this.state.answerBeingEdited) {
        newAnswerForm = <NewAnswerForm
                         initialValues={this.state.answerBeingEdited}
                         onSubmit={(data) => {
                           this.props.dispatch(putAnswer(this.state.answerBeingEdited._id, data.content)); this.toggleNewAnswerForm()
                         }} />
      } else {
        newAnswerForm = <NewAnswerForm
                         onSubmit={(data) => {
                           this.props.dispatch(postAnswer(question._id, data.content)); this.toggleNewAnswerForm()
                         }} />
      }
    }
    return (
      <div>
      <div className={classes.dashboardRoot}>
      	   <DashboardToolBar />
           <CourseInfoBar
          courseTitle={courseInstance.course ? courseInstance.course.name : ''}
          courseUrl={`/course/${courseInstance._id}`}
          semesterInstance={courseInstance.semester ? `${courseInstance.semester.term} ${courseInstance.semester.year}` : ''}
          teachersName={courseInstance.prof ? `${courseInstance.prof.firstname} ${courseInstance.prof.lastname}` : ''}
          shortInformation={courseInstance.description}
          participantsNum={courseInstance.participantsNum}
          />
		      	<Grid>
		      		<br/>
		      		<Row>
		      			<Col xs={24} md={12}>
                  <Card>
                    <QuestionItem
                      key ={question._id}
                      listItemClickable={questionClickable}
                      questionStatement={question.title}
                      datePosted={question.createDate}
                      questionUrl={`/question/${question._id}`}
                      currentLikes={question.votes ? question.votes.length : null}
                      onClickVote={() => this.props.dispatch(voteQuestion(question._id))}
                      postedBy={question.user ? question.user.lastname : '' }
                    />
                    <CardText style={textStyle}>
                      {question.description}
                    </CardText>
                    <CardActions style={actionPadding}>
                      {actions}
                    </CardActions>
                  </Card>
                </Col>
		      		</Row>
		      		<br/>
		      		<br/>
		      		<Row>
		      			<Col xs={24} md={12}>
                  {newAnswerForm}
                  <br/>
                  {answerEls}
		      			</Col>
		      		</Row>
		      	</Grid>
      <br/>
      </div>
      <Feedback errorType={answerErrorType} okayType={answerOkayType} />

      <div className ={classes.footer} >
            <FooterLanding />
      </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    user: selectors.getUser(state),
    courseInstance: selectors.getCurCourseInstance(state),
    curCourseInstanceId: selectors.getCurCourseInstanceId(state),
    question: selectors.getCurQuestion(state),
  }
}


export default connect(
  mapStateToProps
)(Question)
