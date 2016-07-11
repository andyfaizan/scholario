import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'

import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import CardHeader from 'material-ui/Card/CardHeader'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import Friend from 'material-ui/svg-icons/social/person'


const propTypes = {
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

function CourseInfoBar({
  courseTitle, teachersName, semesterInstance, shortInformation,
  courseUrl, participantsNum, pkgName }) {
  const styles = getStyles()

  let labelForPkgName
  let courseName
  let displayPkg

  if (pkgName) {
    labelForPkgName = pkgName
    courseName = `${courseTitle} :`
    displayPkg = (
      <div style={styles.pkgName}>
        <FlatButton label={labelForPkgName} style={styles.titleStyle} primary={false} />
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
        <Toolbar style={styles.toolbarStyle} >
          <ToolbarGroup float="left">
            <FlatButton
              containerElement={<Link to={courseUrl} />}
              style={styles.titleStyle}
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
          style={styles.text}
          titleColor="#26A65B"
        />
        <Divider />
        <CardText expandable>
          <div style={styles.actionPosition} >
            {shortInformation}
          </div>
        </CardText>
        <CardActions expandable >
          <div style={styles.actionPosition} >
            <Friend color="#26A65B" />
            <div style={styles.linkColor} >
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

function getStyles() {
  return {
    actionPosition: {
      position: 'relative',
      marginLeft: '20px',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
    },
    linkColor: {
      color: '#26A65B',
      position: 'relative',
      marginLeft: '30px',
      marginTop: '-20px',
    },
    pkgName: {
      position: 'relative',
      marginLeft: '-40px',
      marginTop: '10px',
    },
    iconStyle: {
      marginTop: '4px',
    },
    titleStyle: {
      color: '#26A65B',
      fontSize: '160%',
    },
    toolbarStyle: {
      backgroundColor: 'white',
      color: '#26A65B',
    },
    buttonStyle: {
      color: 'black',
    },
    separator: {
      backgroundColor: 'black',
    },
    text: {
      position: 'relative',
      marginLeft: '48px',
      marginRight: '5px',
      color: 'green',
    },
  }
}

CourseInfoBar.propTypes = propTypes

export default Radium(CourseInfoBar)
