import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DataPanel from '../components/DataPanel/DataPanel'

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataPanel)
