import React, { PropTypes } from 'react'
import Radium from 'radium'
import Paper from 'material-ui/Paper'
import AddCircle from 'material-ui/svg-icons/content/add'
import ModalRoot from '../../containers/ModalRoot'
import { ADD_MATERIAL_MODAL as addMaterialModalAction } from '../../redux/modules/modal'


const propTypes = {
  modal: PropTypes.object.isRequired,
  show: PropTypes.func.isRequired,
}

function AddMaterialComp({ modal, show }) {
  const styles = getStyles()

  const container = (
    <div key="IndependentPackage" style={styles.container}>
      <AddCircle style={styles.plusButton} color="#ffffff" />
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
          style={styles.style} zDepth={2}
          children={nodePaperCourse}onTouchTap={show}
        />
      </div>
      {addMaterialModal}
    </div>
  )
}

function getStyles() {
  return {
    container: {
      opacity: 0.6,
      paddingRight: '3px',
      paddingLeft: '3px',
      paddingTop: '3px',
      marginLeft: '5px',
      textAlign: 'center',
    },
    style: {
      float: 'left',
      height: '172px',
      width: '170px',
      margin: '8.5px',
      backgroundColor: '#446CB3',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
    },
    plusButton: {
      marginTop: '40px',
      width: '70px',
      height: '70px',
      opacity: 0.9,
    },
  }
}

AddMaterialComp.propTypes = propTypes

export default Radium(AddMaterialComp)
