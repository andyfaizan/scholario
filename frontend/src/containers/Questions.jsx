import { connect } from 'react-redux'
import RightSectionTeacherDashboard from '../components/RightSectionTeacherDashboard/RightSectionTeacherDashboard'
import { show, ADD_QUESTION_MODAL as addQuestionModalAction } from '../redux/modules/modal'


const mapStateToProps = (state, ownProps) => ({
  modal: state.modal,
  questions: ownProps.questions,
  location: ownProps.location,
})

const mapDispatchToProps = (dispatch) => ({
  show: () => dispatch(show(addQuestionModalAction)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSectionTeacherDashboard)
