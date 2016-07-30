import React from 'react' // { PropTypes }

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

// const propTypes = {
//
// }

class UserProfile extends React.Component {

  render() {
    return (
      <div>
        <div>
          <br />
          <Grid className="container-fluid">
            <Row >
              <Col xs={16} md={8}>
                <div>
                  <fieldset>
                    <legend>
                      <h4>
                      </h4>
                    </legend>
                    <br />
                  </fieldset>
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

export default UserProfile
