import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import PageView from 'material-ui/svg-icons/action/pageview';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import LibraryAdd from 'material-ui/svg-icons/av/library-add';
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
      overflow: 'inherit'
    }

    const contentStyle = {
      float: 'left',
      width: 300,
      height: 130,
      backgroundColor: '#446CB3',
      color: 'white',
      borderRadius: 13
    }

    const actionStyle = {
      float: 'left',
      width: 300,
      backgroundColor: '#446CB3',
      color: 'white',
      borderRadius: 13
    }


    const divStyle = {
      textAlign: 'center',
    }

    const iconStyles = {
      backgroundColor:'white',
    }

    const paperActions = {
      // display: 'flex',
      //    boxSizing:'border-box',
      //    alignItems: 'center',
      float:'left',
    }

    const mainActionStyle = {
      opacity: 0.5,
    }

    //variables for displaying Child Node
    var actionsCourse = <div key="actionCourseDiv" className={classes.actionMain} >
                            <div className={classes.actionFollow} >
                              <IconButton disableTouchRipple={true} disabled={this.props.following} onClick={this.props.onClickFollow} tooltip="Kurs folgen">
                              <LibraryAdd color='white' /></IconButton>
                            </div>
                            <div className={classes.actionPostionLeft}>
                              <IconButton disableTouchRipple={true} tooltip="Kurs löschen">
                              <Delete color='white' /></IconButton>
                            </div>
                            <div className={classes.actionPosition}>
                              <IconButton disableTouchRipple={true} containerElement={<Link to={this.props.courseUrl} />} linkButton={true} tooltip="Zum Kurs">
                              <PageView color='white' />
                              </IconButton>
                            </div>
                          </div> ;

  var heading =
    <div key="headingCourses" style={divStyle}>
      <h4>{this.props.titleCourse}</h4>
        <div className={classes.badge}>
        {/*<Badge
          badgeContent={10}
          secondary={true}
          badgeStyle={{ backgroundColor: '#EF4836', radius: 20}}
          ></Badge>*/}
        </div>
      </div>
  var container =<div key="containerCourse" className={classes.container}> <h5>{this.props.universityCourse}</h5><h6>{this.props.courseTeacher}</h6></div> ;

  const nodePaperCourse = [

      heading,
      container
      ];

  const cardActions = [
    actionsCourse
  ]

    return (
          <div>
              <Paper style={style} zDepth={1}>
                <Link to={this.props.courseUrl}>
                  <Paper style={contentStyle} zDepth={0} children={nodePaperCourse} />
                </Link>
                <Paper style={actionStyle} zDepth={0} children={cardActions} />
              </Paper>
          </div>
    )
  }
}

const connectToCourseView = () => ({

  })



export default CourseCard
