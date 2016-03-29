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
    const actions = [
      <Tabs>
        <Tab label='Item One' >
          <div>
            <p>
              <LoginFields />
            </p>
          </div>
        </Tab>
        <Tab label='Item Two' >
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
          modal={0}
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

