import React from 'react'
import DashboardToolBar from '../../containers/DashboardToolBar'
import CourseInformation from '../../containers/CourseInformation'
import InfoBox from '../../containers/InfoBox'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import MaterialPanel from '../../components/MaterialPanel/MaterialPanel'
import MaterialsList from '../../containers/MaterialsList'
import QuestionItem from '../../components/QuestionItem/QuestionItem'
import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'
import Subheader from 'material-ui/lib/Subheader'

type Props = {

};

export class Material extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <DashboardToolBar />
        <CourseInformation course="Physics"/>
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
          <Row>
            <Col md={3}>
              <MaterialPanel>
                <MaterialsList />
              </MaterialPanel>
            </Col>
            <Col md={6}>
              <MaterialPanel />
            </Col>
            <Col md={3}>
              <MaterialPanel>
                <List>
                  <Subheader>Popular Questions</Subheader>
                  <Divider />
                  <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
                  <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
                  <QuestionItem questionStatement="What is Neuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
                </List>
              </MaterialPanel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Material
