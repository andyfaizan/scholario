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

  componentDidMount() {
    console.log(this.props.location)
  }

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
          {
                   <CourseCard
              key="22"
              titleCourse="Computer Graphics"
              universityCourse="RWTH Aachen"
              courseTeacher="Prof Rey Bakcer"
              courseUrl={`course/22`}
            /> 
          }
 

          {this.props.courses.map(course =>
            <CourseCard
              key={course._id}
              titleCourse={course.name}
              universityCourse={course.university.name}
              courseTeacher={`${course.prof.firstname} ${course.prof.lastname}`}
              courseUrl={`course/${course._id}`}
            />
          )}

           

      </div>
    )
  }
}

export default LeftSectionTeacherDashboard
