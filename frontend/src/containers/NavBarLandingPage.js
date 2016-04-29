import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ModalComponent from './ModalComponent'
import {show} from '../redux/modules/modal'
import {LOGIN_MODAL as login_modal} from '../redux/modules/modal'
import ModalRoot from './ModalRoot'

injectTapEventPlugin()

export class NavBarLandingPage extends React.Component {

  static propTypes = {
    modal: PropTypes.object.isRequired,
    show: PropTypes.func.isRequired
  };

  render () {
    const styles = {
      title: {
        cursor: 'pointer',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '35px'
      },
      navBarStyle: {
        backgroundColor: '#1abc9c'
      },
      buttonStyle: {
        backgroundColor: 'transparent',
        marginTop: '7',
        color: 'white'
      },
      loginButton: {
        backgroundColor: '#eee111',
        marginTop: '7',
        fontWeight: 'bold',
        color: 'white',
        border: 'true',
        borderStyle: 'solid',
        borderColor: 'grey',
        borderRadius: '20',
        borderWidth: '0.0'
      }
    }
    return (
    <div>
      <AppBar
        style={styles.navBarStyle}
        showMenuIconButton={false}
        titleStyle={styles.titleStyle}
        title={<span style={styles.title}>Scholario</span>}
        iconElementRight={<div>
                            <FlatButton label='Home' style={styles.buttonStyle} />
                            <FlatButton label='Blog' style={styles.buttonStyle} />
                            <FlatButton label='Lehrer' style={styles.buttonStyle} />
                            <FlatButton label='Student' style={styles.buttonStyle} />
                            <FlatButton label='EinLoggen' style={styles.loginButton} onClick={this.props.show} />
                            {this.props.modal.visible ? <ModalRoot {...login_modal} /> : null}
                          </div>} />
    </div>

    )
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal
})
export default connect((mapStateToProps), {
  show: () => show(login_modal)
})(NavBarLandingPage)
