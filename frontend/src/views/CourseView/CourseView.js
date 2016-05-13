import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './CourseView.scss'
import DashboardToolBar from '../../containers/DashboardToolBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import RightSectionTeacherDashboard from '../../components/RightSectionTeacherDashboard/RightSectionTeacherDashboard'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import MaterialComponent from '../../components/MaterialComponent/MaterialComponent'
import IndependentPackage from '../../components/IndependentPackage/IndependentPackage'
import { getCourseInstance } from '../../redux/modules/course-instance'
import * as selectors from '../../redux/selectors'

type Props = {
  courseName: string,
  courseId: string

};

export class Course extends React.Component {

  static propTypes = {
    courseName: PropTypes.string,
    courseId: PropTypes.string,
  };

  componentDidMount() {
    const cid = this.props.params.id
    this.props.dispatch(getCourseInstance(cid))
  }

  render () {

    // var displayMaterialCards = this.props.courses.map(course =>
    //         <CourseCard
    //           key={course._id}
    //           titleCourse={course.name}
    //           universityCourse={course.university.name}
    //           courseTeacher={`${course.prof.firstname} ${course.prof.lastname}`}
    //         />
    //       ) ;

    return (
      <div className={classes.rootCourse}>
        <DashboardToolBar />
        <CourseInfoBar courseTitle={this.props.courseInstance.course.name} />
        <br/>
        <Grid className='container-fluid'>
          <Row >
            <Col xs={20} md={8}>
              <div>
                <MaterialComponent materialTitle="Dynamics & Motions" materialNotifications={10} 
                  dateUploaded="20/06/2009" semesterInstance="2009" keywords={["Blue","Green"]}
                />
                <IndependentPackage materialTitle="Dynamics & Motions" materialNotifications={10} 
                  dateUploaded="20/06/2009" semesterInstance="2009" />
              </div>
            </Col>
            <Col xs={4} md={4}>
              <RightSectionTeacherDashboard questions={this.props.questions} />
            </Col>
          </Row>
        </Grid>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //user: selectors.getUser(state),
    courseInstance: selectors.getCurrentCourseInstance(state, ownProps.params.id),
    //userUniversity: getUserUniversity(state),
    //userProgram: getUserProgram(state),
    //courses: getUserCourses(state),
    questions: selectors.getUserQuestions(state),
  }
}


export default connect(
  mapStateToProps
)(Course)
