import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DataList from '../components/DataList/DataList'
import { open_material, add_material, add_child_material } from '../redux/modules/Material'

const bogus = {
  name: "Sample Content",
  subtext: "Some content",
  fileType: ""
}

const bogusChild = {
  name: "child Content",
  subtext: "child content",
  fileType: ""
}

const mapStateToProps = (state) => {

}
const mapDispatchToProps = (dispatch) => {
  return {
    onMaterialClick : (id) => {
      dispatch(open_material(id))
    },
    onAddClick : () => {
      dispatch(add_material(bogus)),
      dispatch(add_child_material(bogusChild, 0))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataList)
