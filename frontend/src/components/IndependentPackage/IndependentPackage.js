import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import PageView from 'material-ui/svg-icons/action/pageview';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import { Router, Route, Link } from 'react-router'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import classes from './IndependentPackage.scss'
import FileDownload from 'material-ui/svg-icons/file/file-download';

type Props = {

  materialTitle: PropTypes.string,
  materialUrl: PropTypes.string,
  keywords: PropTypes.array,
  dateUploaded: PropTypes.string,
  materialNotifications: PropTypes.number,
  pkgUrl: PropTypes.string,
  ext: PropTypes.string
}

export class IndependentPackage extends React.Component {
  props: Props

  render () {

    //inline styling variables for certain components ...
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
      marginLeft:'-173',
      marginTop: '13'
    }

    const linkContainerStyle = {
      float: 'left',
      height: 32,
      width: 170,
      backgroundColor: '#446CB3',
      color: '#ffffff',
      marginLeft:'-178',
      marginTop: '170'
    }

    const styleTwo = {
      float: 'left',
      height: 170,
      width: 25,
      margin: 8.5,
      backgroundColor: '#ffffff',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 9,
      marginLeft: -34,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3 ',
    }

    const styleThree = {
      float: 'left',
      height: 170,
      width: 22,
      margin: 8.5,
      backgroundColor: '#446CB3 ',
      color: '#ffffff',
      borderTopRightRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 9,
      marginLeft: -36,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3 ',
    }

    const styleFour = {
      float: 'left',
      height: 172,
      width: 10,
      margin: 8.5,
      backgroundColor: '#000000',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 9,
      marginLeft: -179,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      opacity: 0.7,
    }



    const divStyle = {
      textAlign: 'center',
      color: '#ffffff',
      marginLeft:5,
      marginTop: -7,
      opacity: 0.9,
      height: 90,
      textDecoration: 'none'
    }

    const linkStyle = {
      color: '#fff',
      backgroundColor: 'transparent'
    }
    const dots = "..."

    //variables for displaying Child Node
    var heading = <div key="headingIndependentPackage">
                    <div className={classes.head}>
                        <div className={classes.tooltip}>{this.props.materialTitle.slice(0,15).concat(dots)}
                              <span className={classes.tooltiptext}>{this.props.materialTitle}</span>
                        </div>
                    </div>
                    {/*<div style={divStyle}>
                      {<h5>{this.props.dateUploaded}</h5>}
                    </div> */}
                  </div>

    var container = <div key="IndependentPackage" className={classes.container}>
                      <h5>{this.props.keywords}</h5>
                    </div>

    var notifications = <div key="notifications" className={classes.badge}>
                          {/*<Badge
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={{ backgroundColor: '#EF4836', radius: 20}}
                          />*/}
                        </div>

    var download = <div> 
                    <div key="downloadKey" className={classes.downloadPkg}>
                        <a target="_blank" href={this.props.materialUrl} style={linkStyle} ><FileDownload color="White"/></a>
                    </div>
                    <div key="deleteKey" className={classes.deleteButton}>
                      <IconButton tooltip="Pkg löschen">
                        <Delete color="White"/>
                      </IconButton>
                    </div>
                  </div>


    const nodePaperCourse = [
      //notifications,
      heading
    ]

    const downloadAsChild = [
      heading,
      download
    ]

    return (
        <div>
        <Paper style={style} zDepth={2} />
         <Paper style={mainStyle}   />
         <Paper style={linkContainerStyle} children={downloadAsChild}/>
        </div>

    )
  }
}

export default IndependentPackage
