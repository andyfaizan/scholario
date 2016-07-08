import React, { PropTypes } from 'react'
import Radium from 'radium'
import Card from 'material-ui/Card/Card'
import AddCircle from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ModalRoot from '../../containers/ModalRoot'


const propTypes = {
  openModal: PropTypes.func,
  modal: PropTypes.object,
  courseModal: PropTypes.string,
  role: PropTypes.string,
}

function DashboardTitleComponent({ role, openModal, modal, courseModal }) {
  const styles = getStyles()

  const teacherRole = 'Prof'
  let addCourse

  if (role === teacherRole) {
    addCourse = (
      <div style={styles.addCourseAction}>
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
        {/* <div style={styles.divSearchField}>
          <AutoComplete
          floatingLabelText= {floatingLabelTextState}
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={filterDataSource}
          //style={styles.autoComplete}
          />
        </div>*/}
        {addCourse}
      </Card>
    </div>
  )
}

function getStyles() {
  return {
    divSearchField: {
      float: 'left',
      marginLeft: '30px',
      marginTop: '-19px',
      marginRight: 'auto',
      marginBottom: 'auto',
    },
    divTitle: {
      float: 'left',
    },
    autoComplete: {
      borderStyle: 'solid',
      borderRadius: '12px',
      borderColor: 'green',
      color: 'red',
      backgroundColor: '#000000',
    },
    addCourseAction: {
      float: 'left',
      marginLeft: '0px',
    },
    style: {
      backgroundColor: '#E74C3C',
    },
  }
}

DashboardTitleComponent.propTypes = propTypes

export default Radium(DashboardTitleComponent)
