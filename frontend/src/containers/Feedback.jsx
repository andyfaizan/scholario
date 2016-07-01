import { connect } from 'react-redux'
import SnackbarWrapper from '../components/SnackbarWrapper/SnackbarWrapper'
import * as selectors from '../redux/selectors'
import { removeRequest } from '../redux/modules/request'

const mapStateToProps = (state, ownProps) => {
  const error = selectors.getRequest(state, ownProps.errorType)
  const okay = selectors.getRequest(state, ownProps.okayType)
  const currRequest = error || okay
  const currRequestType = (error ? ownProps.errorType : ownProps.okayType)
  const currMessage = (error ? 'Oops! Es gibt ein Fehler! :(' : ownProps.message || 'Und...Fertig! :)')

  return {
    request: currRequest,
    requestType: currRequestType,
    message: currMessage,
  }
}

const mapDispatchToProps = (dispatch) => ({
  remove: request => {
    dispatch(removeRequest(request))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackbarWrapper)
