import React from 'react'
import Snackbar from 'material-ui/lib/snackbar'

type Props = {
    error: Object,
    okay: Object,
    remove: Function
};
export class SnackbarWrapper extends React.Component {
  props: Props;

  constructor(props){
    super(props)
    console.log(props);
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleRequestClose(request) {
    this.props.remove(request)
  }

  render () {
    return (
      <div>
      <Snackbar
          open={true}
          message={this.props.error ? this.props.error.message : this.props.okay.message}
          autoHideDuration={4000}
          handleRequestClose={this.handleRequestClose}
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
