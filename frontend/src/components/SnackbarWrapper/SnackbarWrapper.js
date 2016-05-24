import React from 'react'
import Snackbar from 'material-ui/lib/snackbar'

type Props = {
    error: Object,
    okay: Object,
    remove: Function
};
export class SnackbarWrapper extends React.Component {
  props: Props;

  handleRequestClose(request) {
    this.props.remove(request)
  }


  constructor(props) {
    super(props)
    this.getMessage = this.getMessage.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.update = this.update.bind(this)
  }

  update(){
    if(this.props.error | this.props.okay)
      return true
    return false
  }

  getMessage(){
    if(this.props.error)
      return this.props.error.message
    else if(this.props.okay)
      return this.props.okay.message
  }

  render () {
    const message = this.getMessage()
    const show = this.update()
    console.dir(this.props)
    return (
      <div>
      <Snackbar
          open={show}
          message={message}
          autoHideDuration={4000}
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
