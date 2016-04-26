import React from 'react'
import DashboardToolBar from '../../containers/DashboardToolBar'
import TeacherProfileBar from '../../components/TeacherProfileBar/TeacherProfileBar'
import LeftSectionTeacherDashboard from '../../components/LeftSectionTeacherDashboard/LeftSectionTeacherDashboard'
import RightSectionTeacherDashboard from '../../components/RightSectionTeacherDashboard/RightSectionTeacherDashboard'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import classes from './DashboardView.scss'

export class DashboardView extends React.Component {

  render () {
    return (
      <div className={classes.dashboardRoot} >
        <DashboardToolBar />
        <TeacherProfileBar firstNameUser="Prof. Jan" lastNameUser="Brochers" universityName="RWTH Aachen" programeName="Media Informatics" />
        <br/>
        <Grid className='container-fluid'>
          <Row >
            <Col xs={20} md={8}>
              <LeftSectionTeacherDashboard />
            </Col>
            <Col xs={4} md={4}>
              <RightSectionTeacherDashboard />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default DashboardView
