import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import Delete from 'material-ui/lib/svg-icons/action/delete'
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu'
import Friend from 'material-ui/lib/svg-icons/social/person'

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
  topFiveUsersProfileLink: PropTypes.array
}

export class CourseInfoBar extends React.Component {
  props: Props

  render () {

    const styles = {
      iconStyle: {
        marginTop: '4',
      },
      titleStyle: {
        color: 'black'
      },
      toolbarStyle: {
        backgroundColor: 'white',
        color:'black'
      },
      buttonStyle: {
        color:'black'
      },
      separator: {
        backgroundColor:'black'
      }
    }

    const { semesterInstance } = this.props

    return (
      <div>
        <Card>
          <Grid>
            <Row>
              <Col xs={24} md={12} > 
                  <Toolbar style = {styles.toolbarStyle } >
                    <ToolbarGroup float='right'>
                    <IconButton containerElement= {<Link to={this.props.courseUrl}  />} linkButton={true} style={styles.iconStyle} > <NavigationMenu color='black'  /> </IconButton>
                    <ToolbarTitle text={this.props.courseTitle} style={styles.titleStyle}/>
                  </ToolbarGroup>
                   <ToolbarGroup float='left'>
                 <IconButton  style={styles.iconStyle} touch={true}> <Delete color='black'  /> </IconButton>
                  </ToolbarGroup>
                  </Toolbar>
              </Col>
            </Row>
          </Grid>
          <Grid>
            <Row>
              <Col xs={24} md={12} >
                  <Toolbar style = {styles.toolbarStyle } >
                  	<Grid >
        	          <Row >
        	            <Col xs={6} md={3}>
        	            <h4>Teachers: {this.props.teachersName} </h4>
        	            </Col>
        	            <Col xs={6} md={3}>
        	          	  <h4>Assitant: No Assistant </h4>
        	            </Col>
        	            <Col xs={6} md={3}>
        	          	  <h4>Semester: {semesterInstance}</h4>
        	            </Col>
        	            <Col xs={6} md={3}>
                        <Friend />
                        {this.props.participantsNum} Likes
        	            </Col>
        	          </Row>
        	         </Grid>
                    </Toolbar>
                </Col>
              </Row>
          </Grid>
         <Grid>
            <Row>
              <Col xs={24} md={12} >
                <Toolbar style = {styles.toolbarStyle } >
        	      
                        {this.props.shortInformation}
        	         
                </Toolbar>
              </Col>
            </Row>
          </Grid>
        </Card>
      </div>
    )
  }
}

export default CourseInfoBar

