import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CreateCourseModal from './CreateCourseModal'
import ModalComponent from './ModalComponent'
import AddQuestionModal from './AddQuestionModal'
import AddPackageModal from './AddPackageModal'
import AddMaterialModal from './AddMaterialModal'
import AddBookmarkModal from './AddBookmarkModal'
import UploadSolutionModal from './UploadSolutionModal'
/*
Idea for the Modal hierarchy has been taken from this StackOverflow post:
http://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions
The answer is by Dan Abromov himself
*/

const MODAL_COMPONENTS = {
  CREATE_COURSE_MODAL: CreateCourseModal,
  LOGIN_MODAL: ModalComponent,
  ADD_QUESTION_MODAL: AddQuestionModal,
  ADD_PACKAGE_MODAL: AddPackageModal,
  ADD_MATERIAL_MODAL: AddMaterialModal,
  ADD_BOOKMARK_MODAL: AddBookmarkModal,
  UPLOAD_SOLUTION_MODAL: UploadSolutionModal,
}

const propTypes = {
  location: PropTypes.object,
  modalType: PropTypes.string,
}

const ModalRoot = ({ modalType, location }) => {
  if (!modalType) {
    return <span /> // after React v15 you can return null here
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal location={location} />
}

ModalRoot.propTypes = propTypes

export default connect(
  state => state.modal
)(ModalRoot)
