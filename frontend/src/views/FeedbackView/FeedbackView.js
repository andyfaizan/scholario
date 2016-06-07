import React from 'react'
import { connect } from 'react-redux'
import TeacherProfileBar from '../../components/TeacherProfileBar/TeacherProfileBar'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import SetForgotPasswordForm from '../../forms/SetForgotPasswordForm/SetForgotPasswordForm'
import classes from './FeedbackView.scss'
import Divider from 'material-ui/Divider'
import DashboardToolBar from '../../containers/DashboardToolBar'
import * as selectors from '../../redux/selectors'
import { getUser } from '../../redux/modules/user'
import { getRecommendedCourseInstances, followCourse,
  FOLLOW_COURSE_INSTANCE_OK, FOLLOW_COURSE_INSTANCE_ERR } from '../../redux/modules/course-instance'
import { getQuestions } from '../../redux/modules/question'
import Feedback from '../../containers/Feedback'
import { putUser } from '../../redux/modules/user'

type Props = {

};
export class FeedbackView extends React.Component {
  props: Props;

  componentDidMount () {
    if (this.props.userMetadata) {
      if (!this.props.userMetadata.fetchedData) {
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
  	const { user, userUniversity, userProgram } = this.props

    return (
      <div>
      	<div  className={classes.root} >
      	  <DashboardToolBar />
      	  <TeacherProfileBar
          firstNameUser={user ? user.firstname : ''}
          lastNameUser={user ? user.lastname : ''}
          bio={user ? user.bio : ''}
          universityName={userUniversity ? userUniversity.name : ''}
          programeName={userProgram ? userProgram.name : ''}
          onChangePassword={(data) => this.props.onChangePassword(data.password)}
        />
        <br/>
      	</div>
	    <div className={classes.footer}>
	        <FooterLanding />
	    </div>
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
    userMetadata: selectors.getUserMetadata(state),
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
    onChangePassword: (password) => {
      dispatch(putUser('', '', '', password))
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedbackView)

