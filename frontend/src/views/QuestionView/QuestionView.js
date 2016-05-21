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
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import classes from './QuestionView.scss'


type Props = {

};

export class Question extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      didGetCourseInstance: false,
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

  render () {
    //question item const display
    const questionClickable = true
    const { courseInstance, question } = this.props

    var answerEls = []
    if (question.answers && question.answers.length > 0) {
      answerEls = question.answers.map(a =>
        <AnswerItem
          key={a._id}
          personWhoAnswered={a.user ? `${a.user.firstname} ${a.user.lastname}` : ''}
          dateAnswered={a.createDate}
          answerText={a.content}
        />
      )
    }

    return (
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
                      listItemClickable={questionClickable}
                      questionStatement={question.title}
                      datePosted={question.createDate}
                      questionUrl={`/question/${question._id}`}
                      currentLikes={question.votes ? question.votes.length : null}
                      onClickVote={() => this.props.dispatch(voteQuestion(question._id))}
                    />
                    <CardText>
                      {question.description}
                    </CardText>
                  </Card>
                </Col>
		      		</Row>
		      		<br/>
		      		<br/>
		      		<Row>
		      			<Col xs={24} md={12}>
                  {answerEls}
		      			</Col>
		      		</Row>
		      	</Grid>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    courseInstance: selectors.getCurCourseInstance(state),
    curCourseInstanceId: selectors.getCurCourseInstanceId(state),
    question: selectors.getCurQuestion(state),
  }
}


export default connect(
  mapStateToProps
)(Question)
