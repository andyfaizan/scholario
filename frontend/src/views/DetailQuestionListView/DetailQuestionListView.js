import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as selectors from '../../redux/selectors'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import { getQuestions, voteQuestion } from '../../redux/modules/question'
import DashboardToolBar from '../../containers/DashboardToolBar'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import QuestionToolBar from '../../components/QuestionToolBar/QuestionToolBar'
import QuestionListInDetailsView from '../../components/QuestionListInDetailsView/QuestionListInDetailsView'
import classes from './DetailQuestionListView.scss'
import FooterLanding from '../../components/FooterLanding/FooterLanding'

type Props = {

}

export class DetailQuestionList extends React.Component {
  props: Props

  constructor(props) {
    super(props)
    this.state = {
      didGetCourseInstance: false,
    }
  }

  componentDidMount() {
    const cid = this.props.params.id
    if (!this.props.curCourseInstanceId) {
      this.props.dispatch(setCurCourseInstance(cid))
      this.props.dispatch(getCourseInstance(cid))
    }
    this.props.dispatch(getQuestions(cid))
  }

  render () {

    const { courseInstance, questions } = this.props

    var questionEls = questions.map(q =>
      <QuestionListInDetailsView
        key={q._id}
        questionId={q._id}
        questionStatement={q.title}
        listItemClickable={false}
        datePosted={q.createDate}
        questionURL={`/question/${q._id}`}
        currentLikes={q.votes.length}
        onClickVote={(qid) => this.props.dispatch(voteQuestion(qid))}
      />
    )
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
		      				<QuestionToolBar />
		      			</Col>
		      		</Row>
		      		<br/>
		      		<br/>
		      		<Row>
		      			<Col xs={24} md={12}>
                  {questionEls}
		      			</Col>
		      		</Row>
		      	</Grid>
            <FooterLanding />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courseInstance: selectors.getCurCourseInstance(state),
    curCourseInstanceId: selectors.getCurCourseInstanceId(state),
    questions: selectors.getCurCourseInstanceQuestions(state),
  }
}

export default connect(
  mapStateToProps
)(DetailQuestionList)
