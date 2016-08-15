import React from 'react'
import Radium from 'radium'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'

import VerticalBarChart from '../../components/VerticalBarChart/VerticalBarChart'
import UserDetailDisplay from '../../components/UserDetailDisplay/UserDetailDisplay'
import FeedItem from '../../components/FeedItem/FeedItem'
import TopAnswersBox from '../../containers/TopAnswersBox'
import TopUploadsBox from '../../containers/TopUploadsBox'

// const propTypes = {

// }

const sampleData = {
  topUploadStats: [
    {
      amount: '12',
      content: 'Notes on Probability Theory',
    },
    {
      amount: '45',
      content: 'Case study on KPMG',
    },
    {
      amount: '32',
      content: 'Harvard Video Lecture',
    },
    {
      amount: '3',
      content: 'Economics flowchart',
    },
    {
      amount: '67',
      content: 'Essay on the Great Depression',
    },
  ],
}

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
              <FeedItem />
              <FeedItem />
              <FeedItem />
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
