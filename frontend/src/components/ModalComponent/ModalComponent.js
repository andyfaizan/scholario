import React from 'react'
import Dialog from 'material-ui/lib/dialog'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import LoginFields from '../../components/LoginFields/LoginFields'

export class ModalComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }
  handleClose = () => {
    this.setState({open: false})
  };
  handleOpen = () => {
    this.setState({open: true})
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
      backgroundColor: '#c5d5cb',
      fontWeight: 'bold'
    }
    const inkBarStyle = {
      backgroundColor: '#9fa8a3'
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
            <h2 style={styles.headline}>Tab Two</h2>
            <p>
            This is another example tab.
            </p>
          </div>
        </Tab>
      </Tabs>
    ]
    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          actionsContainerStyle={customContentStyle}
          titleStyle={customContentStyleTwo}
          contentStyle={customContentStyleThree}
          bodyStyle={customContentStyleFour}
        />
      </div>
    )
  }
}

export default ModalComponent

