import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CourseInfoHeader from '../components/CourseInfoHeader/CourseInfoHeader'

type Props = {
  course : PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    course: state.currentCourse
  }
}

export default connect(
  mapStateToProps
)(CourseInfoHeader)
