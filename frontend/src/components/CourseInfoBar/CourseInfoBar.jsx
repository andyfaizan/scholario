import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'

import Card from 'material-ui/Card/Card'
// import CardText from 'material-ui/Card/CardText'
import CardHeader from 'material-ui/Card/CardHeader'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
// import Divider from 'material-ui/Divider'
import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
// import Friend from 'material-ui/svg-icons/social/person'
import UploadFile from 'material-ui/svg-icons/file/file-upload'
import ModalRoot from '../../modals/ModalRoot'
import { UPLOAD_SOLUTION_MODAL as uploadSolutionModalAction } from '../../redux/modules/modal'


const propTypes = {
  courseTitle: PropTypes.string,
  teachersName: PropTypes.string,
  assistantsName: PropTypes.string,
  universityName: PropTypes.string,
  programeName: PropTypes.string,
  semesterInstance: PropTypes.string,
  shortInformation: PropTypes.string,
  courseVotes: PropTypes.string,
  courseUrl: PropTypes.string,
  courseFollowers: PropTypes.array,
  participantsNum: PropTypes.number,
  topFiveUsersProfileLink: PropTypes.array,
  userRole: PropTypes.string,
  pkgName: PropTypes.string,
  modal: PropTypes.object,
  show: PropTypes.func,
  location: PropTypes.Object,
}

function CourseInfoBar({
  courseTitle, teachersName, semesterInstance,
  courseUrl, pkgName, modal, show, location }) {
  const styles = getStyles()

  let labelForPkgName
  let courseName
  let displayPkg

  if (pkgName) {
    labelForPkgName = pkgName
    courseName = `${courseTitle} :`
    displayPkg = (
      <div style={styles.pkgName}>
        <FlatButton label={labelForPkgName} style={styles.titleStyle} primary={false} />
      </div>
    )
  } else {
    labelForPkgName = null
    displayPkg = null
    courseName = courseTitle
  }

  let uploadButton = <div />
  if (location.pathname.includes('package')) {
    uploadButton = (<div style={styles.actionPosition} >
      <FlatButton
        label={"Lösung Hochladen"}
        backgroundColor="#446CB3"
        hoverColor="#26A65B"
        style={styles.buttonStyle}
        rippleColor="#ffffff"
        icon={<UploadFile />}
        onTouchTap={show}
      />
    </div>)
  }
  let uploadSolutionModal
  if (modal && modal.visible &&
      modal.modalType === uploadSolutionModalAction) {
    uploadSolutionModal = <ModalRoot modalType={uploadSolutionModalAction} />
  }

  return (
    <div>
      <Card>
        <Toolbar style={styles.toolbarStyle} >
          <ToolbarGroup float="left">
            <FlatButton
              containerElement={<Link to={courseUrl} />}
              style={styles.titleStyle}
              label={courseName}
              primary={false}
            />
            {displayPkg}
          </ToolbarGroup>
        </Toolbar>
        <CardHeader
          title={teachersName}
          subtitle={semesterInstance}
          actAsExpander
          style={styles.text}
          titleColor="#26A65B"
        />
        {/* <CardText>
          <div style={styles.actionPosition} >
            {shortInformation}
          </div>
        </CardText>*/}
        <CardActions >
          {uploadButton}
          {uploadSolutionModal}
          {/*
          <FlatButton label="Bearbeiten Kurs"
            hoverColor="#26A65B" />
          <FlatButton label="löschen Kurs"
            hoverColor="#26A65B" />
          <FlatButton label="Paket bearbeiten"
            hoverColor="#26A65B" />
          <FlatButton label="löschen von Paketen"
            hoverColor="#26A65B" />
          <FlatButton label="Material bearbeiten"
            hoverColor="#26A65B" />
          <FlatButton label="löschen-Material"
            hoverColor="#26A65B" />
            */}
        </CardActions>
      </Card>
    </div>
  )
}

function getStyles() {
  return {
    actionPosition: {
      position: 'relative',
      marginLeft: '55px',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
    },
    linkColor: {
      color: '#26A65B',
      position: 'relative',
      marginLeft: '30px',
      marginTop: '-20px',
    },
    pkgName: {
      position: 'relative',
      marginLeft: '-40px',
      marginTop: '10px',
    },
    iconStyle: {
      marginTop: '4px',
    },
    titleStyle: {
      color: '#26A65B',
      fontSize: '160%',
    },
    toolbarStyle: {
      backgroundColor: 'white',
      color: '#26A65B',
    },
    buttonStyle: {
      color: 'white',
    },
    separator: {
      backgroundColor: 'black',
    },
    text: {
      position: 'relative',
      marginLeft: '48px',
      marginRight: '5px',
      color: 'green',
    },
  }
}

CourseInfoBar.propTypes = propTypes

export default Radium(CourseInfoBar)
