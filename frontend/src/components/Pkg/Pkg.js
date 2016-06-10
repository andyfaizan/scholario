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
import classes from './Pkg.scss'
import Edit from 'material-ui/svg-icons/action/track-changes';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Pdf from './pdf.png'
import Bmp from './bmp.png'
import Doc from './doc.png'
import Jpg from './jpg.png'
import MpFour from './mp4.png'
import MpThree from './mp3.png'
import Png from './png.png'
import Ppt from './ppt.png'
import Txt from './txt.png'
import Xls from './xls.png'
import Folder from './folder.png'


type Props = {
  materialTitle: PropTypes.string,
  materialUrl: PropTypes.string,
  keywords: PropTypes.array,
  dateUploaded: PropTypes.string,
  materialNotifications: PropTypes.number,
  pkgUrl: PropTypes.string,
  ext: PropTypes.string
};

export class Pkg extends React.Component {
  props: Props;

  render () {

  		//inline styling variables for certain components ...
    const style = {
      float: 'left',
      height: 172,
      width: 170,
      margin: 8.5,
      backgroundColor: '#446CB3',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
    }

    const styleTwo = {
      float: 'left',
      height: 30,
      width: 170,
      margin: 8.5,
      backgroundColor: '#446CB3',
      color: '#ffffff',
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 152,
      marginLeft: -178,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor:'#446CB3',
    }

    const styleFour = {
      float: 'left',
      height: 140,
      width: 166,
      margin: 8.5,
      backgroundColor:'#ffffff',
      color: '#446CB3',
      overflow: 'inherit',
      alignItems: 'center',
      postion: 'absolute',
      margin:'auto',
      marginTop: 11,
      marginLeft: -176,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#446CB3',
      opacity: 1.0,
      zDepth:1
    }


    const divStyle = {
      textAlign: 'center',
      color: '#446CB3',
      marginLeft:5,
      marginTop: 30,
      opacity: 0.9,
      alignContent:'center'

    }

     const linkStyle = {
      color: '#fff',
      backgroundColor: 'transparent'
    }

    const dots = "..."
    var preparedTitle
    var preparedIcon

    if( this.props.ext == '.bmp')
    {
    	preparedIcon = <div className={classes.posImg}><img className={classes.imgStyle}
              		   src={Bmp}
              		   alt='bmp' />
              		   </div>

    }else if(this.props.ext == '.doc' || this.props.ext == '.docx' ){

    	preparedIcon = <div className={classes.posImg}><img className={classes.imgStyle}
              		   src={Doc}
              		   alt='doc' />
              		   </div>

    }else if (this.props.ext == '.jpg' || this.props.ext == '.jpeg'){

    	preparedIcon = <div className={classes.posImg}><img className={classes.imgStyle}
              		   src={Jpg}
              		   alt='jpg' />
              		   </div>

    }else if(this.props.ext == '.mp3'){

    	preparedIcon = <div className={classes.posImg}><img className={classes.imgStyle}
              		   src={MpThree}
              		   alt='mp3' />
              		   </div>

    }else if(this.props.ext == '.mp4' ){

    	preparedIcon = <div className={classes.posImg}><img className={classes.imgStyle}
              		   src={MpFour}
              		   alt='mp4' />
              		   </div>

    }else if(this.props.ext == '.pdf'){

    	preparedIcon = <div className={classes.posImg}><img className={classes.imgStyle}
              		   src={Pdf}
              		   alt='pdf' />
              		   </div>

    }else if(this.props.ext == '.png'){

    	preparedIcon = <div className={classes.posImg}><img className={classes.imgStyle}
              		   src={Png}
              		   alt='png' />
              		   </div>

    }else if(this.props.ext == '.ppt' || this.props.ext == '.pptx'){

    	preparedIcon = <div className={classes.posImg}><img className={classes.imgStyle}
              		   src={Ppt}
              		   alt='ppt' />
              		   </div>

    }else if(this.props.ext == '.txt'){

    	preparedIcon = <div className={classes.posImg}><img className={classes.imgStyle}
              		   src={Txt}
              		   alt='txt' />
              		   </div>

    }else if(this.props.ext == '.xls' || this.props.ext == '.xlsx' ){

    	preparedIcon = <div className={classes.posImg}><img className={classes.imgStyle}
              		   src={Xls}
              		   alt='xls' />
              		   </div>

    }else{

    	preparedIcon = <div className={classes.posImg}><img className={classes.imgStyle}
              		   src={Folder}
              		   alt='alt file' />
              		   </div>
    }

    //variables for displaying Child Node

    var heading = <div key="headingIndependentPackage" style={divStyle}>
                   {preparedIcon}
                   <br/>
                   <h5>{this.props.dateUploaded}</h5>
                  </div>

    var container = <div key="IndependentPackage">
                    <div className={classes.container}>
                      {this.props.keywords}
                    </div>
                    <div key="deleteKey" className={classes.deleteButton}>
                      <IconButton tooltip="Pkg löschen">
                        <Delete color='#EF4836'/>
                      </IconButton>
                    </div>
                    <div className={classes.downloadMaterial}>
                       <IconButton disableTouchRipple={true} tooltip="Download-Paket">
                        <FileDownload color="White"/>
                      </IconButton>
                    </div>
                    </div>

    var notifications = <div key="notifications" className={classes.badge}>
    {/*<Badge
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={{ backgroundColor: '#EF4836', radius: 20}}
                          />*/}
                        </div>

    if( this.props.materialTitle.length > 15 )
    	preparedTitle = this.props.materialTitle.slice(0,15).concat(dots)
	else
    	preparedTitle = this.props.materialTitle

    var actionSlot = <div key="actionSlot" className={classes.tooltip}>{preparedTitle}
                              <span className={classes.tooltiptext}>{this.props.materialTitle}</span>
                        </div>

    var downloadPkt =<div> 
                      <div key="downloadKey" className={classes.downloadPkg}>
                        <a target="_blank" href={this.props.materialUrl} style={linkStyle} ><FileDownload color="White"/></a>
                      </div>
                      <div key="deleteKey" className={classes.deleteButton}>
                      <IconButton disableTouchRipple={true}  tooltip="Pkg löschen">
                        <Delete color='White'/>
                      </IconButton>
                    </div>
                  </div>

    const nodePaperCourse = [
      heading
      //notifications
    ]

   const nodeFileClipper = [


    ]

    const action = [

      actionSlot,
      downloadPkt

    ]

    return (
      <div>
        <Link to={this.props.pkgUrl}>
      	<Paper style={style} zDepth={3}  children={nodePaperCourse} />
      	</Link>
	    <Paper style={styleTwo} zDepth={0} children={action} />
	    <Paper style={styleFour} zDepth={0} children={nodeFileClipper} />
      </div>
    )
  }
}

export default Pkg
