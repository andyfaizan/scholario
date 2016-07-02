import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import CardHeader from 'material-ui/Card/CardHeader'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import Friend from 'material-ui/svg-icons/social/person'
import classes from './CourseInfoBar.scss'
import { Link } from 'react-router'


function CourseInfoBar({
  courseTitle, teachersName, semesterInstance, shortInformation,
  courseUrl, participantsNum, pkgName }) {
  let labelForPkgName
  let courseName
  let displayPkg

  if (pkgName) {
    labelForPkgName = pkgName
    courseName = `${courseTitle} :`
    displayPkg = (
      <div className={classes.pkgName}>
        <FlatButton label={labelForPkgName} className={classes.titleStyle} primary={false} />
      </div>
    )
  } else {
    labelForPkgName = null
    displayPkg = null
    courseName = courseTitle
  }

  return (
    <div>
      <Card>
        <Toolbar className={classes.toolbarStyle} >
          <ToolbarGroup float="left">
            <FlatButton
              containerElement={<Link to={courseUrl} />}
              className={classes.titleStyle}
              label={courseName}
              primary={false}
            />
            {displayPkg}
          </ToolbarGroup>
        </Toolbar>
        <CardHeader
          title={teachersName}
          subtitle={semesterInstance}
          actAsExpander
          showExpandableButton
          className={classes.text}
          titleColor="#26A65B"
        />
        <Divider />
        <CardText expandable>
          <div className={classes.actionPosition} >
            {shortInformation}
          </div>
        </CardText>
        <CardActions expandable >
          <div className={classes.actionPosition} >
            <Friend color="#26A65B" />
            <div className={classes.linkColor} >
              {participantsNum}
            </div>
          </div>
          {/*
          <FlatButton label="Bearbeiten Kurs"
            hoverColor="#26A65B" />
          <FlatButton label="löschen Kurs"
            hoverColor="#26A65B" />
          <FlatButton label="Paket bearbeiten"
            hoverColor="#26A65B" />
          <FlatButton label="löschen von Paketen"
            hoverColor="#26A65B" />
          <FlatButton label="Material bearbeiten"
            hoverColor="#26A65B" />
          <FlatButton label="löschen-Material"
            hoverColor="#26A65B" />
            */}
        </CardActions>
      </Card>
    </div>
  )
}

CourseInfoBar.propTypes = {
  courseTitle: PropTypes.string,
  teachersName: PropTypes.string,
  assistantsName: PropTypes.string,
  universityName: PropTypes.string,
  programeName: PropTypes.string,
  semesterInstance: PropTypes.string,
  shortInformation: PropTypes.string,
  courseVotes: PropTypes.string,
  courseUrl: PropTypes.string,
  courseFollowers: PropTypes.array,
  participantsNum: PropTypes.number,
  topFiveUsersProfileLink: PropTypes.array,
  userRole: PropTypes.string,
  pkgName: PropTypes.string,
}

export default CourseInfoBar
