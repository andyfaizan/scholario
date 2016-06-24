import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import classes from './AddPkgComponent.scss'
import AddCircle from 'material-ui/svg-icons/content/add'
import ModalRoot from '../../containers/ModalRoot'
import { ADD_PACKAGE_MODAL as addPkgModalAction } from '../../redux/modules/modal'


function AddPkgComponent({ modal, show }) {
  // Variables for displaying Child Node
  const heading = (
    <div key="headingIndependentPackage" style={classes.divStyle}>
      <AddCircle style={classes.plusButton} color="#ffffff" />
    </div>
  )

  const nodeFileClipper = [
    heading,
  ]

  let addPkgModal
  if (modal && modal.visible &&
      modal.modalType === addPkgModalAction) {
    addPkgModal = <ModalRoot modalType={addPkgModalAction} />
  }
  return (
    <div>
      <div>
        <Paper style={classes.style} zDepth={2} />
        {/* <Paper style={classes.styleTwo} zDepth={0}  />
            <Paper style={classes.styleFive} zDepth={0}  />
            <Paper style={classes.styleSix} zDepth={0}  />
            <Paper style={classes.styleThree} zDepth={0}  /> */}
        <Paper
          style={classes.styleFour} zDepth={5}
          children={nodeFileClipper} onTouchTap={show}
        />
      </div>
      {addPkgModal}
    </div>
  )
}

AddPkgComponent.propTypes = {
  modal: PropTypes.object,
  show: PropTypes.func,
}

export default AddPkgComponent
