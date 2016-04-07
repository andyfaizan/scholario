import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import {show} from '../../redux/modules/modal'

injectTapEventPlugin()

export class NavBarLandingPage extends React.Component {

  propTypes = {
    modal: PropTypes.bool.isRequired,
    show: PropTypes.func.isRequired
  };

  render () {
    const styles = {
      title: {
        cursor: 'pointer',
        color: 'grey',
        fontWeight: 'lighter',
        fontFamily: 'cursive',
        fontSize: '35px'
      },
      navBarStyle: {
        backgroundColor: 'white'
      },
      buttonStyle: {
        backgroundColor: 'transparent',
        marginTop: '7',
        color: 'grey50'
      },
      loginButton: {
        backgroundColor: 'transparent',
        marginTop: '7',
        color: '#9fa8a3',
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
                            {this.props.modal ? <ModalComponent /> : null}
                          </div>} />
    </div>

    )
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal
})
export default connect((mapStateToProps), {
  show: () => show(true)
})(NavBarLandingPage)
