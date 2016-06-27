import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import classes from './IndependentPackage.scss'
import FileDownload from 'material-ui/svg-icons/file/file-download'

function IndependentPackage({ materialTitle, materialUrl }) {
  const dots = '...'

  const heading = (
    <div key="headingIndependentPackage">
      <div className={classes.head}>
        <div className={classes.tooltip}>{materialTitle.slice(0, 15).concat(dots)}
          <span className={classes.tooltiptext}>{materialTitle}</span>
        </div>
      </div>
    </div>
  )

  /* const container = (
    <div key="IndependentPackage" className={classes.container}>
      <h5>{keywords}</h5>
    </div>
  )*/

   /* const notifications = (
    <div key="notifications" className={classes.badge}>
       <Badge
          badgeContent={10}
          secondary={true}
          badgeStyle={{ backgroundColor: '#EF4836', radius: 20}}
      />
    </div>
  )*/

  const download = (
    <div>
      <div key="downloadKey" className={classes.downloadPkg}>
        <a target="_blank" href={materialUrl} style={classes.linkStyle} ><FileDownload color="White" /></a>
      </div>
      <div key="deleteKey" className={classes.deleteButton}>
        <IconButton tooltip="Pkg löschen">
          <Delete color="White" />
        </IconButton>
      </div>
    </div>)

  const downloadAsChild = [
    heading,
    download,
  ]

  return (
    <div>
      <Paper style={classes.style} zDepth={2} />
      <Paper style={classes.mainStyle} />
      <Paper style={classes.linkContainerStyle} children={downloadAsChild} />
    </div>
  )
}

IndependentPackage.propTypes = {
  materialTitle: PropTypes.string,
  materialUrl: PropTypes.string,
  keywords: PropTypes.array,
  dateUploaded: PropTypes.string,
  materialNotifications: PropTypes.number,
  pkgUrl: PropTypes.string,
  ext: PropTypes.string,
}

export default IndependentPackage
