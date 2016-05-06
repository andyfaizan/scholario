import React from 'react'
import DashboardToolBar from '../../containers/DashboardToolBar'
// import CourseInformation from '../../containers/CourseInformation'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import InfoBox from '../../containers/InfoBox'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import MaterialPanel from '../../containers/MaterialPanel'
import MaterialsList from '../../containers/MaterialsList'
import QuestionItem from '../../components/QuestionItem/QuestionItem'
import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'
import Subheader from 'material-ui/lib/Subheader'
import Material from '../../containers/Material'
import IFrame from '../../components/IFrame/IFrame'
import FullMaterial from '../../components/FullMaterial/FullMaterial'

type Props = {

};

export class MaterialView extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <DashboardToolBar />
        <FullMaterial />
        {/*
          <CourseInfoBar />
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
              <MaterialPanel name="Directory Structure">
                <List>
                  <Material id={0}/>
                </List>
              </MaterialPanel>
            </Col>
            <Col md={6}>
              <MaterialPanel name="Material Preview">
                <IFrame src="msxnet.org/orwell/print/animal_farm.pdf"/>
              </MaterialPanel>
            </Col>
            <Col md={3}>
              <MaterialPanel name="Questions">
                <List>
                  <Subheader>Popular Questions</Subheader>
                  <Divider />
                  <QuestionItem questionStatement="What is Nuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
                  <QuestionItem questionStatement="What is Nuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
                  <QuestionItem questionStatement="What is Nuclear Physics ?" datePosted ="Jan 17, 2014"  questionUrl="" />
                </List>
              </MaterialPanel>
            </Col>
          </Row>
        </Grid>*/}
      </div>
    )
  }
}

export default MaterialView
