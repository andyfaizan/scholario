import React, { PropTypes } from 'react'
import Radium from 'radium'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import ProgressChart from '../../components/ProgressChart/ProgressChart'
import UserDetailDisplay from '../../components/UserDetailDisplay/UserDetailDisplay'

const propTypes = {

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
                <h4>
                </h4>
                <br />
                <br />
                <br />
                <br />
              </div>
              <br />
            </Col>
            <Col xs={8} md={4}>
              <Card >
                <ProgressChart />
              </Card>
              <br />
              <ProgressChart />
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

UserProfile.propTypes = propTypes

export default Radium(UserProfile)
