import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {submit} from 'redux-form'
import {hide} from '../redux/modules/modal'
import {ADD_MATERIAL_MODAL as add_material} from '../redux/modules/modal'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddMaterialForm from '../forms/AddMaterialForm/AddMaterialForm'
import * as selectors from '../redux/selectors'
import { postMaterial, POST_MATERIAL_REQUEST, POST_MATERIAL_OK } from '../redux/modules/materials'

export class AddMaterialModal extends React.Component {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    hide: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.create = this.create.bind(this)
    this.onAddMaterialSubmit = this.onAddMaterialSubmit.bind(this)
  }

  /*create = () => {
    console.log('Create material called')
    this.refs.myForm.submit()  // will return a promise
  }

  onAddMaterialSubmit = (data) => {
    console.log('onAddMaterialSubmit called')
    //this.props.addMaterial(this.props.pkgId, data)
    this.props.hide()
  }*/

  render() {
    const title = "Material Hinzufügen"
    const labelStyle1 = {
      color: 'white',
      fontWeight: 'bold'
    }
    const labelStyle2 = {
      color: 'black'
    }

  /*<FlatButton
      label="Abbrechen"
      secondary={true}
      disabled={this.props.request ? true : false}
      labelStyle={labelStyle2}
      onTouchTap={this.props.hide}/>,
    */
    const actions = [
      <RaisedButton
        disabled={this.props.request ? true : false}
        label='Fertig'
        primary={false}
        backgroundColor='#446CB3'
        labelStyle={labelStyle1}
        onTouchTap={this.props.hide}/>
    ];

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={true}
          open={this.props.modal.visible}
          autoScrollBodyContent={true}
          autoDetectWindowHeight={true}>
            <AddMaterialForm ref="myForm"
            request={this.props.request}
            addMaterial={this.props.addMaterial}
            pkgId={this.props.pkgId} />
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    pkgId: selectors.getCurPkgId(state),
    request: selectors.getRequest(state, POST_MATERIAL_REQUEST),
    postOk: selectors.getRequest(state, POST_MATERIAL_OK)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hide: () => dispatch(hide(add_material)),
    addMaterial: (pkgId, data) => {
        dispatch(postMaterial(pkgId, data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(AddMaterialModal)
