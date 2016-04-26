import React, { PropTypes } from 'react'
import Paper from 'material-ui/lib/paper'
import Divider from 'material-ui/lib/divider'
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button'
import ActionHome from 'material-ui/lib/svg-icons/action/delete'
import PageView from 'material-ui/lib/svg-icons/action/pageview'
import FlatButton from 'material-ui/lib/flat-button'

type Props = {

	titleCourse: string,
	universityCourse: string,
	courseTeacher: string,
	courseUrl: string
};
export class CourseCard extends React.Component {
 static propTypes = {
    titleCourse: PropTypes.string.isRequired,
    universityCourse: PropTypes.string.isRequired,
    courseTeacher: PropTypes.string.isRequired,
    courseUrl: PropTypes.string.isRequired
  };
  render () {

  	//inline styling variables for certain components ...
	const style = {
<<<<<<< HEAD
	  height: 100,
	  width: 100,
	  margin: 20,
	  textAlign: 'center',
	  display: 'inline-block',
=======
	  float: 'left',
	  height: 170,
	  width: 170,
	  margin: 8.5
>>>>>>> front
	};

	const divStyle = {
		textAlign: 'center'

	};

	const iconStyles = {
  		marginRight: 24
	};

	const divStyleDelete = {
		float:'right'
	};

	//variables for displaying Child Node
	var deleteCourseButton = <div style={divStyleDelete}><IconButton tooltip="Delete Course"> <ActionHome /> </IconButton><IconButton tooltip="Go to Detail Course"> <PageView /> </IconButton></div> ;
	var heading = <div style={divStyle}><h1>{this.props.titleCourse}</h1>  <Divider /> </div>;
	var container =<div> <h4>{this.props.universityCourse}</h4><h6>{this.props.courseTeacher}</h6><Divider /></div> ;

	const nodePaper = [
      
      heading,
	  container,
      deleteCourseButton
      
      ];

    return (
      <div>
<<<<<<< HEAD
        <Paper style={style} zDepth={1} children={nodePaper} />
                <Paper style={style} zDepth={1} children={nodePaper} />
                
				<h1>adsada</h1>
=======
        <Paper style={style} zDepth={1} children={nodePaper}  />   

>>>>>>> front
      </div>
    )
  }
}

export default CourseCard

