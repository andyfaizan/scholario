import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {hide} from '../redux/modules/Modal'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'

export class CreateCourseModal extends React.Component {
  static propTypes = {
    modal: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.hide}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.props.hide}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={true}
          open={this.props.modal.visible}>
          onRequestClose={this.props.hide}
          Only actions can close this dialog.
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal
})
export default connect((mapStateToProps), {
  hide: () => hide('CREATE_COURSE_MODAL')
})(CreateCourseModal)
