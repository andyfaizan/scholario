import { React, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import AddCircle from 'material-ui/svg-icons/content/add'
import ModalRoot from '../../containers/ModalRoot'
import classes from './AddCourseComponent.scss'

function AddCourseComponent({ modal, openModal, courseModal }) {
  const actions = (
    <div>
      <IconButton disableTouchRipple style={classes.buttonStyle} tooltip="In Course">
        <AddCircle style={classes.plusButton} color="#ffffff" />
      </IconButton>
    </div>
  )

  return (
    <div>
      <Paper style={classes.style} zDepth={2} onClick={openModal} children={actions} />
      {modal.visible ? <ModalRoot {...courseModal} /> : null}
    </div>
  )
}

AddCourseComponent.propTypes = {
  openModal: PropTypes.func,
  modal: PropTypes.object,
  courseModal: PropTypes.string,
}

export default AddCourseComponent
