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
import browserHistory from '../../history'
import { Router, Route, Link } from 'react-router'

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
	  height: 170,
	  width: 300,
	  margin: 8.5,
	  backgroundColor: '#1690DB',
	  color: 'white',
	  borderRadius: 13,
	  overflow: 'auto' 
	};

	const divStyle = {
		textAlign: 'center'

	};

	const iconStyles = {
  		backgroundColor:'white'
	};

	const paperActions = {
		// display: 'flex',
  // 		boxSizing:'border-box',
  // 		alignItems: 'center',
  		float:'left'

	};

	const styleActions = {

		// marginRight: 80,
  // 		marginLeft: 80,
  float:'right'
	};

	const mainActionStyle = {

		opacity: 0.5,
		marginBottom: 20
	}

	//variables for displaying Child Node
	var actionsCourse = <div style={mainActionStyle} ><div style={paperActions}><IconButton tooltip="Delete Course"> <Delete color='white' /> </IconButton></div><div style ={styleActions}><IconButton tooltip="Delete Course"> <Delete color='white' /> </IconButton>
	<IconButton containerElement= {<Link to='course'  />} linkButton={true} tooltip="Go to Detail Course"><PageView color='white' /></IconButton></div></div> ;
	var heading = <div style={divStyle}><h4>{this.props.titleCourse}</h4></div>;
	var container =<div> <h5>{this.props.universityCourse}</h5><h6>{this.props.courseTeacher}</h6><br/></div> ;

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

const connectToCourseView = () => ({

  })



export default CourseCard

