import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'
import { connect } from 'react-redux'

import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

import { logout } from '../redux/modules/user'


const propTypes = {
  dispatch: PropTypes.func,
}

function DashboardToolBar({ dispatch }) {
  const styles = getStyles()

  return (
    <div>
      <Toolbar style={styles.toolbarStyle}>
        <ToolbarGroup float="right">
          <Link to="/dashboard" style={styles.link} >
            <ToolbarTitle text="Scholario" style={styles.titleStyle} />
          </Link>
        </ToolbarGroup>
        <ToolbarGroup float="left">
          <FlatButton style={styles.buttonStyle} containerElement={<Link to="/dashboard" />} label="Kurse" />
          <FlatButton style={styles.buttonStyle} containerElement={<Link to="/connects" />} label="Netzwerk" />
          <FlatButton style={styles.buttonStyle} containerElement={<Link to="/feedback" />} label="Feedback" />
          <FlatButton style={styles.buttonStyle} containerElement={<Link to="/feed" />} label="Feed" />
          <IconMenu
            style={styles.iconStyle}
            iconButtonElement={<IconButton disableTouchRipple touch> <NavigationMenu color="white" /> </IconButton>}
          >
            <MenuItem primaryText="Profil Einstellungen" containerElement={<Link to="/profile-settings" />} />
            <MenuItem
              primaryText="Benachrichtigung Einstellungen"
              containerElement={<Link to="/notification-settings" />}
            />
            <MenuItem primaryText="Privatsphäre Einstellungen" containerElement={<Link to="/privacy-settings" />} />
            <MenuItem primaryText="Post Einstellungen" containerElement={<Link to="/mail-settings" />} />
            <MenuItem primaryText="Logout" onTouchTap={() => dispatch(logout())} />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    </div>
  )
}

function getStyles() {
  return {
    iconStyle: {
      marginTop: '4px',
    },
    titleStyle: {
      color: 'white',
    },
    toolbarStyle: {
      backgroundColor: '#26A65B',
      color: 'white',
    },
    buttonStyle: {
      color: 'white',
    },
    separator: {
      backgroundColor: 'white',
    },
    link: {
      backgroundColor: '#26A65B',
      color: '#26A65B',
    },
  }
}

DashboardToolBar.propTypes = propTypes

export default connect()(Radium(DashboardToolBar))
