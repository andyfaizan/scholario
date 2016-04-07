import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/lib/dialog'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
<<<<<<< HEAD
import LoginFields from '../../components/LoginFields/LoginFields'
import SignupFields from '../../components/SignupFields/SignupFields'
=======
import {show} from '../../redux/modules/modal'
>>>>>>> 230493054df7d9ae1f51cf26e3096e1776752363

export class ModalComponent extends React.Component {
  propTypes = {
    modal: PropTypes.bool.isRequired,
    show: PropTypes.func.isRequired
  };
  render () {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
      }
    }
    const customContentStyle = {
      padding: 2,
      marginBottom: 0,
      marginTop: 0
    }
    const customContentStyleTwo = {
      margin: 0,
      padding: '0px',
      lineHeight: '0px'
    }
    const customContentStyleThree = {
      padding: 1,
      marginBottom: 0,
      marginTop: 0,
      width: '30%',
      margin: '0 auto'
    }
    const customContentStyleFour = {
      padding: 0,
      marginBottom: 0,
      marginTop: 0,
      width: '100%',
      margin: 0
    }
    const tabItemContainerStyle = {
      backgroundColor: '#16a085',
      fontWeight: 'bold'
    }
    const inkBarStyle = {
      backgroundColor: '#fff'
    }
    const actions = [
      <Tabs tabItemContainerStyle={tabItemContainerStyle} inkBarStyle={inkBarStyle}>
        <Tab label='Login' >
          <div>
            <LoginFields />
          </div>
        </Tab>
        <Tab label='Sign In' >
          <div>
            <SignupFields />
          </div>
        </Tab>
      </Tabs>
    ]
    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.modal}
          onRequestClose={this.props.show}
          actionsContainerStyle={customContentStyle}
          titleStyle={customContentStyleTwo}
          contentStyle={customContentStyleThree}
          bodyStyle={customContentStyleFour}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal
})
export default connect((mapStateToProps), {
  show: () => show(false)
})(ModalComponent)