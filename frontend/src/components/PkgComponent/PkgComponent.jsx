import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'

import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import UploadFile from 'material-ui/svg-icons/file/file-upload'

import { White } from '../../styles/colors'

const propTypes = {
  pkgTitle: PropTypes.string,
  keywords: PropTypes.array,
  dateUploaded: PropTypes.string,
  pkgNotifications: PropTypes.number,
  pkgUrl: PropTypes.string,
  user: PropTypes.object,
  owner: PropTypes.string,
  onClickDeletePkg: PropTypes.func,
}

function PkgComponent({
  pkgTitle, keywords, dateUploaded, pkgUrl,
  user, owner, onClickDeletePkg }) {
  const styles = getStyles()

  let container
  const heading = (
    <div key="headingIndependentPackage" style={styles.divStyle}>
      <h5>{pkgTitle}</h5>
      <h5>{dateUploaded}</h5>
    </div>
  )

  if (user.role === 'Prof') {
    if (user && owner && user._id === owner) {
      container = (
        <div key="IndependentPackage">
          <div style={styles.container}>
            {keywords}
          </div>
          <div key="deleteKey" style={styles.deleteButton}>
            <IconButton disableTouchRipple tooltip="Pkg löschen" onTouchTap={onClickDeletePkg}>
              <Delete color="White" />
            </IconButton>
          </div>
          <div style={styles.downloadPkg}>
            <IconButton disableTouchRipple tooltip="Download-Paket">
              <FileDownload color="White" />
            </IconButton>
          </div>
        </div>
      )
    } else {
      container = (
        <div key="IndependentPackage">
          <div style={styles.container}>
            {keywords}
          </div>
          <div style={styles.downloadPkg}>
            <IconButton disableTouchRipple tooltip="Download-Paket">
              <FileDownload color="White" />
            </IconButton>
            <IconButton disableTouchRipple tooltip="Upload-Assignment">
              <UploadFile color="White" />
            </IconButton>
          </div>
        </div>
      )
    }
  } else
  {
    if (user && owner && user._id === owner) {
      container = (
        <div key="IndependentPackage">
          <div style={styles.container}>
            {keywords}
          </div>
          <div key="deleteKey" style={styles.deleteButton}>
            <IconButton disableTouchRipple tooltip="Pkg löschen" onTouchTap={onClickDeletePkg}>
              <Delete color="White" />
            </IconButton>
          </div>
          <div style={styles.downloadPkg}>
            <IconButton disableTouchRipple tooltip="Download-Paket">
              <FileDownload color="White" />
            </IconButton>
          </div>
        </div>
      )
    } else {
      container = (
        <div key="IndependentPackage">
          <div style={styles.container}>
            {keywords}
          </div>
          <div style={styles.downloadPkg}>
            <IconButton disableTouchRipple tooltip="Download-Paket">
              <FileDownload color="White" />
            </IconButton>
            // <IconButton disableTouchRipple tooltip="Upload-Assignment">
            //   <UploadFile color="White" />
            // </IconButton>
          </div>
        </div>
      )
    }
  }

  /*
  containerOld = (
    <div key="IndependentPackage">
      <div style={styles.container}>
        <h5>{keywords}</h5>
      </div>
    <div key="deleteKey" style={styles.deleteButton}>
      <IconButton disableTouchRipple tooltip="Pkg löschen">
        <Delete color="White" />
      </IconButton>
    </div>
    <div key="editKey" style={styles.editButton}>
      <IconButton disableTouchRipple tooltip="Edit Kurz">
        <Edit color="White" />
      </IconButton>
    </div>
    <div key="downloadKey" style={styles.downloadPkg}>
      <IconButton disableTouchRipple tooltip="Download-Paket">
        <FileDownload color="White" />
      </IconButton>
    </div>
  </div>
  )

  var notifications = (
    <div key="notifications" style={styles.badge}>
      <Badge
        badgeContent={10}
        secondary={true}
        badgeStyle={{ backgroundColor: '#EF4836', radius: 20}}
      />
    </div>
  )
   */

  const nodePaperCourse = [
    container,
  ]

  const nodeFileClipper = [
    heading,
  ]

  return (
    <div>
      <Paper style={Object.assign({}, styles.baseStyle, styles.style)} zDepth={2} children={nodePaperCourse} />
      <Link to={pkgUrl}>
        <Paper style={Object.assign({}, styles.baseStyle, styles.styleTwo)} zDepth={0} />
        <Paper style={Object.assign({}, styles.baseStyle, styles.styleFive)} zDepth={0} />
        <Paper style={Object.assign({}, styles.baseStyle, styles.styleSix)} zDepth={0} />
        <Paper style={Object.assign({}, styles.baseStyle, styles.styleThree)} zDepth={0} />
        <Paper style={Object.assign({}, styles.baseStyle, styles.styleFour)} zDepth={5} children={nodeFileClipper} />
      </Link>
    </div>
  )
}

function getStyles() {
  return {
    baseStyle: {
      float: 'left',
      width: '220px',
      margin: '8.5px',
      backgroundColor: '#446CB3',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
      borderBottomLeftRadius: '30px',
      borderBottomRightRadius: '30px',
    },
    style: {
      height: '172px',
    },
    styleTwo: {
      height: '30px',
      marginTop: '150px',
      marginLeft: '-229px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#446CB3',
    },
    styleThree: {
      height: '30px',
      marginTop: '144px',
      marginLeft: '-229px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#446CB3',
    },
    styleFour: {
      height: '80px',
      marginTop: '8px',
      marginLeft: '-229px',
    },
    styleFive: {
      height: '30px',
      marginTop: '148px',
      marginLeft: '-229px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#446CB3',
    },
    styleSix: {
      height: '30px',
      marginTop: '147px',
      marginLeft: '-229px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#446CB3',
    },
    divStyle: {
      textAlign: 'center',
      color: '#ffffff',
      marginLeft: '5px',
      marginTop: '-7px',
      opacity: 0.9,
    },
    badge: {
      position: 'absolute',
      margin: 'auto',
      marginTop: '20px',
      marginLeft: '172px',
      opacity: 1.0,
    },
    container: {
      paddingRight: '3px',
      paddingLeft: '3px',
      paddingTop: '90px',
      marginLeft: '5px',
      textAlign: 'center',
      color: '#446CB3',
    },
    deleteButton: {
      position: 'absolute',
      marginLeft: '30px',
      marginTop: '9px',
      opacity: 0.8,
    },
    downloadPkg: {
      position: 'absolute',
      marginLeft: '5px',
      marginTop: '10px',
      opacity: 0.8,
    },
    editButton: {
      position: 'absolute',
      marginLeft: '20px',
      marginTop: '0px',
      opacity: 0.8,
    },
    uploadPkg: {

    },
  }
}

PkgComponent.propTypes = propTypes

export default Radium(PkgComponent)
