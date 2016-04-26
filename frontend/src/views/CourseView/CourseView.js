import React from 'react'
import classes from './CourseView.scss'
import DashboardToolBar from '../../components/DashboardToolBar/DashboardToolBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import RightSectionTeacherDashboard from '../../components/RightSectionTeacherDashboard/RightSectionTeacherDashboard'

type Props = {

};
export class Course extends React.Component {
  props: Props;

  render () {
    return (
      <div className={classes.rootCourse}>
        <DashboardToolBar />
        <br/>
        <Grid className='container-fluid'>
          <Row >
            <Col xs={20} md={8}>
            </Col>
            <Col xs={4} md={4}>
              <RightSectionTeacherDashboard />
            </Col>
          </Row>
        </Grid>
        <br/>
      </div>
    )
  }
}

export default Course
