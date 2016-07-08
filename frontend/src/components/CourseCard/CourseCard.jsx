import React, { PropTypes } from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import PageView from 'material-ui/svg-icons/action/pageview'
import LibraryAdd from 'material-ui/svg-icons/av/library-add'


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
  const styles = getStyles()

  const actionsCourse = (
    <div key="actionCourseDiv" style={styles.actionMain} >
      <div style={styles.actionFollow} >
        <IconButton
          disableTouchRipple
          disabled={following}
          onClick={onClickFollow}
          tooltip="Kurs folgen"
        >
          <LibraryAdd color="white" />
        </IconButton>
      </div>
      <div style={styles.actionPostionLeft}>
        <IconButton disableTouchRipple tooltip="Kurs löschen">
          <Delete color="white" />
        </IconButton>
      </div>
      <div style={styles.actionPosition}>
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
    <div key="headingCourses" style={styles.divStyle}>
      <h4>{titleCourse}</h4>
      <div style={styles.badge}>
      {/* <Badge
        badgeContent={10}
        secondary={true}
        badgeStyle={{ backgroundColor: '#EF4836', radius: 20}}
        ></Badge>*/}
      </div>
    </div>
  )

  const container = (
    <div key="containerCourse" style={styles.container}>
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

function getStyles() {
  return {
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
    actionPostionLeft: {
      position: 'absolute',
      float: 'right',
      marginLeft: '250px',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
    },
    actionFollow: {
      position: 'absolute',
      marginLeft: '30px',
    },
    badge: {
      position: 'absolute',
      float: 'left',
      marginLeft: '270px',
      marginTop: '-45px',
      marginRight: 'auto',
      marginBottom: 'auto',
    },
    actionMain: {
      position: 'absolute',
      opacity: 0.5,
    },
    container: {
      position: 'absolute',
      opacity: 0.7,
      paddingLeft: '3px',
      paddingTop: '3px',
      paddingRight: '3px',
    },
    divStyle: {
      textAlign: 'center',
    },
    iconStyles: {
      backgroundColor: 'white',
    },
    paperActions: {
      float: 'left',
    },
    mainActionStyle: {
      opacity: 0.5,
    },
  }
}

CourseCard.propTypes = propTypes

export default Radium(CourseCard)
