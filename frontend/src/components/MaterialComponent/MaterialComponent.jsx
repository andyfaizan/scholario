import React, { PropTypes } from 'react'
import Radium from 'radium'
import { Link } from 'react-router'

import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import FileDownload from 'material-ui/svg-icons/file/file-download'

import ReactTooltip from 'react-tooltip'

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
  downloadUrl: PropTypes.string,
  keywords: PropTypes.array,
  dateUploaded: PropTypes.string,
  materialNotifications: PropTypes.number,
  materialOwner: PropTypes.object,
  user: PropTypes.object,
  ext: PropTypes.string,
  onClickDeleteMaterial: PropTypes.func,
}

export class MaterialComponent extends React.Component {
  constructor(props) {
    super(props)
    this.getDateFromZulu = this.getDateFromZulu.bind(this)
  }

  getDateFromZulu(dateString) {
    const dateParts = dateString.slice(0, 10).split('-')
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }

  render() {
    const styles = getStyles()

    const { user, materialOwner } = this.props
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
      <div style={styles.posImg}>
        <img style={styles.imgStyle} src={icon} alt={this.props.ext.slice(1)} />
      </div>
    )

    const heading = (
      <div key="headingIndependentPackage" style={styles.divStyle}>
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
      <div key="actionSlot">
        <a data-tip data-for={preparedTitle}>
          {preparedTitle}
        </a>
        <ReactTooltip
          id={preparedTitle}
          type="info"
          effect="float"
        >
          <span>{this.props.materialTitle}</span>
        </ReactTooltip>
      </div>
    )

    const downloadPkt = (
      <div>
        <div key="downloadKey" style={styles.downloadMaterial}>
          <a
            target="_blank" href={this.props.downloadUrl}
            style={styles.linkStyle}
          >
            <FileDownload color="White" />
          </a>
        </div>
      </div>
    )

    let deleteMaterialIcon
    if (user && materialOwner && user._id === materialOwner._id) {
      deleteMaterialIcon = (
        <div key="deleteKey" style={styles.deleteButton}>
          <IconButton disableTouchRipple tooltip="Material löschen" onTouchTap={this.props.onClickDeleteMaterial} >
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
        <Link to={this.props.materialUrl}>
          <Paper style={styles.style} zDepth={3} children={nodePaperCourse} />
        </Link>
        <Paper style={styles.styleTwo} zDepth={0} children={action} />
        <Paper style={styles.styleFour} zDepth={0} children={nodeFileClipper} />
      </div>
    )
  }
}

function getStyles() {
  return {
    actionPosition: {
      position: 'absolute',
      margin: 'auto',
      marginTop: '90px',
      marginLeft: '250px',
    },
    actionPostionLeft: {
      position: 'absolute',
      margin: 'auto',
      marginTop: '90px',
    },
    badge: {
      position: 'absolute',
      margin: 'auto',
      marginTop: '20px',
      marginLeft: '172px',
      opacity: 1.0,
    },
    actionMain: {
      position: 'absolute',
      opacity: 0.6,
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
      marginLeft: '105px',
      marginTop: '-3.0em',
      opacity: '0.6',
    },
    editButton: {
      position: 'absolute',
      marginLeft: '20px',
      marginTop: '0px',
      opacity: 0.8,
    },
    divTitle: {
      float: 'left',
    },
    posImg: {
      marginLeft: '58px',
    },
    tooltip: {
      position: 'relative',
      display: 'inline-block',
      marginLeft: '6px',
      tooltiptext: {
        visibility: 'hidden',
        width: '120px',
        backgroundColor: 'black',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '6px',
        padding: '5px 0',

        /* Position the tooltip */
        position: 'absolute',
        zIndex: 1,
      },
      ':hover': {
        visibility: 'visible',
      },
    },
    downloadMaterial: {
      opacity: 0.6,
      positon: 'absolute',
      marginTop: '-1.4em',
      marginLeft: '140px',
    },
    imgStyle: {
      display: 'block',
      width: '34%',
      marginTop: '1.5rem',
    },
    style: {
      float: 'left',
      height: '172px',
      width: '170px',
      margin: '8.5px',
      backgroundColor: '#446CB3',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
    },
    styleTwo: {
      float: 'left',
      height: '30px',
      width: '170px',
      backgroundColor: '#446CB3',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
      margin: 'auto',
      marginTop: '152px',
      marginLeft: '-178px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#446CB3',
    },
    styleFour: {
      float: 'left',
      height: '140px',
      width: '166px',
      backgroundColor: '#ffffff',
      color: '#446CB3',
      overflow: 'inherit',
      alignItems: 'center',
      margin: 'auto',
      marginTop: '11px',
      marginLeft: '-176px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#446CB3',
      opacity: 1.0,
      zIndex: 1,
    },
    divStyle: {
      textAlign: 'center',
      color: '#446CB3',
      marginLeft: '5px',
      marginTop: '30px',
      opacity: 0.9,
      alignContent: 'center',
    },
    linkStyle: {
      color: '#fff',
      backgroundColor: 'transparent',
    },
  }
}

MaterialComponent.propTypes = propTypes

export default Radium(MaterialComponent)
