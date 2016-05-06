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
import { getCourse } from '../../redux/modules/course'
import { getUser, getUserUniversity, getUserProgram,
  getUserCourses, getUserQuestions } from '../../redux/selectors'


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
    this.props.dispatch(getCourse(cid))
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
        <CourseInfoBar />
        <br/>
        <Grid className='container-fluid'>
          <Row >
            <Col xs={20} md={8}>
              <MaterialComponent />
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

const mapStateToProps = (state) => {
  return {
     user: getUser(state),
    userUniversity: getUserUniversity(state),
    userProgram: getUserProgram(state),
    courses: getUserCourses(state),
    questions: getUserQuestions(state),
  }
}


export default connect(
  mapStateToProps
)(Course)
