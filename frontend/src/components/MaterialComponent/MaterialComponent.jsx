import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import { Link } from 'react-router'
import classes from './MaterialComponent.scss'
import FileDownload from 'material-ui/svg-icons/file/file-download'

function MaterialComponent({ materialTitle, keywords, dateUploaded, pkgUrl }) {
  const { user, owner, onClickDeletePkg } = this.props
  let container

  const heading = (
    <div key="headingIndependentPackage" style={classes.divStyle}>
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
          {this.props.keywords}
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
      <Paper style={classes.style} zDepth={2} children={nodePaperCourse} />
      <Link to={pkgUrl}>
        <Paper style={classes.styleTwo} zDepth={0} />
        <Paper style={classes.styleFive} zDepth={0} />
        <Paper style={classes.styleSix} zDepth={0} />
        <Paper style={classes.styleThree} zDepth={0} />
        <Paper style={classes.styleFour} zDepth={5} children={nodeFileClipper} />
      </Link>
    </div>
  )
}

MaterialComponent.propTypes = {
  materialTitle: PropTypes.string,
  keywords: PropTypes.array,
  dateUploaded: PropTypes.string,
  materialNotifications: PropTypes.number,
  pkgUrl: PropTypes.string,
  user: PropTypes.object,
  owner: PropTypes.object,
  onClickDeletePkg: PropTypes.Function,
}

export default MaterialComponent
