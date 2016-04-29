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
	  height: 280,
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

	const plusButton ={
	  width: 70,
	  height: 70
	};

    const actions = <div><IconButton style={buttonStyle} tooltip="Add Course"> <NoteAdd style={plusButton} /></IconButton></div> ;


    return (
      <div>
      	<Paper style={addCourseCompStyle} onClick={this.props.openModal} zDepth={1} children={actions} />
        {this.props.modal.visible ? <ModalRoot {...this.props.course_modal} /> : null}
      </div>
    )
  }
}

export default AddCourseComponent
