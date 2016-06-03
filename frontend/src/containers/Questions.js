import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RightSectionTeacherDashboard from '../components/RightSectionTeacherDashboard/RightSectionTeacherDashboard'
import {ADD_QUESTION_MODAL as add_question} from '../redux/modules/modal'
import {show} from '../redux/modules/modal'

type Props = {

}

// ownProps for specifying page where it is rendered i.e. course, package, material
const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.modal,
    questions: ownProps.questions,
    location: ownProps.location
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    show: () => dispatch(show(add_question))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSectionTeacherDashboard)
