import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Box from '../components/Box/Box'

type Props = {
  size: Object
}

const mapStateToProps = (state, ownProps) => {
  return {
    content: state.currentCourse,
    width: ownProps.width,
    height: ownProps.height
  }
}

export default connect(
  mapStateToProps)(Box)
