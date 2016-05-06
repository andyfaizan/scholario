import React from 'react'
import { connect } from 'react-redux'
import DashboardToolBar from '../../containers/DashboardToolBar'
import TeacherProfileBar from '../../components/TeacherProfileBar/TeacherProfileBar'
import LeftSectionTeacherDashboard from '../../components/LeftSectionTeacherDashboard/LeftSectionTeacherDashboard'
import RightSectionTeacherDashboard from '../../components/RightSectionTeacherDashboard/RightSectionTeacherDashboard'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import classes from './DashboardView.scss'
import MyRawTheme from '../../themes/mainTheme'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import { getUser, getUserUniversity, getUserProgram,
  getUserCourses, getUserQuestions } from '../../redux/selectors'


class DashboardView extends React.Component {
  
 //  static childContextTypes = {
 //   muiTheme: React.PropTypes.object
 // }

 //  getChildContext() {
 //    return {
 //      muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
 //    };
 //  }

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
              <RightSectionTeacherDashboard questions={this.props.questions} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: getUser(state),
    userUniversity: getUserUniversity(state),
    userProgram: getUserProgram(state),
    courses: getUserCourses(state),
    questions: getUserQuestions(state),
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
