import React from 'react'
import Paper from 'material-ui/lib/paper'
import IconButton from 'material-ui/lib/icon-button'
import NoteAdd from 'material-ui/lib/svg-icons/action/note-add'
import ModalRoot from '../../containers/ModalRoot'

type Props = {
  openModal: Function,
  modal: Object,
  course_modal: String
};
export class AddCourseComponent extends React.Component {
  props: Props;

  render () {

  	const addCourseCompStyle = {
	  
	  float: 'left',
	  height: 170,
	  width: 300,
	  margin: 8.5,
	  backgroundColor: '#26A65B',
	  color: 'white',
	  borderRadius: 13,
	  overflow: 'inherit',
	  alignItems: 'center'
	};

	const buttonStyle = {

	  margin:'auto',
	  width:'100%',
	  padding:10,
	  height: 170,
	  lineHeight: 200
	};

	const plusButton ={
	  width: 70,
	  height: 70,
	  opacity: 0.9
	};

    const actions = <div><IconButton style={buttonStyle} tooltip="Add Course"> <NoteAdd style={plusButton} color="white" /></IconButton></div> ;


    return (
      <div>
      	<Paper style={addCourseCompStyle} onClick={this.props.openModal} zDepth={1} children={actions} />
        {this.props.modal.visible ? <ModalRoot {...this.props.course_modal} /> : null}
      </div>
    )
  }
}

export default AddCourseComponent
