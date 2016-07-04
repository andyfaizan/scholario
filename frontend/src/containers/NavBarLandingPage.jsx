import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { show as showAction, LOGIN_MODAL as loginModalAction } from '../redux/modules/modal'
import ModalRoot from './ModalRoot'


const propTypes = {
  modal: PropTypes.object.isRequired,
  show: PropTypes.func.isRequired,
}

function NavBarLandingPage({ modal, show }) {
  const styles = getStyles()

  return (
    <div>
      <AppBar
        style={styles.navBarStyle}
        showMenuIconButton={false}
        titleStyle={styles.titleStyle}
        title={<span style={styles.title}>Scholario</span>}
        iconElementRight={
          <div>
            <FlatButton
              label="Blog" style={styles.buttonStyle} linkButton
              href="http://medium.com/scholario-blog"
            />
            <FlatButton label="EinLoggen" style={styles.loginButton} onClick={show} />
            {modal.visible ? <ModalRoot {...loginModalAction} /> : null}
          </div>
        }
      />
    </div>
  )
}

function getStyles() {
  return {
    title: {
      cursor: 'pointer',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '35px',
    },
    navBarStyle: {
      backgroundColor: '#26A65B',
    },
    buttonStyle: {
      backgroundColor: 'transparent',
      // marginTop: '7', TODO after adding href, margin is screwed up
      color: 'white',
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
      borderWidth: '0.0',
    },
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
})

NavBarLandingPage.propTypes = propTypes

export default connect((mapStateToProps), {
  show: () => showAction(loginModalAction),
})(Radium(NavBarLandingPage))
