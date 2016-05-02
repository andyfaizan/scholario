import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DataList from '../components/DataList/DataList'
import { open_material, add_material } from '../redux/modules/Material'

const bogus = {
  name: "Sample Content",
  content: "Some content"
}

const mapStateToProps = (state) => {
  return {
    subfolders: state.Material
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onMaterialClick : (id) => {
      dispatch(open_material(id))
    },
    onAddClick : () => {
      dispatch(add_material(bogus))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataList)
