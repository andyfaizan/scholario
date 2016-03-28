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
        marginLeft: 650 - screen.width
      },
      buttonStyle: {
        backgroundColor: 'transparent',
        marginTop: '7',
        fontWeight: 'bold',
        color: 'white'
      },
      loginButton: {
        backgroundColor: 'transparent',
        marginTop: '7',
        fontWeight: 'bold',
        color: 'white',
        border: 'true',
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: '10',
        borderWidth: '1.5'
      }
    }
    return (
      <div><AppBar iconElementLeft={<IconButton><ActionHome /></IconButton>} title={<span style={styles.title}>Scholario</span>} iconElementRight={<div><FlatButton label='Home' style={styles.buttonStyle} /><FlatButton label='Blog' style={styles.buttonStyle} /><FlatButton label='Lehrer' style={styles.buttonStyle} /><FlatButton label='Student' style={styles.buttonStyle} /><FlatButton label='EinLoggen' style={styles.loginButton} /></div>} />
      </div>

    )
  }
}

export default NavBarLandingPage

