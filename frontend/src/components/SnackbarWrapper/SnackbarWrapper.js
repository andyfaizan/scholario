import React from 'react'
import Snackbar from 'material-ui/lib/snackbar'

type Props = {
    request: Object,
    remove: Function,
    requestType: String,
    message: String
};
export class SnackbarWrapper extends React.Component {
  props: Props;

  constructor(props) {
    super(props)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleRequestClose() {
    if(this.props.request)
      this.props.remove(this.props.requestType)
  }

  render () {
    console.dir(this.props)
    return (
      <div>
      <Snackbar
          open={this.props.request ? true : false}
          message={this.props.requestType ? this.props.message : null}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          style={{'text-align':'center'}}
        />
      </div>
    )
  }
}

export default SnackbarWrapper
//
// open: Boolean,
// message: String,
// handleRequestClose: Function,
