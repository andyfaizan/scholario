import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import TeacherProfileBar from '../../containers/TeacherProfileBar'
import LeftSectionTeacherDashboard from '../../components/LeftSectionTeacherDashboard/LeftSectionTeacherDashboard'
import * as selectors from '../../redux/selectors'
import { getUser, requestLogin } from '../../redux/modules/user'
import { getRecommendedCourseInstances, followCourse,
  FOLLOW_COURSE_INSTANCE_OK, FOLLOW_COURSE_INSTANCE_ERR } from '../../redux/modules/course-instance'
import { getQuestions } from '../../redux/modules/question'
import Feedback from '../../containers/Feedback'


const propTypes = {
  user: PropTypes.object,
  userMetadata: PropTypes.object,
  userUniversity: PropTypes.object,
  userProgram: PropTypes.object,
  courseInstances: PropTypes.array,
  questions: PropTypes.array,
  connects: PropTypes.array,
  location: PropTypes.object,
  onSubmit: PropTypes.func,
  getUser: PropTypes.func,
  getRecommendedCourseInstances: PropTypes.func,
  followCourse: PropTypes.func,
  getQuestions: PropTypes.func,
}

class DashboardView extends React.Component {
  componentDidMount() {
    if (this.props.userMetadata) {
      if (!this.props.userMetadata.fetchedData) {
        this.props.getUser()
      } else {
        if (this.props.user.courseInstances.length === 0) {
          this.props.getRecommendedCourseInstances('', this.props.user.program)
        }
      }
      this.props.getQuestions()
    }
  }

  componentWillReceiveProps(nextProps) {
    // TODO
    if (this.props.courseInstances.length === 0 &&
        nextProps.courseInstances.length === 0) {
      this.props.getRecommendedCourseInstances('', this.props.user.program)
    }
  }

  render() {
    const styles = getStyles()
    const { user, userUniversity, userProgram } = this.props

    return (
      <div>
        <div style={styles.dashboardRoot} >
          <TeacherProfileBar
            firstNameUser={user ? user.firstname : ''}
            lastNameUser={user ? user.lastname : ''}
            bio={user ? user.bio : ''}
            universityName={userUniversity ? userUniversity.name : ''}
            programeName={userProgram ? userProgram.name : ''}
          />
          <br />
          <Grid className="container-fluid">
            <Row >
              <Col xs={24} md={12}>
                <LeftSectionTeacherDashboard
                  role={user ? user.role : ''}
                  courseInstances={this.props.courseInstances}
                  connects={this.props.connects}
                  location={this.props.location}
                  onClickFollow={(cid) => this.props.followCourse(this.props.user._id, cid)}
                />
              </Col>
            </Row>
          </Grid>
          <Feedback
            errorType={FOLLOW_COURSE_INSTANCE_ERR}
            okayType={FOLLOW_COURSE_INSTANCE_OK}
            message="Kurs gefolgt! :)"
          />
        </div>
      </div>
    )
  }
}

function getStyles() {
  return {
    dashboardRoot: {
      backgroundColor: '#FBF6EC',
      minHeight: '100vh',
    },
  }
}

const mapStateToProps = (state) => {
  let courseInstances = selectors.getUserCourseInstances(state)
  if (courseInstances.length === 0) {
    courseInstances = selectors.getRecommendedCourseInstances(state)
  }
  return {
    user: selectors.getUser(state),
    userMetadata: selectors.getUserMetadata(state),
    userUniversity: selectors.getUserUniversity(state),
    userProgram: selectors.getUserProgram(state),
    courseInstances,
    questions: selectors.getUserQuestions(state),
    connects: selectors.getUserFollowings(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: values => {
    dispatch(requestLogin(values.email, values.password))
  },
  getUser: () => {
    dispatch(getUser())
  },
  getRecommendedCourseInstances: (substring, program) => {
    dispatch(getRecommendedCourseInstances(substring, program))
  },
  followCourse: (uid, cid) => {
    dispatch(followCourse(uid, cid))
  },
  getQuestions: () => {
    dispatch(getQuestions())
  },
})

DashboardView.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Radium(DashboardView))
