import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import classes from './IndependentPackage.scss'
import FileDownload from 'material-ui/svg-icons/file/file-download'

function IndependentPackage({
  materialTitle, materialUrl, keywords, dateUploaded,
  materialNotifications, pkgUrl, ext }) {
  const style = {
    float: 'left',
    height: 172,
    width: 170,
    margin: 8.5,
    backgroundColor: '#446CB3 ',
    color: '#ffffff',
  }

  const mainStyle = {
    float: 'left',
    height: 160,
    width: 160,
    backgroundColor: '#ffffff',
    color: '#446CB3',
    alignItems: 'center',
    marginLeft: '-173',
    marginTop: '13',
  }

  const linkContainerStyle = {
    float: 'left',
    height: 32,
    width: 170,
    backgroundColor: '#446CB3',
    color: '#ffffff',
    marginLeft: '-178',
    marginTop: '170',
  }

  const linkStyle = {
    color: '#fff',
    backgroundColor: 'transparent',
  }

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

  const container = (
    <div key="IndependentPackage" className={classes.container}>
      <h5>{keywords}</h5>
    </div>
  )

  const notifications = (
    <div key="notifications" className={classes.badge}>
      {/* <Badge
          badgeContent={10}
          secondary={true}
          badgeStyle={{ backgroundColor: '#EF4836', radius: 20}}
      />*/}
    </div>
  )

  const download = (
    <div>
      <div key="downloadKey" className={classes.downloadPkg}>
        <a target="_blank" href={materialUrl} style={linkStyle} ><FileDownload color="White" /></a>
      </div>
      <div key="deleteKey" className={classes.deleteButton}>
        <IconButton tooltip="Pkg löschen">
          <Delete color="White" />
        </IconButton>
      </div>
    </div>)

  const nodePaperCourse = [
    heading,
  ]

  const downloadAsChild = [
    heading,
    download,
  ]

  return (
        <div>
          <Paper style={style} zDepth={2} />
          <Paper style={mainStyle} />
          <Paper style={linkContainerStyle} children={downloadAsChild} />
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
