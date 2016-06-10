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
import classes from './AddPkgComponent.scss'
import AddCircle from 'material-ui/svg-icons/content/add';
import ModalRoot from '../../containers/ModalRoot'
import {ADD_PACKAGE_MODAL as add_package} from '../../redux/modules/modal'


type Props = {
  modal: Object,
  show: Function
};

export class AddPkgComponent extends React.Component {
  props: Props;

  render () {
  	 	//inline styling variables for certain components ...
    const style = {
      float: 'left',
      height: 172,
      width: 220,
      margin: 8.5,
      backgroundColor: '#446CB3',
      color: '#ffffff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
    }

    const styleTwo = {
      float: 'left',
      height: 30,
      width: 220,
      margin: 8.5,
      backgroundColor: '#ffffff',
      color: '#ffffff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 150,
      marginLeft: -229,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor:'#446CB3',
    }

    const styleThree = {
      float: 'left',
      height: 30,
      width: 220,
      margin: 8.5,
      backgroundColor: '#446CB3',
      color: '#ffffff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 144,
      marginLeft: -229,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3',
    }

    const styleFour = {
      float: 'left',
      height: 80,
      width: 220,
      margin: 8.5,
      backgroundColor:'#446CB3',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 8,
      marginLeft: -229,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3',
      opacity: 1.0,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius:50
    }

    const styleFive = {
      float: 'left',
      height: 30,
      width: 220,
      margin: 8.5,
      backgroundColor: '#446CB3',
      color: '#ffffff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 148,
      marginLeft: -229,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3',
    }

    const styleSix = {
      float: 'left',
      height: 30,
      width: 220,
      margin: 8.5,
      backgroundColor: '#ffffff',
      color: '#ffffff',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius:30,
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 147,
      marginLeft: -229,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3',
    }


    const divStyle = {
      textAlign: 'center',
      color: '#ffffff',
      marginLeft:5,
      marginTop: -7,
      opacity: 0.9,
    }

	const plusButton ={
	  width: 70,
	  height: 70,
	  opacity: 0.9
	  	};

    //variables for displaying Child Node
    var heading = <div key="headingIndependentPackage" style={divStyle}>
                     <AddCircle style={plusButton} color='#ffffff' />
                  </div>

   const nodeFileClipper = [

      heading
    ]

    var addPkgModal
    if (this.props.modal && this.props.modal.visible &&
        this.props.modal.modalType === add_package) {
      addPkgModal = <ModalRoot modalType={add_package} />
    }
    return (
      <div>
	        <div>
	          <Paper style={style} zDepth={2}  />
	         {/* <Paper style={styleTwo} zDepth={0}  />
	          <Paper style={styleFive} zDepth={0}  />
	          <Paper style={styleSix} zDepth={0}  />
	          <Paper style={styleThree} zDepth={0}  /> */}
	          <Paper style={styleFour} zDepth={5} children={nodeFileClipper}
             onTouchTap={this.props.show}/>
	        </div>
          {addPkgModal}
      </div>
    )
  }
}

export default AddPkgComponent
