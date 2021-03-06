import { connect } from 'react-redux'

import * as selectors from '../redux/selectors'

import AddCourseComponent from '../components/AddCourseComponent/AddCourseComponent'
import { show, CREATE_COURSE_MODAL as courseModalAction } from '../redux/modules/modal'


const mapStateToProps = (state, ownProps) => ({
  modal: state.modal,
  courseModalAction,
  title: ownProps.title,
  whichFilter: ownProps.whichFilter,
  role: selectors.getUser(state).role,
})

const mapDispatchToProps = (dispatch) => ({
  openModal: () => {
    dispatch(show(courseModalAction))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCourseComponent)
