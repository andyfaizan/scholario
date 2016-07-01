import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { hide, ADD_MATERIAL_MODAL as addMaterialModalAction } from '../redux/modules/modal'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import AddMaterialForm from '../forms/AddMaterialForm/AddMaterialForm'
import * as selectors from '../redux/selectors'
import { postMaterial, POST_MATERIAL_REQUEST, POST_MATERIAL_OK } from '../redux/modules/materials'


const propTypes = {
  modal: PropTypes.object.isRequired,
  pkgId: PropTypes.string,
  request: PropTypes.object,
  postOk: PropTypes.string,
  hide: PropTypes.func.isRequired,
  addMaterial: PropTypes.func,
}

export class AddMaterialModal extends React.Component {
  render() {
    const title = 'Material Hinzufügen'
    const labelStyle1 = {
      color: 'white',
      fontWeight: 'bold',
    }
    const actions = [
      <RaisedButton
        disabled={this.props.request}
        label="Fertig"
        primary={false}
        backgroundColor="#446CB3"
        labelStyle={labelStyle1}
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
          />
          <div style={{ 'margin-left': '30px' }}>
            <strong>Max file size : 800 MB</strong>
          </div>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
  pkgId: selectors.getCurPkgId(state),
  request: selectors.getRequest(state, POST_MATERIAL_REQUEST),
  postOk: selectors.getRequest(state, POST_MATERIAL_OK),
})

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hide(addMaterialModalAction)),
  addMaterial: (pkgId, data) => {
    dispatch(postMaterial(pkgId, data))
  },
})

AddMaterialModal.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AddMaterialModal)
