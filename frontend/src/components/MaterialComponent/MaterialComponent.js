import React, { PropTypes } from 'react'
import Paper from 'material-ui/lib/paper'
import Divider from 'material-ui/lib/divider'
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button'
import Delete from 'material-ui/lib/svg-icons/action/delete'
import PageView from 'material-ui/lib/svg-icons/action/pageview'
import FlatButton from 'material-ui/lib/flat-button'
import Badge from 'material-ui/lib/badge'
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications'

type Props = {

	courseName: string,
	materialTitle: string,
	numberOfItems:number,
	dateUploaded:string,
	semesterInstance: string

};
export class MaterialComponent extends React.Component {
   
   static propTypes = {
    courseName: PropTypes.string,
    materialTitle: PropTypes.string,
    numberOfItems: PropTypes.number,
    dateUploaded: PropTypes.string,
    semesterInstance: PropTypes.string
  };
  render () {

  	//inline styling variables for certain components ...
	const style = {
	  float: 'left',
	  height: 280,
	  width: 260,
	  margin: 8.5,
	  backgroundColor: '#26A65B',
	  color: 'white'
	};

	const divStyle = {
		textAlign: 'center'

	};

	const iconStyles = {
  		backgroundColor:'white'
	};

	const divStyleActions = {
		float:'right'
	};

	//variables for displaying Child Node
	var heading = <div style={divStyle}><h1>{this.props.materialTitle}</h1> <Divider /> </div>;
	var container =<div> <h4>{this.props.universityCourse}</h4><h6>{this.props.courseName}</h6><br/> <Divider /><br/></div> ;

	const nodePaperCourse = [
      
      heading,
	  container
      
      ];

    return (
      <div>
        <Paper style={style} zDepth={1} children={nodePaperCourse}  />   
      </div>
    )
  }
}

export default MaterialComponent

