import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardMedia from 'material-ui/lib/card/card-media'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'
import Divider from 'material-ui/lib/divider'
import FontIcon from 'material-ui/lib/font-icon'
import ActionHome from 'material-ui/lib/svg-icons/action/home'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import Delete from 'material-ui/lib/svg-icons/action/delete'
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu'
import NoteAdd from 'material-ui/lib/svg-icons/action/note-add'
import Friend from 'material-ui/lib/svg-icons/social/person'

type Props = {

  courseTitle: string,
  teachersName: string,
  assistantsName: string,
  universityName:string,
  programeName: string,
  semesterInstance: string,
  shortInformation: string,
  courseVotes: string,
  courseUrl: string,
  courseFollowers: array,
  topFiveUsersProfileLink: array
};

export class CourseInfoBar extends React.Component {
  
  static propTypes = {
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
      topFiveUsersProfileLink: PropTypes.array
    };

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

    return (
      <div>
        <Card>
          <Toolbar style = {styles.toolbarStyle } >
          	<ToolbarGroup float='right'>
          	<IconButton  style={styles.iconStyle} touch={true}> <NavigationMenu color='black'  /> </IconButton>
            <ToolbarTitle text='Fundamentals of Computer Graphics' style={styles.titleStyle}/>
          </ToolbarGroup>
          <ToolbarGroup float='left'>
         <IconButton  style={styles.iconStyle} touch={true}> <Delete color='black'  /> </IconButton>
          </ToolbarGroup>
          </Toolbar>
          <Toolbar style = {styles.toolbarStyle } >
          	<Grid >
	          <Row >
	            <Col xs={6} md={3}>
	            <h4>Teachers: {this.props.courseTitle} </h4>
	            </Col>
	            <Col xs={6} md={3}>
	          	  <h4>Assitant: Stuart James </h4>
	            </Col>
	            <Col xs={6} md={3}>
	          	  <h4>Semester: 2009 </h4>
	            </Col>
	            <Col xs={6} md={3}>
	          	  <h4>Most Active Users </h4>
	            </Col>
	          </Row>
	         </Grid>
          </Toolbar>
	        <Grid>
	          <Row >
	            <Col xs={18} md={9}>
	            <p>Short Information Short InformationShort InformationShort InformationShort InformationShort InformationShort InformationShort InformationShort InformationShort InformationShort InformationShort Information</p>
	            </Col>
	            <Col xs={6} md={3}>
	          		<IconButton  touch={true}> <NavigationMenu color='black'  /> </IconButton> 
	          		<IconButton  touch={true}> <NavigationMenu color='black'  /> </IconButton> 
	          		<IconButton  touch={true}> <NavigationMenu color='black'  /> </IconButton> 
	          		<IconButton  touch={true}> <NavigationMenu color='black'  /> </IconButton> 
	            </Col>
	          </Row>
	        </Grid>
			<Grid>
	          <Row >
	            <Col xs={2} md={1}>
	 			<Friend />
	            </Col>
	            <Col xs={2} md={1}>
	 			Chris ,
	            </Col>
	            <Col xs={2} md={1}>
	 			Ahmet,
	            </Col>
	            <Col xs={2} md={1}>
	 			Rizwan,
	            </Col>
	            <Col xs={12} md={6}>
	 			and 200 more users follow the course
	            </Col>
	            <Col xs={2} md={1}>
					20 Likes
	            </Col>
	            <Col xs={2} md={1}>
	 			   <NoteAdd color='black'  />
	            </Col>
	          </Row>
	        </Grid>
        </Card>
      </div>
    )
  }
}

export default CourseInfoBar

