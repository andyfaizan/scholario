import React, { PropTypes } from 'react'

import Snackbar from 'material-ui/Snackbar'


const propTypes = {
  request: PropTypes.object,
  requestType: PropTypes.string,
  message: PropTypes.string,
  remove: PropTypes.func,
}

export class SnackbarWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleRequestClose() {
    if (this.props.request) this.props.remove(this.props.requestType)
  }

  render() {
    return (
      <div>
        <Snackbar
          open={!!this.props.request}
          message={this.props.requestType ? this.props.message : null}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          style={{ textAlign: 'center' }}
        />
      </div>
    )
  }
}

SnackbarWrapper.propTypes = propTypes

export default SnackbarWrapper
