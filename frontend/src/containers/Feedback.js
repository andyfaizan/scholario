import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SnackbarWrapper from '../components/SnackbarWrapper/SnackbarWrapper'
import * as selectors from '../redux/selectors'
import { removeRequest } from '../redux/modules/request'

const mapStateToProps = (state, ownProps) => {
  let error = selectors.getRequest(state, ownProps.errorType)
  let okay = selectors.getRequest(state, ownProps.okayType)
  var currRequest = (error ? error : okay)
  var currRequestType = (error ? ownProps.errorType : ownProps.okayType)
  var currMessage = (error ? "Oops! Es gibt ein Fehler! :(" : "Und...Fertig! :)")

  return {
    request: currRequest,
    requestType: currRequestType,
    message: currMessage
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
