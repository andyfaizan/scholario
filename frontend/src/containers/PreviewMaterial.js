import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FullMaterial from '../components/FullMaterial/FullMaterial'

const mapStateToProps = (state) => {
  return {
    // fileType: state.Material[id].fileType
    fileType: 'video',
    playing: true
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullMaterial)
