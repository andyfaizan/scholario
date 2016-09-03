import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import _ from 'lodash'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import TeacherProfileBar from '../../containers/TeacherProfileBar'
import ProfileSettings from '../../components/ProfileSettings/ProfileSettings'
import PrivacySettings from '../../forms/PrivacySettings/PrivacySettings'
import NotificationSettings from '../../forms/NotificationSettings/NotificationSettings'
import MailSettings from '../../forms/MailSettings/MailSettings'
import * as selectors from '../../redux/selectors'
import { getUser, putUser, putUserEmail, putUserSocial } from '../../redux/modules/user'
import { putNotifications } from '../../redux/modules/notifications'


const propTypes = {
  user: PropTypes.object,
  userMetadata: PropTypes.object,
  userUniversity: PropTypes.object,
  userProgram: PropTypes.object,
  getUser: PropTypes.func,
  putUser: PropTypes.func,
  putUserEmail: PropTypes.func,
  putUserSocial: PropTypes.func,
  putNotifications: PropTypes.func,
  location: PropTypes.object,
}

export class SettingsView extends React.Component {
  componentDidMount() {
    if (this.props.userMetadata) {
      if (!this.props.userMetadata.fetchedData) {
        this.props.getUser()
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return !(_.isEqual(this.props.user, nextProps.user)
        && _.isEqual(this.props.userMetadata, nextProps.userMetadata)
        && _.isEqual(this.props.userUniversity, nextProps.userUniversity)
        && _.isEqual(this.props.userProgram, nextProps.userProgram)
        && _.isEqual(this.props.location, nextProps.location)
      )
  }

  render() {
    const styles = getStyles()
    const { user, userUniversity, userProgram } = this.props
    const pathProfile = '/profile-settings'
    const pathPricacy = '/privacy-settings'
    const pathNotification = '/notification-settings'
    const pathMail = '/mail-settings'
    let displayActiveForm

    if (location.pathname === pathProfile) {
      displayActiveForm = (
        <ProfileSettings
          handleProfileDataSubmit={(data) => { this.props.putUser(data) }}
          handleEmailSubmit={(data) => { this.props.putUserEmail(data) }}
          handleSocialConnectsSubmit={(data) => { this.props.putUserSocial(data) }}
        />
      )
    } else if (location.pathname === pathPricacy) {
      displayActiveForm = <PrivacySettings />
    } else if (location.pathname === pathNotification) {
      displayActiveForm = <NotificationSettings handleSubmit={(data) => { this.props.putNotifications(data) }} />
    } else if (location.pathname === pathMail) {
      displayActiveForm = <MailSettings />
    }

    return (
      <div>
        <div style={styles.rootCourse}>
          <TeacherProfileBar
            firstNameUser={user ? user.firstname : ''}
            lastNameUser={user ? user.lastname : ''}
            bio={user ? user.bio : ''}
            universityName={userUniversity ? userUniversity.name : ''}
            programeName={userProgram ? userProgram.name : ''}
          />
          <br />
          <Grid>
            <Row >
              <Col xs={24} md={12}>
                <div>
                  {displayActiveForm}
                </div>
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

const mapStateToProps = (state) => ({
  user: selectors.getUser(state),
  userMetadata: selectors.getUserMetadata(state),
  userUniversity: selectors.getUserUniversity(state),
  userProgram: selectors.getUserProgram(state),
})

const mapDispatchToProps = (dispatch) => ({
  getUser: () => {
    dispatch(getUser())
  },
  putUser: (data) => {
    dispatch(putUser(data.firstname, data.lastname, data.university, data.program, '', ''))
  },
  putUserEmail: (data) => {
    dispatch(putUserEmail(data.email, data.password))
  },
  putUserSocial: (data) => {
    dispatch(putUserSocial(data.facebook, data.linkedin, data.xing))
  },
  putNotifications: (data) => {
    dispatch(putNotifications(data.questions, data.material, data.friends, data.course, data.announcements))
  },
})

SettingsView.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Radium(SettingsView))
