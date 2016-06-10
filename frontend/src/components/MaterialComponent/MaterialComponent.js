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
import classes from './MaterialComponent.scss'
import Edit from 'material-ui/svg-icons/action/track-changes';
import FileDownload from 'material-ui/svg-icons/file/file-download';

type Props = {

  materialTitle: PropTypes.string,
  keywords: PropTypes.array,
  dateUploaded: PropTypes.string,
  materialNotifications: PropTypes.number,
  pkgUrl: PropTypes.string
};
export class MaterialComponent extends React.Component {

  props: Props

  render () {
  	//inline styling variables for certain components ...
    const style = {
      float: 'left',
      height: 172,
      width: 220,
      margin: 8.5,
      backgroundColor: '#446CB3',
      color: '#ffffff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
    }

    const styleTwo = {
      float: 'left',
      height: 30,
      width: 220,
      margin: 8.5,
      backgroundColor: '#ffffff',
      color: '#ffffff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 150,
      marginLeft: -229,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor:'#446CB3',
    }

    const styleThree = {
      float: 'left',
      height: 30,
      width: 220,
      margin: 8.5,
      backgroundColor: '#446CB3',
      color: '#ffffff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 144,
      marginLeft: -229,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3',
    }

    const styleFour = {
      float: 'left',
      height: 80,
      width: 220,
      margin: 8.5,
      backgroundColor:'#446CB3',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 8,
      marginLeft: -229,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3',
      opacity: 1.0,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius:50
    }

    const styleFive = {
      float: 'left',
      height: 30,
      width: 220,
      margin: 8.5,
      backgroundColor: '#446CB3',
      color: '#ffffff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 148,
      marginLeft: -229,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3',
    }

    const styleSix = {
      float: 'left',
      height: 30,
      width: 220,
      margin: 8.5,
      backgroundColor: '#ffffff',
      color: '#ffffff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 147,
      marginLeft: -229,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3',
    }


    const divStyle = {
      textAlign: 'center',
      color: '#ffffff',
      marginLeft:5,
      marginTop: -7,
      opacity: 0.9,
    }

    //variables for displaying Child Node
    var heading = <div key="headingIndependentPackage" style={divStyle}>
                    <h5>{this.props.materialTitle}</h5>
                    {<h5>{this.props.dateUploaded}</h5>}
                  </div>

    var container = <div key="IndependentPackage">
                    <div className={classes.container}>
                      {this.props.keywords}
                    </div>
                    <div className={classes.downloadMaterial}>
                       <IconButton disableTouchRipple={true} tooltip="Download-Paket">
                        <FileDownload color="White"/>
                      </IconButton>
                    </div>
                    </div>

       var containerOld = <div key="IndependentPackage">
                    <div className={classes.container}>
                      <h5>{this.props.keywords}</h5>
                    </div>
                    <div key="deleteKey" className={classes.deleteButton}>
                      <IconButton disableTouchRipple={true} tooltip="Pkg löschen">
                        <Delete color="White"/>
                      </IconButton>
                    </div>
                    <div key="editKey" className={classes.editButton}>
                      <IconButton disableTouchRipple={true} tooltip="Edit Kurz">
                        <Edit color="White"/>
                      </IconButton>
                    </div>
                    <div key="downloadKey" className={classes.downloadMaterial}>
                       <IconButton disableTouchRipple={true} tooltip="Download-Paket">
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

    const nodePaperCourse = [
      container,
      //notifications
    ]

   const nodeFileClipper = [

      heading
    ]

    return (
	    <Link to={this.props.pkgUrl}>
	        <div>
	          <Paper style={style} zDepth={2}  children={nodePaperCourse} />
	          <Paper style={styleTwo} zDepth={0}  />
	          <Paper style={styleFive} zDepth={0}  />
	          <Paper style={styleSix} zDepth={0}  />
	          <Paper style={styleThree} zDepth={0}  />
	          <Paper style={styleFour} zDepth={5} children={nodeFileClipper} />
	        </div>
	      </Link>
    )
  }
}

export default MaterialComponent
