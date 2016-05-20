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
import LibraryAdd from 'material-ui/lib/svg-icons/av/library-add'
import browserHistory from '../../history'
import { Router, Route, Link } from 'react-router'
import classes from './CourseCard.scss'

type Props = {
  titleCourse: PropTypes.string,
  universityCourse: PropTypes.string,
  courseTeacher: PropTypes.string,
  notifications: PropTypes.number,
  courseUrl: PropTypes.string,
  onClickFollow: PropTypes.func
}

export class CourseCard extends React.Component {
  props: Props

  render () {

    //inline styling variables for certain components ...
    const style = {
      float: 'left',
      height: 170,
      width: 300,
      margin: 8.5,
      backgroundColor: '#446CB3',
      color: 'white',
      borderRadius: 13,
      overflow: 'inherit',
    }

    const divStyle = {
      textAlign: 'center',
    }

    const iconStyles = {
      backgroundColor:'white',
    }

    const paperActions = {
      // display: 'flex',
      // 		boxSizing:'border-box',
      // 		alignItems: 'center',
      float:'left',
    }

    const mainActionStyle = {
      opacity: 0.5,
    }

    //variables for displaying Child Node
    var actionsCourse = <div key="actionCourseDiv" className={classes.actionMain} >
						<div className={classes.actionFollow} >
						<IconButton disabled={this.props.following} onClick={this.props.onClickFollow} tooltip="Kurz folgen">
						<LibraryAdd color='white' /></IconButton>	
						</div>
						<div className={classes.actionPostionLeft}>
						<IconButton tooltip="Kurz löschen">
						<Delete color='white' /></IconButton>
						</div><div className={classes.actionPosition}>
						<IconButton containerElement={<Link to={this.props.courseUrl} />} linkButton={true} tooltip="Zum Kurs">
						<PageView color='white' />
						</IconButton></div></div> ;

	var heading = <div key="headingCourses" style={divStyle}><h4>{this.props.titleCourse}</h4><div className={classes.badge}><Badge
      badgeContent={10}
      secondary={true}
      badgeStyle={{ backgroundColor: '#EF4836', radius: 20}}
      ></Badge></div></div>;
	var container =<div key="containerCourse" className={classes.container}> <h5>{this.props.universityCourse}</h5><h6>{this.props.courseTeacher}</h6><h6>{this.props.courseTeacher}</h6></div> ;

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

