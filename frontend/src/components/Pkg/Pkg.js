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
import classes from './Pkg.scss'
import Edit from 'material-ui/svg-icons/action/track-changes';
import FileDownload from 'material-ui/svg-icons/file/file-download';


type Props = {
  materialTitle: PropTypes.string,
  materialUrl: PropTypes.string,
  keywords: PropTypes.array,
  dateUploaded: PropTypes.string,
  materialNotifications: PropTypes.number,
  pkgUrl: PropTypes.string,
  ext: PropTypes.string
};

export class Pkg extends React.Component {
  props: Props;

  render () {

  		//inline styling variables for certain components ...
    const style = {
      float: 'left',
      height: 172,
      width: 170,
      margin: 8.5,
      backgroundColor: '#446CB3',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
    }

    const styleTwo = {
      float: 'left',
      height: 30,
      width: 170,
      margin: 8.5,
      backgroundColor: '#446CB3',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 152,
      marginLeft: -178,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor:'#446CB3',
    }

    const styleFour = {
      float: 'left',
      height: 140,
      width: 166,
      margin: 8.5,
      backgroundColor:'#ffffff',
      color: '#446CB3',
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 11,
      marginLeft: -176,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3',
      opacity: 1.0,
      zDepth:1
    }


    const divStyle = {
      textAlign: 'center',
      color: '#446CB3',
      marginLeft:5,
      marginTop: 20,
      opacity: 0.9,

    }

     const linkStyle = {
      color: '#fff',
      backgroundColor: 'transparent'
    }

    const dots = "..."
    var preparedTitle
    var preparedIcon

    preparedIcon = <Delete color='#26A65B' />
    //variables for displaying Child Node

    var heading = <div key="headingIndependentPackage" style={divStyle}>
                   {preparedIcon}
                   <br/>
                   <h5>{this.props.dateUploaded}</h5>
                  </div>

    var container = <div key="IndependentPackage">
                    <div className={classes.container}>
                      {this.props.keywords}
                    </div>
                    <div className={classes.downloadMaterial}>
                       <IconButton tooltip="Download-Paket">
                        <FileDownload color="White"/>
                      </IconButton>
                    </div>
                    </div>

    var notifications = <div key="notifications" className={classes.badge}>
    {/*<Badge
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={{ backgroundColor: '#EF4836', radius: 20}}
                          />*/}
                        </div>

    if( this.props.materialTitle.length > 15 )
    	preparedTitle = this.props.materialTitle.slice(0,15).concat(dots)
	else 
    	preparedTitle = this.props.materialTitle

    var actionSlot = <div key="actionSlot" className={classes.tooltip}>{preparedTitle}
                              <span className={classes.tooltiptext}>{this.props.materialTitle}</span>
                        </div>

    var downloadPkt = <div key="downloadKey" className={classes.downloadPkg}>
                        <a target="_blank" href={this.props.materialUrl} style={linkStyle} ><FileDownload color="White"/></a>
                      </div>

    const nodePaperCourse = [
      heading
      //notifications
    ]

   const nodeFileClipper = [

      
    ]

    const action = [

      actionSlot,
      downloadPkt

    ]

    return (
      <div>
      	<Paper style={style} zDepth={3}  children={nodePaperCourse} />
	    <Paper style={styleTwo} zDepth={0} children={action} />
	    <Paper style={styleFour} zDepth={0} children={nodeFileClipper} />
      </div>
    )
  }
}

export default Pkg

