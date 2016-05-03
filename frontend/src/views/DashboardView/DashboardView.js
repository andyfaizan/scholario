import React from 'react'
import { connect } from 'react-redux'
import DashboardToolBar from '../../containers/DashboardToolBar'
import TeacherProfileBar from '../../components/TeacherProfileBar/TeacherProfileBar'
import LeftSectionTeacherDashboard from '../../components/LeftSectionTeacherDashboard/LeftSectionTeacherDashboard'
import RightSectionTeacherDashboard from '../../components/RightSectionTeacherDashboard/RightSectionTeacherDashboard'
import { getUser, getUserUniversity } from '../../redux/selectors'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import classes from './DashboardView.scss'


class DashboardView extends React.Component {

  render () {
    return (
      <div className={classes.dashboardRoot} >
        <DashboardToolBar />
        <TeacherProfileBar
          firstNameUser={this.props.user.firstname}
          lastNameUser={this.props.user.lastname}
          universityName={this.props.userUniversity.name}
          programeName={this.props.userProgram.name}
        />
        <br/>
        <Grid className='container-fluid'>
          <Row >
            <Col xs={20} md={8}>
              <LeftSectionTeacherDashboard courses={this.props.courses} />
            </Col>
            <Col xs={4} md={4}>
              <RightSectionTeacherDashboard />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const user = state.entities.users[state.user._id]
  const userUniversity = state.entities.universities[user.university]
  const userProgram = state.entities.programs[user.program]
  const courses = user.courses.map(id => {
    var c = state.entities.courses[id]
    c.university = state.entities.universities[c.university]
    c.prof = state.entities.users[c.prof]
    return c
  })
  return {
    user: getUser(state),
    userUniversity,
    userProgram,
    courses,
    //userUniversity: getUserUniversity(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: values => {
      dispatch(requestLogin(values.email, values.password))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardView)
