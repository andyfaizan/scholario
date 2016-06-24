import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import classes from './AddMaterialComp.scss'
import AddCircle from 'material-ui/svg-icons/content/add'
import ModalRoot from '../../containers/ModalRoot'
import { ADD_MATERIAL_MODAL as addMaterialModalAction } from '../../redux/modules/modal'

function AddMaterialComp({ modal, show }) {
  const container = (
    <div key="IndependentPackage" className={classes.container}>
      <AddCircle style={classes.plusButton} color="#ffffff" />
    </div>
  )

  const nodePaperCourse = [
    container,
  ]

  let addMaterialModal
  if (modal && modal.visible &&
      modal.modalType === addMaterialModalAction) {
    addMaterialModal = <ModalRoot modalType={addMaterialModalAction} />
  }
  return (
    <div>
      <div>
        <Paper
          style={classes.style} zDepth={2}
          children={nodePaperCourse}onTouchTap={show}
        />
      </div>
      {addMaterialModal}
    </div>
  )
}

AddMaterialComp.propTypes = {
  modal: PropTypes.object.isRequired,
  show: PropTypes.func.isRequired,
}

export default AddMaterialComp
