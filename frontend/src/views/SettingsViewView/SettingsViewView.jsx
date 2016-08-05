import React, { PropTypes } from 'react'
import Radium from 'radium'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import ProfileSettings from '../../forms/ProfileSettings/ProfileSettings'
import PrivacySettings from '../../forms/PrivacySettings/PrivacySettings'
import NotificationSettings from '../../forms/NotificationSettings/NotificationSettings'
import MailSettings from '../../forms/MailSettings/MailSettings'

const propTypes = {
}

export class SettingsView extends React.Component {
  render() {
    const styles = getStyles()
    const pathProfile = '/profile-settings'
    const pathPricacy = '/privacy-settings'
    const pathNotification = '/notification-settings'
    const pathMail = '/mail-settings'
    let displayActiveForm

    if( location.pathname === pathProfile )
      displayActiveForm = <ProfileSettings />
    else if( location.pathname === pathPricacy )
      displayActiveForm = <PrivacySettings />
    else if( location.pathname === pathNotification )
      displayActiveForm = <NotificationSettings />
    else if( location.pathname === pathMail )
      displayActiveForm = <MailSettings />

    return (
      <div>
        <div style={styles.rootCourse}>
          <br />
          <Grid className="container-fluid">
            <Row >
              <Col xs={16} md={8}>
                <div>
                  { displayActiveForm }
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

SettingsView.propTypes = propTypes

export default Radium(SettingsView)
