import React from 'react'
import Paper from 'material-ui/lib/paper'
import Divider from 'material-ui/lib/divider'
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button'
import ActionHome from 'material-ui/lib/svg-icons/action/delete'
import FlatButton from 'material-ui/lib/flat-button'

type Props = {

};
export class CourseCard extends React.Component {
  props: Props;

  render () {

  	//inline styling variables for certain components ...
	const style = {
	  height: 200,
	  width: 200,
	  margin: 20,
	  textAlign: 'center',
	  display: 'inline-block',
	};

	const divStyle = {
		textAlign: 'left',

	};

	const iconStyles = {
  		marginRight: 24,
	};

	const divStyleDelete = {
  		align: 'right'
	};

	//variables 
	var titleCourse = <p></p> ;
	var universityCourse = <p></p> ;
	var teacherCourse = <p>Sina</p> ;
	var deleteCourseButton = <div style={divStyleDelete}><IconButton tooltip="Font Icon"> <ActionHome /> </IconButton></div> ;
	var heading = <div style={divStyle}><h3>{teacherCourse}</h3>  <Divider /> </div>;


	const nodePaper = [
      
      heading,


      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />
      
      ];

    return (
      <div>
        <Paper style={style} zDepth={2} children={nodePaper} />                
      </div>
    )
  }
}

export default CourseCard

