import React, { PropTypes } from 'react'
import Paper from 'material-ui/lib/paper'
import Divider from 'material-ui/lib/divider'
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button'
import Delete from 'material-ui/lib/svg-icons/action/delete'
import PageView from 'material-ui/lib/svg-icons/action/pageview'
import FlatButton from 'material-ui/lib/flat-button'
import Badge from 'material-ui/lib/badge'
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications'

type Props = {

	titleCourse: string,
	universityCourse: string,
	courseTeacher: string,
	notifications:number,
	courseUrl: string
};
export class CourseCard extends React.Component {
 static propTypes = {
    titleCourse: PropTypes.string.isRequired,
    universityCourse: PropTypes.string.isRequired,
    courseTeacher: PropTypes.string.isRequired,
    notifications: PropTypes.number,
    courseUrl: PropTypes.string.isRequired
  };
  render () {

  	//inline styling variables for certain components ...
	const style = {
	  float: 'left',
	  height: 220,
	  width: 170,
	  margin: 8.5
	};

	const divStyle = {
		textAlign: 'center'

	};

	const iconStyles = {
  		marginRight: 24
	};

	const divStyleActions = {
		float:'right'
	};

	//variables for displaying Child Node
	var actionsCourse = <div style={divStyleActions}><Badge badgeContent={this.props.notifications} primary={true}><NotificationsIcon /></Badge><IconButton tooltip="Delete Course"> <Delete /> </IconButton><IconButton tooltip="Go to Detail Course"> <PageView /> </IconButton></div> ;
	var heading = <div style={divStyle}><h1>{this.props.titleCourse}</h1> <Divider /> </div>;
	var container =<div> <h4>{this.props.universityCourse}</h4><h6>{this.props.courseTeacher}</h6><br/> <Divider /><br/></div> ;

	const nodePaperCourse = [
      
      heading,
	  container,
      actionsCourse
      
      ];

    return (
      <div>
        <Paper style={style} zDepth={1} children={nodePaperCourse}  />   
      </div>
    )
  }
}

export default CourseCard

