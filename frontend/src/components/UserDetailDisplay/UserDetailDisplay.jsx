import React, { PropTypes } from 'react'
import Radium from 'radium'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import Divider from 'material-ui/Divider'

import Christoph from './christoph.png'

import ActivityOfUser from '../../components/ActivityOfUser/ActivityOfUser'

const propTypes = {
  nameInitialForAvatar: PropTypes.string,
  fullName: PropTypes.string,
  universityName: PropTypes.string,
  programEnrolled: PropTypes.stirng,
  socialConnects: PropTypes.array,
}

const defaultProps = {
  nameInitialForAvatar: 'M',
  fullName: 'Christoph Johannes Walpert',
  universityName: 'RWTH Aachen',
  programEnrolled: 'Medieninformatik',
  socialConnects: ['Lars', 'Rohan'],
}

function UserDetailDisplay({ fullName, universityName, programEnrolled, socialConnects }) {
  const styles = getStyles()
  const uniField = 'Hochschule'
  const programField = 'Program'
  const connectsField = 'Connects'

  return (
    <div>
      <Grid className="container-fluid">
        <Row>
          <Col xs={3} md={2}>
            <Avatar src={Christoph} size={200} />
          </Col>
          <Col xs={5} md={4}>
            <div style={styles.userName}>
              <h2>{fullName}</h2>
            </div>
            <Col xs={4}>
              <div style={styles.userMetadata}>
                <br />
                <h5><strong>{uniField}</strong></h5>
                <h5><strong>{programField}</strong></h5>
                <h5><strong>{connectsField}</strong></h5>
                <br />
              </div>
            </Col>
            <Col xs={8}>
              <div style={styles.userMetadata}>
                <br />
                <h5>{universityName}</h5>
                <h5>{programEnrolled}</h5>
                {socialConnects.map((c) =>
                  <Avatar
                    style={styles.connectStyle}
                  >
                    {c.charAt(0)}
                  </Avatar>)}
                <br />
              </div>
            </Col>
          </Col>
          <Col xs={1} md={1}>
            <FlatButton
              primary={false}
              icon={<PersonAdd />}
            />
          </Col>
        </Row>
      </Grid>
      <br />
      <br />
      <br />
      <ActivityOfUser />
    </div>
    )
}

function getStyles() {
  return {
    forgotPassword: {
      display: 'table-cell',
      verticalAlign: 'middle',
    },
    userMetadata: {
      position: 'relative',
      marginLeft: '35px',
      marginTop: '-10px',
    },
    userName: {
      position: 'relative',
      marginLeft: '45px',
    },
    connectStyle: {
      marginRight: '5px',
    },
  }
}

UserDetailDisplay.propTypes = propTypes
UserDetailDisplay.defaultProps = defaultProps

export default Radium(UserDetailDisplay)
