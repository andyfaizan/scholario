import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { add_material } from '../redux/modules/Material'

const bogus = {
  name: "Sample Content",
  content: "Some content"
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAddClick : () => {
      dispatch(add_material(bogus))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialPanel)
