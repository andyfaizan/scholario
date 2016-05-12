import React from 'react'
import { connect } from 'react-redux'
import classes from './MaterialPackageView.scss'
import DashboardToolBar from '../../containers/DashboardToolBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import RightSectionTeacherDashboard from '../../components/RightSectionTeacherDashboard/RightSectionTeacherDashboard'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import MaterialComponent from '../../components/MaterialComponent/MaterialComponent'

type Props = {

};
export class MaterialPackageView extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <DashboardToolBar />
        <CourseInfoBar courseTitle="Some Course" />
        <br/>
        <Grid className='container-fluid'>
          <Row >
            <Col xs={20} md={8}>
              <MaterialComponent />
            </Col>
            <Col xs={4} md={4}>
              <RightSectionTeacherDashboard questions={[]} />
            </Col>
          </Row>
        </Grid>
        <br/>
      </div>
    )
  }
}

export default MaterialPackageView
