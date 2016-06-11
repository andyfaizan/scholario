import React from 'react'
import { connect } from 'react-redux'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { Router, Route, Link } from 'react-router'
import { logout } from '../redux/modules/user'


type Props = {

};
export class DashboardToolBar extends React.Component {
  props : Props;



  render () {

  const styles = {
      iconStyle: {
        marginTop: '4',
      },
      titleStyle: {
        color: 'white'
      },
      toolbarStyle: {
        backgroundColor: '#26A65B',
        color:'white'
      },
      buttonStyle: {
        color:'white'
      },
      separator: {
        backgroundColor:'white'
      },
      link: {
        backgroundColor: '#26A65B',
        color: '#26A65B'
      }
    }

    return (
      <div>
         <Toolbar style={styles.toolbarStyle}>
          <ToolbarGroup float='right'>
                <Link to='/dashboard' style={styles.link} >
                <ToolbarTitle text='Scholario' style={styles.titleStyle}/>
                </Link>
          </ToolbarGroup>
          <ToolbarGroup float='left'>
            <FlatButton style={styles.buttonStyle} containerElement= {<Link to='/dashboard' />} label="Kurse" >
            </FlatButton>
            <FlatButton style={styles.buttonStyle} containerElement= {<Link to='/connects' />} label="Netzwerk">
            </FlatButton>
            <FlatButton style={styles.buttonStyle} containerElement= {<Link to='/feedback' />} label="Feedback">
            </FlatButton>
            <FlatButton style={styles.buttonStyle} containerElement= {<Link to='/feed' />} label="Feed">
            </FlatButton>
            <IconMenu style={styles.iconStyle}
            iconButtonElement={ <IconButton disableTouchRipple={true} touch={true}> <NavigationMenu color='white'  /> </IconButton> } >
                <MenuItem primaryText="Benutzer Einstellungen" />
                <MenuItem primaryText="Feed Einstellungen" />
                <MenuItem primaryText="Logout" onTouchTap={this.props.logout} />
             </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )


}
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardToolBar)
