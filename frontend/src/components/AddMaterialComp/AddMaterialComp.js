import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import PageView from 'material-ui/svg-icons/action/pageview';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import { Router, Route, Link } from 'react-router'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import classes from './AddMaterialComp.scss'
import AddCircle from 'material-ui/svg-icons/content/add';
import ModalRoot from '../../containers/ModalRoot'
import {ADD_MATERIAL_MODAL as add_material} from '../../redux/modules/modal'

type Props = {
  modal: Object,
  show: Function,
}

export class AddMaterialComp extends React.Component {
  props: Props;

  render () {
  	//inline styling variables for certain components ...
    const style = {
      float: 'left',
      height: 172,
      width: 170,
      margin: 8.5,
      backgroundColor: '#446CB3 ',
      color: '#ffffff',
      borderTopRightRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
    }

    const styleTwo = {
      float: 'left',
      height: 170,
      width: 25,
      margin: 8.5,
      backgroundColor: '#ffffff',
      color: '#ffffff',
      borderTopRightRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 9,
      marginLeft: -34,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3 ',
    }

    const styleThree = {
      float: 'left',
      height: 170,
      width: 22,
      margin: 8.5,
      backgroundColor: '#446CB3 ',
      color: '#ffffff',
      borderTopRightRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 9,
      marginLeft: -36,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3 ',
    }

    const styleFour = {
      float: 'left',
      height: 172,
      width: 10,
      margin: 8.5,
      backgroundColor: '#000000',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 9,
      marginLeft: -179,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      opacity: 0.7,
    }


	const plusButton ={
	  postion: 'absolute',
	  marginTop:40,
	  width: 70,
	  height: 70,
	  opacity: 0.9
	}

    //variables for displaying Child Node
    var container = <div key="IndependentPackage" className={classes.container}> 
                           <AddCircle style={plusButton} color='#ffffff' />
                    </div>


    const nodePaperCourse = [
      container
    ]

    var addMaterialModal
    if (this.props.modal && this.props.modal.visible &&
        this.props.modal.modalType === add_material) {
      addMaterialModal = <ModalRoot modalType={add_material} />
    }
    return (
      <div>
        <div>
          <Paper style={style} zDepth={2}  children={nodePaperCourse}
            onTouchTap={this.props.show}/>
          <Paper style={styleTwo} zDepth={0}  />
          <Paper style={styleThree} zDepth={0}  />
          <Paper style={styleFour} zDepth={5} />
        </div>
        {addMaterialModal}
      </div>
    )
  }
}

export default AddMaterialComp

