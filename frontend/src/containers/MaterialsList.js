import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DataList from '../components/DataList/DataList'
import actions from '../redux/modules/Material'

const mapStateToProps = (state) => {
  return {
    subfolders: state.Material
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick : (id) => {
      dispatch(actions.open_material(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataList)
