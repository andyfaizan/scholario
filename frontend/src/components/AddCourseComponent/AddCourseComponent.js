import React from 'react'
import Paper from 'material-ui/lib/paper'
import IconButton from 'material-ui/lib/icon-button'
import NoteAdd from 'material-ui/lib/svg-icons/action/note-add'

type Props = {

};
export class AddCourseComponent extends React.Component {
  props: Props;

  render () {

  	const addCourseCompStyle = {
	  float: 'left',
	  height: 220,
	  width: 170,
	  margin: 8.5,
	  alignItem:'center'
	};

	const buttonStyle = {

	  margin:'auto',
	  width:'100%',
	  padding:10,
	  height: 200,
	  lineHeight: 200
	};

	const noteStyle ={
	  width: 70,
	  height: 70 
	};

    const actionsCourse = <div><IconButton style={buttonStyle} tooltip="Add Course"> <NoteAdd style={noteStyle} /></IconButton></div> ;
	
    const nodePaper = [

      actionsCourse
      
      ];

    return (
      <div>
      	<Paper style={addCourseCompStyle} zDepth={1} children={nodePaper}  />   
      </div>
    )
  }
}

export default AddCourseComponent

