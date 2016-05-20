import React from 'react'
import { connect } from 'react-redux'
import DashboardToolBar from '../../containers/DashboardToolBar'
import TeacherProfileBar from '../../components/TeacherProfileBar/TeacherProfileBar'
import LeftSectionTeacherDashboard from '../../components/LeftSectionTeacherDashboard/LeftSectionTeacherDashboard'
import Questions from '../../containers/Questions'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import classes from './DashboardView.scss'
import MyRawTheme from '../../themes/mainTheme'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import * as selectors from '../../redux/selectors'
import { getUser } from '../../redux/modules/user'
import { getRecommendedCourseInstances, followCourse } from '../../redux/modules/course-instance'
import { getQuestions } from '../../redux/modules/question'


class DashboardView extends React.Component {

 //  static childContextTypes = {
 //   muiTheme: React.PropTypes.object
 // }

 //  getChildContext() {
 //    return {
 //      muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
 //    };
 //  }

  componentDidMount () {
    if (this.props.user) {
      if (!this.props.user.freshLogin) {
        this.props.getUser()
      } else {
        if (this.props.user.courseInstances.length === 0) {
          console.log('here')
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
      console.log('here2')
      this.props.getRecommendedCourseInstances('', this.props.user.program)
    }
  }

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
            <Col xs={16} md={8}>
              <LeftSectionTeacherDashboard
                role={this.props.user.role}
                courseInstances={this.props.courseInstances}
                connects={this.props.connects}
                location={this.props.location}
                onClickFollow={(cid) => this.props.followCourse(this.props.user._id, cid)}
              />
            </Col>
            <Col xs={8} md={4}>
              <Questions questions={this.props.questions} location={this.props.location}/>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  var courseInstances = selectors.getUserCourseInstances(state)
  if (courseInstances.length === 0) {
    courseInstances = selectors.getRecommendedCourseInstances(state)
  }
  return {
    user: selectors.getUser(state),
    userUniversity: selectors.getUserUniversity(state),
    userProgram: selectors.getUserProgram(state),
    courseInstances,
    questions: selectors.getUserQuestions(state),
    connects: selectors.getUserFollowings(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardView)
