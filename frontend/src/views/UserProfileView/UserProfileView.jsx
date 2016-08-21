import React from 'react'
import Radium from 'radium'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'

import VerticalBarChart from '../../components/VerticalBarChart/VerticalBarChart'
import UserDetailDisplay from '../../components/UserDetailDisplay/UserDetailDisplay'
import TopAnswersBox from '../../containers/TopAnswersBox'
import TopUploadsBox from '../../containers/TopUploadsBox'
import UploadActivityNews from '../../containers/UploadActivityNews'
import CourseActivityNews from '../../containers/CourseActivityNews'
import AnswerActivityNews from '../../containers/AnswerActivityNews'

// const propTypes = {

// }

function UserProfile() {
  const styles = getStyles()

  return (
    <div>
      <div style={styles.rootCourse}>
        <br />
        <br />
        <br />
        <Grid className="container-fluid">
          <Row >
            <Col xs={16} md={8}>
              <div>
                <Card >
                  <CardText >
                    <UserDetailDisplay />
                  </CardText>
                </Card>
                <br />
                <br />
              </div>
            </Col>
            <Col xs={8} md={4}>
              <Card >
                <VerticalBarChart />
              </Card>
              <br />
            </Col>
          </Row>
          <Row >
            <Col xs={16} md={8}>
              <UploadActivityNews />
              <CourseActivityNews />
              <AnswerActivityNews />
            </Col>
            <Col xs={8} md={4}>
              <br />
              <TopAnswersBox />
              <br />
              <TopUploadsBox />
            </Col>
          </Row>
        </Grid>
        <br />
        <br />
      </div>
    </div>
    )
}

function getStyles() {
  return {
    rootCourse: {
      backgroundColor: '#FBF6EC',
      minHeight: '100vh',
    },
    legend: {
      textAlign: 'center',
      color: '#26A65B',
      fontWeight: 'bolder',
    },
    fieldset: {
      borderColor: '#26A65B',
    },
  }
}

// UserProfile.propTypes = propTypes

export default Radium(UserProfile)
