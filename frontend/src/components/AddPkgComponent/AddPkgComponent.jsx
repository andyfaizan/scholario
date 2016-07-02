import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import classes from './AddPkgComponent.scss'
import AddCircle from 'material-ui/svg-icons/content/add'
import ModalRoot from '../../containers/ModalRoot'
import { ADD_PACKAGE_MODAL as addPkgModalAction } from '../../redux/modules/modal'


function AddPkgComponent({ modal, show }) {
  // Variables for displaying Child Node
  const heading = (
    <div key="headingIndependentPackage" className={classes.divStyle}>
      <AddCircle className={classes.plusButton} color="#ffffff" />
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
        <Paper className={classes.style} zDepth={2} />
        {/* <Paper className={classes.styleTwo} zDepth={0}  />
            <Paper className={classes.styleFive} zDepth={0}  />
            <Paper className={classes.styleSix} zDepth={0}  />
            <Paper className={classes.styleThree} zDepth={0}  /> */}
        <Paper
          className={classes.styleFour} zDepth={5}
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
