import React, { PropTypes } from 'react'
import Paper from 'material-ui/lib/paper'
import Delete from 'material-ui/lib/svg-icons/action/delete'
import Friend from 'material-ui/lib/svg-icons/social/person'
import PageView from 'material-ui/lib/svg-icons/action/pageview'
import IconButton from 'material-ui/lib/icon-button'
import Divider from 'material-ui/lib/divider'

type Props = {

	fullName: string,
	discipline: string,
	universityName: string,
	avatarUrl: string
};
export class FriendsDisplayComponent extends React.Component {
   
  static propTypes = {
  	fullName: PropTypes.string,
  	discipline: PropTypes.string,
  	universityName: PropTypes.string,
  	avatarUrl: PropTypes.string
  };

  render () {

  	const friendsPaperStyle = {
	  float: 'left',
	  height: 170,
	  width: 300,
	  margin: 8.5,
	  backgroundColor: 'white',
	  color: '#1690DB',
	  borderRadius: 13,
	  overflow: 'inherit',
	  alignItems: 'center',
	  borderStyle: 'solid',
	  borderWidth: 1,
	  borderColor: '#1690DB'
	};

	const divActionStyles = {
		float:'right'
	};

	const friendsButtonStyle = {

	  margin:'auto',
	  width:'100%',
	  height: 50,
	  lineHeight: 50
	};

	const noteFriendsStyle ={
	  width: 60,
	  height: 60 
	};

	const header = <div><h3>{this.props.fullName}</h3><h5>{this.props.universityName}</h5><h6>{this.props.discipline}</h6></div>;
	const container = <div><IconButton style={friendsButtonStyle}> <Friend style={noteFriendsStyle} /></IconButton></div> ;

	const nodeFriendsComp = [
      
      	header,
		container
    ];

    return (

      <div>
      	<Paper style={friendsPaperStyle} zDepth={1} children={nodeFriendsComp}  />   
      </div>
    )
  }
}

export default FriendsDisplayComponent

