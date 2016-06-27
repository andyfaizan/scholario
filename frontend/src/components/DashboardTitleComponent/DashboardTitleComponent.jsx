import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import classes from './DashboardTitleComponent.scss'
import AddCircle from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ModalRoot from '../../containers/ModalRoot'

function DashboardTitleComponent({ role, openModal, modal, courseModal }) {
  const teacherRole = 'Prof'
  let addCourse

  if (role === teacherRole) {
    addCourse = (
      <div className={classes.addCourseAction}>
        <FloatingActionButton onTouchTap={openModal} backgroundColor="#E74C3C" primary={false}>
          <AddCircle color="white" />
        </FloatingActionButton>
        {modal.visible ? <ModalRoot {...courseModal} /> : null}
      </div>
    )
  }

  return (
    <div>
      <Card>
        {/* <div className={classes.divSearchField}>
          <AutoComplete
          floatingLabelText= {floatingLabelTextState}
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={filterDataSource}
          //style={classes.autoComplete}
          />
        </div>*/}
        {addCourse}
      </Card>
    </div>
  )
}

DashboardTitleComponent.propTypes = {
  openModal: PropTypes.func,
  modal: PropTypes.object,
  courseModal: PropTypes.string,
  role: PropTypes.string,
}

export default DashboardTitleComponent
