import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/modules/Material'
import Data from '../components/Data/Data'

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    name: state.Material[ownProps.id].name,
    subtext: state.Material[ownProps.id].subtext,
    childIds: state.Material[ownProps.id].childIds,
    fileType: state.Material[ownProps.id].fileType,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps
)(Data)
