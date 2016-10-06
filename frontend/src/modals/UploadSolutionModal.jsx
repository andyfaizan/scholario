import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { hide, UPLOAD_SOLUTION_MODAL as uploadSolutionModalAction } from '../redux/modules/modal'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import UploadSolutionForm from '../forms/UploadSolutionForm/UploadSolutionForm'
import * as selectors from '../redux/selectors'
import { postSolution, POST_SOLUTION_REQUEST, POST_SOLUTION_OK } from '../redux/modules/solutions'


const propTypes = {
  modal: PropTypes.object.isRequired,
  request: PropTypes.object,
  postOk: PropTypes.string,
  hide: PropTypes.func.isRequired,
  sendSolution: PropTypes.func,
  progress: PropTypes.number,
}

export class UploadSolutionModal extends React.Component {
  render() {
    const styles = getStyles()
    const title = 'Lösung Hochladen'

    const actions = [
      <RaisedButton
        disabled={this.props.request}
        label="Fertig"
        primary={false}
        backgroundColor="#446CB3"
        labelStyle={styles.labelStyle1}
        onTouchTap={this.props.hide}
      />,
    ]

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal
          open={this.props.modal.visible}
          autoScrollBodyContent
          autoDetectWindowHeight
        >
          <UploadSolutionForm
            ref="myForm"
            request={this.props.request}
            sendSolution={this.props.sendSolution}
            progress={this.props.progress}
            aId={1}
          />
        </Dialog>
      </div>
    )
  }
}

function getStyles() {
  return {
    labelStyle1: {
      color: 'white',
      fontWeight: 'bold',
    },
    labelStyle2: {
      color: 'black',
    },
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
  request: selectors.getRequest(state, POST_SOLUTION_REQUEST),
  postOk: selectors.getRequest(state, POST_SOLUTION_OK),
  progress: selectors.getCurFileProgress(state),
})

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hide(uploadSolutionModalAction)),
  sendSolution: (aId, data) => {
    dispatch(postSolution(aId, data))
  },
})

UploadSolutionModal.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Radium(UploadSolutionModal))
