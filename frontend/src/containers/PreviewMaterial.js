import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FullMaterial from '../components/FullMaterial/FullMaterial'

const mapStateToProps = (state, ownProps) => {
  return {
    // fileType: state.Material[id].fileType
    fileType: 'video',
    playing: true,
    location: ownProps.location,
    courseInstance: ownProps.courseInstance,
    pkg: ownProps.pkg,
    material: ownProps.material,
    questions: ownProps.questions,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullMaterial)
