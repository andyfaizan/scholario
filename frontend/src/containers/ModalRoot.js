import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CreateCourseModal from './CreateCourseModal'
import ModalComponent from '../components/ModalComponent/ModalComponent'

/*
Idea for the Modal hierarchy has been taken from this StackOverflow post:
http://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions
The answer is by Dan Abromov himself
*/

const MODAL_COMPONENTS = {
  'CREATE_COURSE_MODAL': CreateCourseModal,
  'LOGIN_MODAL': ModalComponent
  /* other modals */
}

const ModalRoot = ({ modalType }) => {
  if (!modalType) {
    return <span /> // after React v15 you can return null here
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal />
}

export default connect(
  state => state.modal
)(ModalRoot)
