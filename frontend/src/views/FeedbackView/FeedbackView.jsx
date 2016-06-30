import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import TeacherProfileBar from '../../containers/TeacherProfileBar'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import FeedbackForm from '../../forms/FeedbackForm/FeedbackForm'
import classes from './FeedbackView.scss'
import DashboardToolBar from '../../containers/DashboardToolBar'
import * as selectors from '../../redux/selectors'
import { getUser, postFeedback,
  POST_FEEDBACK_OK, POST_FEEDBACK_ERR,
} from '../../redux/modules/user'

const propTypes = {
  user: PropTypes.object,
  userMetadata: PropTypes.object,
  userUniversity: PropTypes.object,
  userProgram: PropTypes.object,
  feedbackOk: PropTypes.string,
  feedbackErr: PropTypes.string,
  push: PropTypes.func,
  getUser: PropTypes.func,
  postFeedback: PropTypes.func,
}

export class FeedbackView extends React.Component {
  componentDidMount() {
    if (this.props.userMetadata) {
      if (!this.props.userMetadata.fetchedData) {
        this.props.getUser()
      }
    }
  }

  render() {
    const { user, userUniversity, userProgram,
      feedbackOk, feedbackErr,
    } = this.props

    let feedbackTrue = -1
    if (feedbackOk) {
      this.props.push('/dashboard')
    } else if (feedbackErr) feedbackTrue = 0

    return (
      <div>
        <div className={classes.root} >
          <DashboardToolBar />
          <TeacherProfileBar
            firstNameUser={user ? user.firstname : ''}
            lastNameUser={user ? user.lastname : ''}
            bio={user ? user.bio : ''}
            universityName={userUniversity ? userUniversity.name : ''}
            programeName={userProgram ? userProgram.name : ''}
          />
          <br />
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

const mapStateToProps = (state) => ({
  user: selectors.getUser(state),
  userMetadata: selectors.getUserMetadata(state),
  userUniversity: selectors.getUserUniversity(state),
  userProgram: selectors.getUserProgram(state),
  feedbackOk: selectors.getRequest(state, POST_FEEDBACK_OK),
  feedbackErr: selectors.getRequest(state, POST_FEEDBACK_ERR),
})

const mapDispatchToProps = (dispatch) => ({
  getUser: () => {
    dispatch(getUser())
  },
  postFeedback: (data) => {
    dispatch(postFeedback(data.subject, data.content))
  },
  push: (path) => {
    dispatch(push(path))
  },
})

FeedbackView.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedbackView)

