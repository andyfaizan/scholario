import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import CardHeader from 'material-ui/Card/CardHeader';
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Friend from 'material-ui/svg-icons/social/person';
import classes from './CourseInfoBar.scss'
import { Router, Route, Link } from 'react-router'


type Props = {
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
}

export class CourseInfoBar extends React.Component {
  props: Props

  render () {

    const styles = {
      iconStyle: {
        marginTop: '4',
      },
      titleStyle: {
        color: '#26A65B'
      },
      toolbarStyle: {
        backgroundColor: 'white',
        color:'#26A65B'
      },
      buttonStyle: {
        color:'black'
      },
      separator: {
        backgroundColor:'black'
      },
      text: {
        position:'relative',
        marginRight: 5,
        marginLeft: 20,
        color: 'green'
      }
    }

    const { semesterInstance, userRole } = this.props

    var actions
    if (userRole === 'Prof') {
      actions = <ToolbarGroup float='left'>
                  <IconButton  style={styles.iconStyle} touch={true}> <Delete color='#26A65B'  /> </IconButton>
                </ToolbarGroup>
    }
    return (
      <div>
        <Card>
       
                  <Toolbar style = {styles.toolbarStyle } >
                    <ToolbarGroup float='right'>
                    <IconButton containerElement= {<Link to={this.props.courseUrl}  />} linkButton={true} style={styles.iconStyle} > <NavigationMenu color='#26A65B'  /> </IconButton>
                    <ToolbarTitle text={this.props.courseTitle} style={styles.titleStyle}/>
                  </ToolbarGroup>
                  </Toolbar>
                  <CardHeader
                    title={this.props.teachersName}
                    subtitle={semesterInstance}
                    actAsExpander={true}
                    showExpandableButton={true}
                    style ={styles.text}
                    titleColor='#26A65B'
                  />
                  <Divider />
                  <CardText expandable={true}>
                      <div className = {classes.actionPosition} >
                            {this.props.shortInformation}
                        </div>
                  </CardText>
                  <CardActions expandable={true} >
                    <div className={classes.actionPosition} >
                        <Friend color='#26A65B' />
                        <div className={classes.linkColor} >
                        {this.props.participantsNum}
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
}

export default CourseInfoBar

