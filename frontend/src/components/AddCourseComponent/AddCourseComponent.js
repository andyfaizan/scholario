import React from 'react'
import Paper from 'material-ui/lib/paper'
import IconButton from 'material-ui/lib/icon-button'
import AddCircle from 'material-ui/lib/svg-icons/content/add'
import ModalRoot from '../../containers/ModalRoot'
import FloatingActionButton from 'material-ui/lib/floating-action-button'

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
	  backgroundColor: '#ffffff',
	  color: 'white',
	  borderRadius: 13,
	  overflow: 'inherit',
	  alignItems: 'center',
	  borderStyle: 'solid',
	  borderWidth: 1,
	  borderColor: '#E74C3C'

	};

	const style = {
	float: 'left',	
  height: 170,
  width: 170,
  margin: 8.5,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: '#E74C3C'

};

	const buttonStyle = {

	  margin:'auto',
	  width:'100%',
	  padding:10,
	  height: 170,
	  lineHeight: 140
	};

	const plusButton ={
	  width: 80,
	  height: 80,
	  opacity: 0.9
	  	};


    const actions = <div><IconButton style={buttonStyle} tooltip="Add Course"> <AddCircle style={plusButton} color='#ffffff' /></IconButton></div> ;


    return (
      <div>
		<Paper style={style} zDepth={2} onClick={this.props.openModal} circle={true} children= {actions} />
        {this.props.modal.visible ? <ModalRoot {...this.props.course_modal} /> : null}
      </div>
    )
  }
}

export default AddCourseComponent
