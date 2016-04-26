import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {submit} from 'redux-form'
import Dialog from 'material-ui/lib/dialog'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import RaisedButton from 'material-ui/lib/raised-button'
import LoginFields from '../forms/LoginFields/LoginFields'
import SignupFields from '../forms/SignupFields/SignupFields'
import {hide} from '../redux/modules/modal'

var request = require('superagent');
var self;

export class ModalComponent extends React.Component {
  static propTypes = {
    modal: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.sendRequest = this.sendRequest.bind(this)
    this.confirm = this.confirm.bind(this)
    self = this
  }

  confirm = () => {
    this.refs.myForm.submit()
  }

  hideError = () => {
    this.refs.errorText.style.visibility = 'hidden'
  }

  showError = () => {
    this.refs.errorText.style.visibility = 'visible'
  }

  sendRequest = (data) => {
    request
  .post('https://api.scholario.de/auth/login')
  .send({ email: data.email, password: data.password })
  .end(function(err, res){
    // Calling the end function will send the request
    console.log("Data is : " + data.email + " " + data.password);
    if(res.ok){
      self.hideError()
      self.props.hide()
      console.log("Status : " + res.status);
      console.log("Response body : " + res.text);
    } else{
      self.showError()
      console.log("Response not ok. Error is : " + err);
    }
  })
}

  render () {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
      }
    }
    const buttonStyle = {
      align: 'center',
      marginLeft: '10%',
      marginRight: '10%'
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
      backgroundColor: '#1abc9c',
      fontWeight: 'bold',
    }
    const inkBarStyle = {
      backgroundColor: 'yellow' //temporary color
    }

    const labelStyle = {
      color: 'white',
      fontWeight: 'bold'
    }

    const errorTextStyle = {
      visibility: 'hidden',
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '3%'
    }

    const actions = [
      <Tabs tabItemContainerStyle={tabItemContainerStyle} inkBarStyle={inkBarStyle}>
        <Tab label='Login' >
          <div>
            <LoginFields ref="myForm" onSubmit={this.sendRequest}/>
          </div>
          <div ref="errorText" style={errorTextStyle}>
            Falsches Email oder Kennwort
          </div>
          <div style={buttonStyle}>
          <br/>
          <RaisedButton
            // TODO disabled={submitting}
            type='submit'
            label='Login'
            primary={false}
            backgroundColor='#f1c40f'
            fullWidth={true}
            labelStyle={labelStyle}
            onTouchTap={this.confirm}
            />
        </div>
        <br/>
        </Tab>
        <Tab label='Sign Up' >
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
          open={this.props.modal.visible}
          onRequestClose={this.props.hide}
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
  hide: () => hide('LOGIN_MODAL')
})(ModalComponent)
