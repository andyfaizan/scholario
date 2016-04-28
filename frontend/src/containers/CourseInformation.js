import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CourseInfoHeader from '../components/CourseInfoHeader/CourseInfoHeader'

type Props = {

}

const mapStateToProps = (state) => {
  return {
    course: state.currentCourse
  }
}

export default connect(
  mapStateToProps
)(CourseInfoHeader)
