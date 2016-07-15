import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import TeacherProfileBar from '../../containers/TeacherProfileBar'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import FeedbackForm from '../../forms/FeedbackForm/FeedbackForm'
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
  feedbackOk: PropTypes.object,
  feedbackErr: PropTypes.object,
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
    const styles = getStyles()

    const { user, userUniversity, userProgram,
      feedbackErr,
    } = this.props

    let feedbackTrue = -1
    if (feedbackErr) feedbackTrue = 0

    return (
      <div>
        <div style={styles.root} >
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
        <div style={styles.footer}>
          <FooterLanding />
        </div>
      </div>
    )
  }
}

function getStyles() {
  return {
    root: {
      backgroundColor: '#FBF6EC',
      minHeight: '100vh',
    },
    footer: {
      fontSize: '20px',
      backgroundColor: 'white',
      color: 'darkslategray',
      height: '10%',
    },
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
)(Radium(FeedbackView))
