import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import TeacherProfileBar from '../../components/TeacherProfileBar/TeacherProfileBar'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import FeedbackForm from '../../forms/FeedbackForm/FeedbackForm'
import classes from './FeedbackView.scss'
import Divider from 'material-ui/Divider'
import DashboardToolBar from '../../containers/DashboardToolBar'
import * as selectors from '../../redux/selectors'
import { getUser } from '../../redux/modules/user'
import { getRecommendedCourseInstances, followCourse,
  FOLLOW_COURSE_INSTANCE_OK, FOLLOW_COURSE_INSTANCE_ERR } from '../../redux/modules/course-instance'
import { getQuestions } from '../../redux/modules/question'
import Feedback from '../../containers/Feedback'
import { putUser, postFeedback,
  POST_FEEDBACK_OK, POST_FEEDBACK_ERR,
  PUT_USER_OK, PUT_USER_ERR,
} from '../../redux/modules/user'

type Props = {

}

export class FeedbackView extends React.Component {
  props: Props;

  componentDidMount () {
    if (this.props.userMetadata) {
      if (!this.props.userMetadata.fetchedData) {
        this.props.getUser()
      }
    }
  }

  render () {
    const { user, userUniversity, userProgram,
      putUserOk, putUserErr,
      feedbackOk, feedbackErr,
    } = this.props

    var feedbackTrue = -1
    if (feedbackOk) {
      this.props.push('/dashboard')
    }
    else if (feedbackErr) feedbackTrue = 0

    var changePasswordFeedback = -1
    if (putUserOk) changePasswordFeedback = 0
    else if (putUserErr) changePasswordFeedback = 1

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
            changePasswordFeedback={changePasswordFeedback}
          />
          <br/>
          <FeedbackForm
            feedbackTrue={feedbackTrue}
            onSubmit={(data) => this.props.postFeedback(data)}
          />
        </div>
        <div className={classes.footer}>
          <FooterLanding />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: selectors.getUser(state),
    userMetadata: selectors.getUserMetadata(state),
    userUniversity: selectors.getUserUniversity(state),
    userProgram: selectors.getUserProgram(state),
    feedbackOk: selectors.getRequest(state, POST_FEEDBACK_OK),
    feedbackErr: selectors.getRequest(state, POST_FEEDBACK_ERR),
    putUserOk: selectors.getRequest(state, PUT_USER_OK),
    putUserErr: selectors.getRequest(state, PUT_USER_ERR),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => {
      dispatch(getUser())
    },
    onChangePassword: (password) => {
      dispatch(putUser('', '', '', password))
    },
    postFeedback: (data) => {
      dispatch(postFeedback(data.subject, data.content))
    },
    push: (path) => {
      dispatch(push(path))
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedbackView)

