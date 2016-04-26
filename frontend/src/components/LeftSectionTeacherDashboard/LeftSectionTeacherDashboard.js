import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'
import Divider from 'material-ui/lib/divider'
import FriendsDisplayComponent from '../../components/FriendsDisplayComponent/FriendsDisplayComponent'
import CourseCard from '../../components/CourseCard/CourseCard'
import AddCourseComponent from '../../components/AddCourseComponent/AddCourseComponent'
import DashboardTitleComponent from '../../components/DashboardTitleComponent/DashboardTitleComponent'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import AutoComplete from 'material-ui/lib/auto-complete'

type Props = {

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

    var rows = 3;

    return (
      <div>
          <DashboardTitleComponent title="Courses" whichFilter="courseFilter" />
          <AddCourseComponent />
          <FriendsDisplayComponent fullName="Sina Mah." universityName="RWTH Aachen" discipline="Social Science"/>
          <CourseCard titleCourse="Physics" universityCourse="RWTH Aachen" courseTeacher="Simon" courseUrl="" notifications="2"/>
          <CourseCard titleCourse="Physics" universityCourse="Bonn" courseTeacher="Prof Manthey" courseUrl="" notifications="2"/>
          <CourseCard titleCourse="Physics" universityCourse="Bonn" courseTeacher="Prof Becker" courseUrl="" notifications="2"/>
          <CourseCard titleCourse="Physics" universityCourse="Darmstadt" courseTeacher="Dr Rapp" courseUrl="" notifications="2"/>
          <CourseCard titleCourse="Physics" universityCourse="TUM" courseTeacher="Dr Maria" courseUrl="" notifications="2"/>
          <CourseCard titleCourse="Physics" universityCourse="TUM" courseTeacher="Sara Mahsa" courseUrl="" notifications="2"/>
          <CourseCard titleCourse="Physics" universityCourse="Bonn" courseTeacher="Prof Juli" courseUrl="" notifications="2"/>
          <CourseCard titleCourse="Physics" universityCourse="Aachen" courseTeacher="Rey Becker" courseUrl="" notifications="2"/>      
      </div>
    )
  }
}

export default LeftSectionTeacherDashboard

