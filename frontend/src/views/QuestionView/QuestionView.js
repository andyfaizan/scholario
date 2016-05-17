import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../redux/selectors'
import { getCourseInstance } from '../../redux/modules/course-instance'
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

type Props = {

};

export class Question extends React.Component {
  props: Props;

  componentDidMount() {
    const cid = this.props.params.id
    this.props.dispatch(getCourseInstance(cid))
  }

  render () {
    //question item const display
    const questionClickable = {true}
    return (
      <div>
      	   <DashboardToolBar />
           <CourseInfoBar courseTitle={this.props.courseInstance.course.name} 
                          courseUrl={`/course/${this.props.courseInstance._id}`} 
           />
		      	<Grid>
		      		<br/>
		      		<Row>
		      			<Col xs={24} md={12}>
                  <Card>
                    <QuestionItem listItemClickable={questionClickable} questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
                  </Card>
                </Col>
		      		</Row>
		      		<br/>
		      		<br/>
		      		<Row>
		      			<Col xs={24} md={12}>
                  <AnswerItem />
		      			</Col>
		      		</Row>
		      	</Grid>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    courseInstance: selectors.getCurrentCourseInstance(state, ownProps.params.id),
    questions: selectors.getUserQuestions(state),
  }
}


export default connect(
  mapStateToProps
)(Question)

