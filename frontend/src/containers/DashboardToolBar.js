import React from 'react'
import { connect } from 'react-redux'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'
import FlatButton from 'material-ui/lib/flat-button'
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
        backgroundColor: '#26A65B ',
        color:'white'
      },
      buttonStyle: {
        color:'white'
      },
      separator: {
        backgroundColor:'white'
      }
    }

    return (
      <div>
         <Toolbar style={styles.toolbarStyle}>
          <ToolbarGroup float='right'>
            <ToolbarTitle text='Scholario' style={styles.titleStyle}/>
          </ToolbarGroup>
          <ToolbarGroup float='left'>
            <FlatButton style={styles.buttonStyle} containerElement= {<Link to='/dashboard' />} label="Kurse" >
            </FlatButton>
            <FlatButton style={styles.buttonStyle} containerElement= {<Link to='/connects' />} label="Netzwerk">
            </FlatButton>
            <FlatButton style={styles.buttonStyle} label="Feed">
            </FlatButton>
            <IconMenu style={styles.iconStyle}
            iconButtonElement={ <IconButton  touch={true}> <NavigationMenu color='white'  /> </IconButton> } >
                <MenuItem primaryText="Benutzer Einstellung" />
                <MenuItem primaryText="Feed Einstellung" />
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
