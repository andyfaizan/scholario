import React from 'react'
import DashboardToolBar from '../../containers/DashboardToolBar'
import CourseInformation from '../../containers/CourseInformation'
import InfoBox from '../../containers/InfoBox'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

type Props = {

};

export class Material extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <DashboardToolBar />
        <CourseInformation />
          <Grid fluid={true}>
            <Row>
              <Col md={2}>
                <InfoBox width={200} height={100} />
              </Col>
              <Col md={2}>
                <InfoBox width={200} height={100} />
              </Col>
              <Col md={8}>
                <InfoBox width={800} height={100} />
              </Col>
            </Row>
          </Grid>
      </div>
    )
  }
}

export default Material
