import React, { PropTypes } from 'react'
import Paper from 'material-ui/lib/paper'
import Delete from 'material-ui/lib/svg-icons/action/delete'
import Person from 'material-ui/lib/svg-icons/social/person'
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

  	const style = {
	  float: 'left',
	  height: 220,
	  width: 170,
	  margin: 8.5
	};

	const divStyleActions = {
		float:'right'
	};

	const buttonStyle = {

	  margin:'auto',
	  width:'100%',
	  height: 50,
	  lineHeight: 50
	};

	const noteStyle ={
	  width: 60,
	  height: 60 
	};

	const header = <div><h3>{this.props.fullName}</h3><h5>{this.props.universityName}</h5><h6>{this.props.discipline}</h6></div>;
	const actionsCourse = <div style={divStyleActions}><IconButton tooltip="unfollow friend"> <Delete /> </IconButton><IconButton tooltip="friends Profile"> <PageView /> </IconButton></div> ;
	const separator = <div><br/><Divider /></div> ;
	const container = <div><IconButton style={buttonStyle}> <Person style={noteStyle} /></IconButton></div> ;

	const nodeFriendsComp = [
      
      	header,
		<Divider />,
		container,
		<Divider />,
		actionsCourse
      
    ];

    return (

      <div>
      	<Paper style={style} zDepth={1} children={nodeFriendsComp}  />   
      </div>
    )
  }
}

export default FriendsDisplayComponent

