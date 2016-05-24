import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SnackbarWrapper from '../components/SnackbarWrapper/SnackbarWrapper'
import * as selectors from '../redux/selectors'
import { removeRequest } from '../redux/modules/request'

const mapStateToProps = (ownProps, state) => {
  return {
    error: selectors.getRequest(state, ownProps.errorType),
    okay: selectors.getRequest(state, ownProps.okayType)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    remove: request => {
      dispatch(removeRequest(request))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackbarWrapper)
