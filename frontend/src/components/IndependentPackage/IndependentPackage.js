import React, { PropTypes } from 'react'
import Paper from 'material-ui/lib/paper'
import Divider from 'material-ui/lib/divider'
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button'
import Delete from 'material-ui/lib/svg-icons/action/delete'
import PageView from 'material-ui/lib/svg-icons/action/pageview'
import FlatButton from 'material-ui/lib/flat-button'
import Badge from 'material-ui/lib/badge'
import { Router, Route, Link } from 'react-router'
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications'
import classes from './IndependentPackage.scss'

type Props = {

	materialTitle: string,
	keywords:array,
	dateUploaded:string,
	semesterInstance: string,
	materialNotifications: number

};
export class IndependentPackage extends React.Component {
   
   static propTypes = {
    materialTitle: PropTypes.string,
    keywords: PropTypes.array,
    dateUploaded: PropTypes.string,
    semesterInstance: PropTypes.string,
    materialNotifications:PropTypes.number
  };
  render () {

  	//inline styling variables for certain components ...
	const style = {
	  float: 'left',
	  height: 170,
	  width: 170,
	  margin: 8.5,
	  backgroundColor: '#F9690E',
	  color: '#ffffff',
	  borderTopRightRadius: 20,
	  borderBottomRightRadius:20,
	  overflow: 'inherit',
	  alignItems: 'center'

	};

	const divStyle = {
		textAlign: 'center',
		color: '#ffffff'

	};

	//variables for displaying Child Node
	var heading = <div key="headingMaterials" style={divStyle}><h4>{this.props.materialTitle}</h4>
				  <div className={classes.badge}><Badge
      			badgeContent={this.props.materialNotifications}
      			secondary={true}
      			badgeStyle={{ backgroundColor: '#EF4836', radius: 20}}
      			></Badge></div></div>;

    var actionsCourse = <div key="actionMaterialsDiv" className={classes.actionMain} >
    					<div className={classes.actionPostionLeft}><IconButton tooltip="Delete Course"> 
    					<Delete color='#ffffff' /> </IconButton></div><div className={classes.actionPosition}>
						<IconButton linkButton={true} tooltip="Go to Detail Course">
						<PageView color='#ffffff' />
						</IconButton></div></div> ;

	var container =<div key="containerMaterial" className={classes.container}> 
				   <h5>Keywords: {this.props.keywords}</h5>
				   <h6>Semester Instance:{this.props.semesterInstance}</h6>
				   <h6>Date Uploaded: {this.props.dateUploaded}</h6></div> ;

	const nodePaperCourse = [
      heading
    ];

    return (
      <div>
        <Paper style={style} zDepth={1} children={nodePaperCourse}  />   
      </div>
    )
  }
}

export default IndependentPackage

