import React, { PropTypes } from 'react'
import { Link } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import classes from './Pkg.scss'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import Pdf from './pdf.png'
import Bmp from './bmp.png'
import Doc from './doc.png'
import Jpg from './jpg.png'
import MpFour from './mp4.png'
import MpThree from './mp3.png'
import Png from './png.png'
import Ppt from './ppt.png'
import Txt from './txt.png'
import Xls from './xls.png'
import Folder from './folder.png'


const propTypes = {
  materialTitle: PropTypes.string,
  materialUrl: PropTypes.string,
  keywords: PropTypes.array,
  dateUploaded: PropTypes.string,
  materialNotifications: PropTypes.number,
  pkgUrl: PropTypes.string,
  pkgOwner: PropTypes.object,
  user: PropTypes.object,
  ext: PropTypes.string,
  onClickDeleteMaterial: PropTypes.func,
}

export class Pkg extends React.Component {
  constructor(props) {
    super(props)
    this.getDateFromZulu = this.getDateFromZulu.bind(this)
  }

  getDateFromZulu(dateString) {
    const dateParts = dateString.slice(0, 10).split('-')
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }

  render() {
    const { user, pkgOwner } = this.props
    const icons = {
      '.bmp': Bmp,
      '.doc': Doc,
      '.jpg': Jpg,
      '.mp3': MpThree,
      '.mp4': MpFour,
      '.pdf': Pdf,
      '.png': Png,
      '.ppt': Ppt,
      '.txt': Txt,
      '.xls': Xls,
    }
    const icon = this.props.ext in icons ? icons[this.props.ext] : Folder
    const dots = '...'
    let preparedTitle

    const preparedIcon = (
      <div className={classes.posImg}>
        <img className={classes.imgStyle} src={icon} alt={this.props.ext.slice(1)} />
      </div>
    )

    const heading = (
      <div key="headingIndependentPackage" className={classes.divStyle}>
        {preparedIcon}
        <br />
        <h5>{this.getDateFromZulu(this.props.dateUploaded)}</h5>
      </div>
    )

    if (this.props.materialTitle.length > 10) {
      preparedTitle = this.props.materialTitle.slice(0, 10).concat(dots)
    } else {
      preparedTitle = this.props.materialTitle
    }

    const actionSlot = (
      <div key="actionSlot" className={classes.tooltip}>{preparedTitle}
        <span className={classes.tooltiptext}>{this.props.materialTitle}</span>
      </div>
    )

    const downloadPkt = (
      <div>
        <div key="downloadKey" className={classes.downloadPkg}>
          <a
            target="_blank" href={this.props.materialUrl}
            className={classes.linkStyle}
          >
            <FileDownload color="White" />
          </a>
        </div>
      </div>
    )

    let deleteMaterialIcon
    if (user && pkgOwner && user._id === pkgOwner._id) {
      deleteMaterialIcon = (
        <div key="deleteKey" className={classes.deleteButton}>
          <IconButton disableTouchRipple tooltip="Pkg löschen" onTouchTap={this.props.onClickDeleteMaterial} >
            <Delete color="White" />
          </IconButton>
        </div>
      )
    }

    const nodePaperCourse = [
      heading,
      // notifications
    ]
    const nodeFileClipper = [
    ]
    const action = [
      actionSlot,
      downloadPkt,
      deleteMaterialIcon,
    ]

    return (
      <div>
        <Link to={this.props.pkgUrl}>
          <Paper className={classes.style} zDepth={3} children={nodePaperCourse} />
        </Link>
        <Paper className={classes.styleTwo} zDepth={0} children={action} />
        <Paper className={classes.styleFour} zDepth={0} children={nodeFileClipper} />
      </div>
    )
  }
}

Pkg.propTypes = propTypes

export default Pkg
