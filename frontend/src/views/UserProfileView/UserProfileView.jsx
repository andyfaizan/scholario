import React, { PropTypes } from 'react'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import ProgressChart from '../../components/ProgressChart/ProgressChart'

const propTypes = {

}

class UserProfile extends React.Component {

  render() {
    const styles = getStyles()

    return (
      <div>
        <div style={styles.rootCourse}>
          <br />
          <Grid className="container-fluid">
            <Row >
              <Col xs={16} md={8}>
                <div>
                  <h4>
                  </h4>
                  <br />
                  <br />
                  <br />
                  <br />
                  <fieldset>
                    <legend><h4>
                    </h4></legend>
                    <br />
                  </fieldset>
                </div>
                <br />
              </Col>
              <Col xs={8} md={4}>
                <br />
                <ProgressChart />
                <br/>
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

export default UserProfile
