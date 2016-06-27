import React, { PropTypes } from 'react'
import { Link } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import PageView from 'material-ui/svg-icons/action/pageview'
import LibraryAdd from 'material-ui/svg-icons/av/library-add'
import classes from './CourseCard.scss'

function CourseCard({
  titleCourse, universityCourse, courseTeacher,
  following, courseUrl, onClickFollow }) {
  // Variables for displaying Child Node
  const actionsCourse = (
    <div key="actionCourseDiv" className={classes.actionMain} >
      <div className={classes.actionFollow} >
        <IconButton
          disableTouchRipple
          disabled={following}
          onClick={onClickFollow}
          tooltip="Kurs folgen"
        >
          <LibraryAdd color="white" />
        </IconButton>
      </div>
      <div className={classes.actionPostionLeft}>
        <IconButton disableTouchRipple tooltip="Kurs löschen">
          <Delete color="white" />
        </IconButton>
      </div>
      <div className={classes.actionPosition}>
        <IconButton
          disableTouchRipple
          containerElement={<Link to={courseUrl} />}
          linkButton
          tooltip="Zum Kurs"
        >
          <PageView color="white" />
        </IconButton>
      </div>
    </div>
  )

  const heading = (
    <div key="headingCourses" style={classes.divStyle}>
      <h4>{titleCourse}</h4>
      <div className={classes.badge}>
      {/* <Badge
        badgeContent={10}
        secondary={true}
        badgeStyle={{ backgroundColor: '#EF4836', radius: 20}}
        ></Badge>*/}
      </div>
    </div>
  )

  const container = (
    <div key="containerCourse" className={classes.container}>
      <h5>{universityCourse}</h5>
      <h6>{courseTeacher}</h6>
    </div>
  )

  const nodePaperCourse = [
    heading,
    container,
  ]

  const cardActions = [
    actionsCourse,
  ]

  return (
    <div>
      <Paper style={classes.style} zDepth={1}>
        <Link to={courseUrl}>
          <Paper style={classes.contentStyle} zDepth={0} children={nodePaperCourse} />
        </Link>
        <Paper style={classes.actionStyle} zDepth={0} children={cardActions} />
      </Paper>
    </div>
  )
}

CourseCard.propTypes = {
  titleCourse: PropTypes.string,
  universityCourse: PropTypes.string,
  courseTeacher: PropTypes.string,
  notifications: PropTypes.number,
  courseUrl: PropTypes.string,
  onClickFollow: PropTypes.func,
  following: PropTypes.bool,
}

export default CourseCard
