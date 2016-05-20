import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../redux/selectors'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import { getQuestions } from '../../redux/modules/question'
import DashboardToolBar from '../../containers/DashboardToolBar'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import QuestionToolBar from '../../components/QuestionToolBar/QuestionToolBar'
import QuestionListInDetailsView from '../../components/QuestionListInDetailsView/QuestionListInDetailsView'
import classes from './DetailQuestionListView.scss'

type Props = {

};

export class DetailQuestionList extends React.Component {
  props: Props;

  componentDidMount() {
    const cid = this.props.params.id
    this.props.dispatch(setCurCourseInstance(cid))
    this.props.dispatch(getCourseInstance(cid))
    this.props.dispatch(getQuestions(cid))
  }

  render () {

  	    const { courseInstance } = this.props

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
		      				<QuestionListInDetailsView />
		      			</Col>
		      		</Row>
		      	</Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
   courseInstance: selectors.getCurCourseInstance(state),
    questions: selectors.getCurCourseInstanceQuestions(state),
  }
}

export default connect(
  mapStateToProps
  )(DetailQuestionList)