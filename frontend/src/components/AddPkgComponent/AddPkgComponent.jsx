import React, { PropTypes } from 'react'
import Radium from 'radium'

import Paper from 'material-ui/Paper'
import AddCircle from 'material-ui/svg-icons/content/add'

import ModalRoot from '../../modals/ModalRoot'
import { ADD_PACKAGE_MODAL as addPkgModalAction } from '../../redux/modules/modal'


const propTypes = {
  modal: PropTypes.object,
  show: PropTypes.func,
}

function AddPkgComponent({ modal, show }) {
  const styles = getStyles()

  const heading = (
    <div key="headingIndependentPackage" style={styles.divStyle}>
      <AddCircle style={styles.plusButton} color="#ffffff" />
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
        <Paper style={styles.style} zDepth={2} />
        {/* <Paper style={styles.styleTwo} zDepth={0}  />
            <Paper style={styles.styleFive} zDepth={0}  />
            <Paper style={styles.styleSix} zDepth={0}  />
            <Paper style={styles.styleThree} zDepth={0}  /> */}
        <Paper
          style={styles.styleFour} zDepth={5}
          children={nodeFileClipper} onTouchTap={show}
        />
      </div>
      {addPkgModal}
    </div>
  )
}

function getStyles() {
  return {
    actionPosition: {
      position: 'absolute',
      margin: 'auto',
      marginTop: '90px',
      marginLeft: '250px',
    },
    actionPostionLeft: {
      position: 'absolute',
      margin: 'auto',
      marginTop: '90px',
    },
    actionMain: {
      position: 'absolute',
      opacity: 0.6,
    },
    divTitle: {
      float: 'left',
    },
    style: {
      float: 'left',
      height: '172px',
      width: '220px',
      margin: '8.5px',
      backgroundColor: '#446cB3',
      color: '#ffffff',
      borderBottomLeftRadius: '30px',
      borderBottomRightRadius: '30px',
      overflow: 'inherit',
      alignItems: 'center',
    },
    styleFour: {
      float: 'left',
      height: '80px',
      width: '220px',
      backgroundColor: '#446cB3',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
      margin: 'auto',
      marginTop: '8px',
      marginLeft: '-229px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#446cB3',
      opacity: 1.0,
      borderBottomLeftRadius: '50px',
      borderBottomRightRadius: '50px',
    },
    divStyle: {
      textAlign: 'center',
      color: '#ffffff',
      marginLeft: '5px',
      marginTop: '-7px',
      opacity: 0.9,
    },
    plusButton: {
      width: '70px',
      height: '70px',
      opacity: 0.9,
    },
  }
}

AddPkgComponent.propTypes = propTypes

export default Radium(AddPkgComponent)
