import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CreateCourseModal from './CreateCourseModal'
import ModalComponent from './ModalComponent'
import AddQuestionModal from './AddQuestionModal'
import AddPackageModal from './AddPackageModal'
import AddMaterialModal from './AddMaterialModal'
import AddBookmarkModal from './AddBookmarkModal'

/*
Idea for the Modal hierarchy has been taken from this StackOverflow post:
http://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions
The answer is by Dan Abromov himself
*/

const MODAL_COMPONENTS = {
  'CREATE_COURSE_MODAL': CreateCourseModal,
  'LOGIN_MODAL': ModalComponent,
  'ADD_QUESTION_MODAL': AddQuestionModal,
  'ADD_PACKAGE_MODAL': AddPackageModal,
  'ADD_MATERIAL_MODAL': AddMaterialModal,
  'ADD_BOOKMARK_MODAL': AddBookmarkModal
}

const ModalRoot = ({ modalType, location }) => {
  if (!modalType) {
    return <span /> // after React v15 you can return null here
  }
  console.log(modalType)

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal location={location}/>
}

export default connect(
  state => state.modal
)(ModalRoot)
