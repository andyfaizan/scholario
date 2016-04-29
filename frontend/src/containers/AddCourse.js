import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddCourseComponent from '../components/AddCourseComponent/AddCourseComponent'
import {show, CREATE_COURSE_MODAL as course_modal} from '../redux/modules/modal'
import ModalRoot from './ModalRoot'

type Props = {

}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    course_modal : course_modal
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
