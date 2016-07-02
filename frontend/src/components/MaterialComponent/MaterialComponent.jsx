import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import { Link } from 'react-router'
import classes from './MaterialComponent.scss'
import FileDownload from 'material-ui/svg-icons/file/file-download'


const propTypes = {
  materialTitle: PropTypes.string,
  keywords: PropTypes.array,
  dateUploaded: PropTypes.string,
  materialNotifications: PropTypes.number,
  pkgUrl: PropTypes.string,
  user: PropTypes.object,
  owner: PropTypes.string,
  onClickDeletePkg: PropTypes.func,
}

function MaterialComponent({
  materialTitle, keywords, dateUploaded, pkgUrl,
  user, owner, onClickDeletePkg }) {
  const styles = {
    baseStyle: {
      float: 'left',
      width: '220px',
      margin: '8.5px',
      backgroundColor: '#446CB3',
      color: '#ffffff',
      overflow: 'inherit',
      position: 'absolute',
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
      borderStyle: 'solid',
      borderWidth: '1px',
      opacity: '1.0',
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
  }

  let container
  const heading = (
    <div key="headingIndependentPackage" style={styles.divStyle}>
      <h5>{materialTitle}</h5>
      <h5>{dateUploaded}</h5>
    </div>
  )

  if (user && owner && user._id === owner) {
    container = (
      <div key="IndependentPackage">
        <div className={classes.container}>
          {keywords}
        </div>
        <div key="deleteKey" className={classes.deleteButton}>
          <IconButton disableTouchRipple tooltip="Pkg löschen" onTouchTap={onClickDeletePkg}>
            <Delete color="White" />
          </IconButton>
        </div>
        <div className={classes.downloadMaterial}>
          <IconButton disableTouchRipple tooltip="Download-Paket">
            <FileDownload color="White" />
          </IconButton>
        </div>
      </div>
    )
  } else {
    container = (
      <div key="IndependentPackage">
        <div className={classes.container}>
          {keywords}
        </div>
        <div className={classes.downloadMaterial}>
          <IconButton disableTouchRipple tooltip="Download-Paket">
            <FileDownload color="White" />
          </IconButton>
        </div>
      </div>
    )
  }

  /*
  containerOld = (
    <div key="IndependentPackage">
      <div className={classes.container}>
        <h5>{keywords}</h5>
      </div>
    <div key="deleteKey" className={classes.deleteButton}>
      <IconButton disableTouchRipple tooltip="Pkg löschen">
        <Delete color="White" />
      </IconButton>
    </div>
    <div key="editKey" className={classes.editButton}>
      <IconButton disableTouchRipple tooltip="Edit Kurz">
        <Edit color="White" />
      </IconButton>
    </div>
    <div key="downloadKey" className={classes.downloadMaterial}>
      <IconButton disableTouchRipple tooltip="Download-Paket">
        <FileDownload color="White" />
      </IconButton>
    </div>
  </div>
  )

  var notifications = (
    <div key="notifications" className={classes.badge}>
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

MaterialComponent.propTypes = propTypes

export default MaterialComponent
