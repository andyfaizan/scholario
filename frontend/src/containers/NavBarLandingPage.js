import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import ModalComponent from './ModalComponent'
import {show} from '../redux/modules/modal'
import {LOGIN_MODAL as login_modal} from '../redux/modules/modal'
import ModalRoot from './ModalRoot'

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
        backgroundColor: '#26A65B'
      },
      buttonStyle: {
        backgroundColor: 'transparent',
        // marginTop: '7', TODO after adding href, margin is screwed up
        color: 'white'
      },
      loginButton: {
        backgroundColor: '#446CB3',
        marginTop: '7',
        fontWeight: 'bold',
        color: 'white',
        border: 'true',
        borderStyle: 'solid',
        borderColor: '#446CB3',
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
                            <FlatButton label='Blog' style={styles.buttonStyle} linkButton={true}
                              href="http://medium.com/scholario-blog"/>
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
