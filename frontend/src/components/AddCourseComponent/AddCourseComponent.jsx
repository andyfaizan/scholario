import { React, PropTypes } from 'react'
import Radium from 'radium'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import AddCircle from 'material-ui/svg-icons/content/add'
import ModalRoot from '../../modals/ModalRoot'

const propTypes = {
  openModal: PropTypes.func,
  modal: PropTypes.object,
  courseModal: PropTypes.string,
}

function AddCourseComponent({ modal, openModal, courseModal }) {
  const styles = getStyles()

  const actions = (
    <div>
      <IconButton disableTouchRipple style={styles.buttonStyle} tooltip="In Course">
        <AddCircle style={styles.plusButton} color="#ffffff" />
      </IconButton>
    </div>
  )

  return (
    <div>
      <Paper style={styles.style} zDepth={2} onClick={openModal} children={actions} />
      {modal.visible ? <ModalRoot {...courseModal} /> : null}
    </div>
  )
}

function getStyles() {
  return {
    style: {
      float: 'left',
      height: '170px',
      width: '170px',
      margin: '8.5px',
      textAlign: 'center',
      display: 'inline-block',
      borderRadius: '13px',
      backgroundColor: '#446CB3',
    },
    buttonStyle: {
      margin: 'auto',
      width: '100%',
      padding: '10px',
      height: '170px',
      lineHeight: '140px',
    },
    plusButton: {
      width: '80px',
      height: '80px',
      opacity: '0.9px',
    },
  }
}

AddCourseComponent.propTypes = propTypes

export default Radium(AddCourseComponent)
