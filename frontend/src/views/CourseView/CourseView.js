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

  render () {
    return (
      <div className={classes.rootCourse}>
        <DashboardToolBar />
        <CourseInfoBar courseTitle = {this.props.userProgram.name} />
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
  const user = state.entities.users[state.user._id]
  const userUniversity = state.entities.universities[user.university]
  const userProgram = state.entities.programs[user.program]
  const courses = user.courses.map(id => {
    var c = state.entities.courses[id]
    c.university = state.entities.universities[c.university]
    c.prof = state.entities.users[c.prof]
    return c
  })
  return {
    user: getUser(state),
    userUniversity,
    userProgram,
    courses,
    questions: getUserQuestions(state),
  }
}


export default connect(
  mapStateToProps
)(Course)
