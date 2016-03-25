import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import injectTapEventPlugin from 'react-tap-event-plugin'
import IconButton from 'material-ui/lib/icon-button'
import ActionHome from 'material-ui/lib/svg-icons/action/home'

injectTapEventPlugin()

type Props = {

};

export class NavBarLandingPage extends React.Component {
  props: Props;
  render () {
    const styles = {
      title: {
        cursor: 'pointer',
        marginLeft: '-480'
      }
    }
    var buttonStyle = {
      backgroundColor: 'transparent',
      marginTop: '7',
      fontWeight: 'bold',
      color: 'white'
    }
    return (
      <div><AppBar iconElementLeft={<IconButton><ActionHome /></IconButton>} title={<span style={styles.title}>Scholario</span>} iconElementRight={<div><FlatButton label='Home' style={buttonStyle} /><FlatButton label='Blog' style={buttonStyle} /><FlatButton label='Lehrer' style={buttonStyle} /><FlatButton label='Student' style={buttonStyle} /><FlatButton label='EinLoggen' style={buttonStyle} /></div>} />
      </div>

    )
  }
}

export default NavBarLandingPage

