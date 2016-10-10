import React, { PropTypes } from 'react'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import FriendsDisplayComponent from '../../components/FriendsDisplayComponent/FriendsDisplayComponent'
import CourseCard from '../../components/CourseCard/CourseCard'
import AddCourse from '../../containers/DashboardTitleContainer'

const propTypes = {
  role: PropTypes.string,
  courseInstances: PropTypes.array,
  location: PropTypes.object,
  connects: PropTypes.array,
  onClickFollow: PropTypes.func.isRequired,
}

function LeftSectionTeacherDashboard({ role, courseInstances, location, connects, onClickFollow }) {
  const pathConnects = '/connects'
  const pathCourses = '/dashboard'
  const studentRole = 'Student'
  const teacherRole = 'Prof'
  let displayCards
  let display
  let filterBar
  let addCourseButton

  if (location.pathname === pathCourses) {
    displayCards = courseInstances.map(ci =>
      <CourseCard
        key={ci._id}
        titleCourse={ci.course ? ci.course.name : ''}
        universityCourse={ci.course ? ci.course.university.name : ''}
        courseTeacher={ci.prof ? `${ci.prof.firstname} ${ci.prof.lastname}` : ''}
        courseUrl={`/course/${ci._id}`}
        following={ci.following}
        onClickFollow={() => onClickFollow(ci._id)}
      />
    )

    if (role === studentRole) {
      display = [
        displayCards,
      ]
    } else if (role === teacherRole) {
      // filterBar = <AddCourse title="Courses" whichFilter="courseFilter" /> ;
      addCourseButton = <AddCourse key="addCourse" />

      display = [
        addCourseButton,
        displayCards,
      ]
    }
  } else if (location.pathname === pathConnects) {
    displayCards = connects.map(following =>
      <FriendsDisplayComponent
        key={following._id}
        fullName={`${following.firstname} ${following.lastname}`}
        discipline={following.program.name}
        universityName={following.university.name}
      />
    )

    display = [
      displayCards,
    ]
  }

  return (
    <div>
      <Grid>
        <Row>
          <Col>
            {filterBar}
          </Col>
        </Row>
      </Grid>
      {display}
    </div>
    )
}

LeftSectionTeacherDashboard.propTypes = propTypes

export default LeftSectionTeacherDashboard
