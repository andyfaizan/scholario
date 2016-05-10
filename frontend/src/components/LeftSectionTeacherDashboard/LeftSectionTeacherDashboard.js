import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import Divider from 'material-ui/lib/divider'
import FriendsDisplayComponent from '../../components/FriendsDisplayComponent/FriendsDisplayComponent'
import CourseCard from '../../components/CourseCard/CourseCard'
import AddCourse from '../../containers/DashboardTitleContainer'
import DashboardTitleComponent from '../../components/DashboardTitleComponent/DashboardTitleComponent'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import { Router, Route, Link } from 'react-router'

type Props = {
  courses: React.PropTypes.array,
  location: React.PropTypes.object,
  connects: React.PropTypes.array
};

export class LeftSectionTeacherDashboard extends React.Component {
  props: Props;

  componentDidMount() {
    console.log(this.props.location.pathname);

  }

  render () {
    
    //paths to routes on dashboard view for material and connects
    const pathConnects = '/connects' ;
    const pathCourses = '/dashboard';
 
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
    console.log(this.props.location)
    if (this.props.location.pathname === pathCourses) {
        //display cards filled up for courses....
        displayCards = this.props.courses.map(course =>
            <CourseCard
              key={course._id}
              titleCourse={course.name}
              universityCourse={course.university.name}
              courseTeacher={`${course.prof.firstname} ${course.prof.lastname}`}
              courseUrl={`/course/${course._id}`}
            />
          ) ;

        display = [

           displayCards
        ] ;

    } else if (this.props.location.pathname === pathConnects) {
      displayCards = [<FriendsDisplayComponent
        fullName="Andy Ainuddin"
        discipline="Chemie"
        universityName="Uni Bonn"
      />]

      display = [
         displayCards
      ] ;
    } else {
      console.log('path to eroneous route') ;
    }

    return (
      <div>
          <Grid>
            <Row>
              <Col>
              <AddCourse title="Courses" whichFilter="courseFilter" />
              </Col>
            </Row>
          </Grid>
         

          {display}



      </div>
    )
  }
}

export default LeftSectionTeacherDashboard
