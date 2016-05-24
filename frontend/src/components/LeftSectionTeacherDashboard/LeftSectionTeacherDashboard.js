import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import Divider from 'material-ui/lib/divider'
import FriendsDisplayComponent from '../../components/FriendsDisplayComponent/FriendsDisplayComponent'
import CourseCard from '../../components/CourseCard/CourseCard'
import AddCourseComponent from '../../components/AddCourseComponent/AddCourseComponent'
import AddCourse from '../../containers/DashboardTitleContainer'
//import DashboardTitleComponent from '../../components/DashboardTitleComponent/DashboardTitleComponent'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import { Router, Route, Link } from 'react-router'

type Props = {
  role: React.PropTypes.string,
  courseInstances: React.PropTypes.array,
  location: React.PropTypes.object,
  connects: React.PropTypes.array,
  onClickFollow: React.PropTypes.func.isRequired,
}

export class LeftSectionTeacherDashboard extends React.Component {
  props: Props

  render () {
    //paths to routes on dashboard view for material and connects
    const pathConnects = '/connects' ;
    const pathCourses = '/dashboard';

    const studentRole = 'Student'
    const teacherRole = 'Prof'

    //dummy dataSource for Connects and Courses
    const filterDataSource = [
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue',
      'Purple',
      'Black',
      'White',
    ];

    var displayCards;
    var display;
    var filterBar;
    var addCourseButton


    if (this.props.location.pathname === pathCourses) {
        //display cards filled up for courses....
        displayCards = this.props.courseInstances.map(ci =>
          <CourseCard
            key={ci._id}
            titleCourse={ci.course ? ci.course.name : ''}
            universityCourse={ci.course ? ci.course.university.name : ''}
            courseTeacher={ci.prof ? `${ci.prof.firstname} ${ci.prof.lastname}` : ''}
            courseUrl={`/course/${ci._id}`}
            following={ci.following}
            onClickFollow={() => this.props.onClickFollow(ci._id)}
          />
        )

        if (this.props.role === studentRole) {
          display = [
            displayCards
          ]
        } else if (this.props.role === teacherRole) {

          filterBar = <AddCourse title="Courses" whichFilter="courseFilter" /> ;
          addCourseButton = <AddCourseComponent />

          display = [
             addCourseButton,
             displayCards,
          ]
        }
    } else if (this.props.location.pathname === pathConnects) {
      displayCards = this.props.connects.map(following =>
        <FriendsDisplayComponent
          key={following._id}
          fullName={`${following.firstname} ${following.lastname}`}
          discipline={following.program}
          universityName={following.university}
        />
      )

      display = [
         displayCards
      ]
    } else {
      console.log('path to eroneous route') ;
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
}

export default LeftSectionTeacherDashboard
