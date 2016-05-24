import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddCourseComponent from '../components/AddCourseComponent/AddCourseComponent'
import {show, CREATE_COURSE_MODAL as course_modal} from '../redux/modules/modal'
import ModalRoot from './ModalRoot'
import * as selectors from '../redux/selectors'

type Props = {

}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.modal,
    course_modal : course_modal,
    title: ownProps.title,
    whichFilter: ownProps.whichFilter,
    role: selectors.getUser(state).role,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => {
      dispatch(show(course_modal))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCourseComponent)
