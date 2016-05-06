import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import Divider from 'material-ui/lib/divider'
import FriendsDisplayComponent from '../../components/FriendsDisplayComponent/FriendsDisplayComponent'
import CourseCard from '../../components/CourseCard/CourseCard'
import AddCourse from '../../containers/AddCourse'
import DashboardTitleComponent from '../../components/DashboardTitleComponent/DashboardTitleComponent'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

type Props = {
  courses: React.PropTypes.array,
};

export class LeftSectionTeacherDashboard extends React.Component {
  props: Props;

  render () {

    var floatingLabelTextState = 'Search Your Courses';
    //const filter dataSource for Connects and Courses
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
    var viewMain = 2;

    if ( viewMain == 4 )
    {


    }else
    {
      displayCards = this.props.courses.map(course =>
            <CourseCard
              key={course._id}
              titleCourse={course.name}
              universityCourse={course.university.name}
              courseTeacher={`${course.prof.firstname} ${course.prof.lastname}`}
            />
          )
    }
    return (
      <div>
          <Grid>
            <Row>
              <Col>
              <DashboardTitleComponent title="Courses" whichFilter="courseFilter" />
              </Col>
            </Row>
          </Grid>
          <AddCourse />
 
          {displayCards}


           

      </div>
    )
  }
}

export default LeftSectionTeacherDashboard
