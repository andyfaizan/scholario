import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { hide, ADD_MATERIAL_MODAL as addMaterialModalAction } from '../redux/modules/modal'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
// import FlatButton from 'material-ui/FlatButton'
import AddMaterialForm from '../forms/AddMaterialForm/AddMaterialForm'
import * as selectors from '../redux/selectors'
import { postMaterial, abortPostMaterial, POST_MATERIAL_REQUEST, POST_MATERIAL_OK } from '../redux/modules/materials'


const propTypes = {
  modal: PropTypes.object.isRequired,
  pkgId: PropTypes.string,
  request: PropTypes.object,
  postOk: PropTypes.string,
  hide: PropTypes.func.isRequired,
  addMaterial: PropTypes.func,
  progress: PropTypes.number,
  // abort: PropTypes.func,
}

// <FlatButton
//   label="Abbrechen"
//   secondary
//   labelStyle={styles.labelStyle2}
//   onTouchTap={this.props.abort}
// />,

export class AddMaterialModal extends React.Component {
  render() {
    const styles = getStyles()
    const title = 'Material Hinzufügen'

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
          <AddMaterialForm
            ref="myForm"
            request={this.props.request}
            addMaterial={this.props.addMaterial}
            pkgId={this.props.pkgId}
            progress={this.props.progress}
          />
          <div style={styles.fileSizeContainer}>
            <strong>Max file size : 800 MB</strong>
          </div>
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
    fileSizeContainer: {
      marginLeft: '30px',
    },
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
  pkgId: selectors.getCurPkgId(state),
  request: selectors.getRequest(state, POST_MATERIAL_REQUEST),
  postOk: selectors.getRequest(state, POST_MATERIAL_OK),
  progress: selectors.getCurFileProgress(state),
})

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hide(addMaterialModalAction)),
  addMaterial: (pkgId, data) => {
    dispatch(postMaterial(pkgId, data))
  },
  abort: () => dispatch(abortPostMaterial()),
})

AddMaterialModal.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Radium(AddMaterialModal))
