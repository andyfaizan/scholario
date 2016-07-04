import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import PageView from 'material-ui/svg-icons/action/pageview'
import LibraryAdd from 'material-ui/svg-icons/av/library-add'
import classes from './CourseCard.scss'


const propTypes = {
  titleCourse: PropTypes.string,
  universityCourse: PropTypes.string,
  courseTeacher: PropTypes.string,
  notifications: PropTypes.number,
  courseUrl: PropTypes.string,
  onClickFollow: PropTypes.func,
  following: PropTypes.bool,
}

function CourseCard({
  titleCourse, universityCourse, courseTeacher,
  following, courseUrl, onClickFollow }) {
  const styles = {
    style: {
      float: 'left',
      height: '170px',
      width: '300px',
      margin: '8.5px',
      backgroundColor: '#446CB3',
      color: 'white',
      borderRadius: '13px',
      overflow: 'inherit',
    },
    contentStyle: {
      float: 'left',
      width: '300px',
      height: '130px',
      backgroundColor: '#446CB3',
      color: 'white',
      borderRadius: '13px',
    },
    actionStyle: {
      float: 'left',
      width: '300px',
      backgroundColor: '#446CB3',
      color: 'white',
      borderRadius: '13px',
    },
    actionPosition: {
      position: 'absolute',
      float: 'left',
      margin: 'auto',
    },

  }

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
      <div className={styles.actionPosition}>
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
    <div key="headingCourses" className={classes.divStyle}>
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
      <Paper style={styles.style} zDepth={1}>
        <Link to={courseUrl}>
          <Paper style={styles.contentStyle} zDepth={0} children={nodePaperCourse} />
        </Link>
        <Paper style={styles.actionStyle} zDepth={0} children={cardActions} />
      </Paper>
    </div>
  )
}

CourseCard.propTypes = propTypes

export default CourseCard
