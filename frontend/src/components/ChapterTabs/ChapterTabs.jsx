import React, { PropTypes } from 'react'
import Radium from 'radium'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { Tabs, Tab } from 'material-ui/Tabs'
import Button from 'react-bootstrap/lib/Button'
import Well from 'react-bootstrap/lib/Well'
import Collapse from 'react-bootstrap/lib/Collapse'

const propTypes = {

}


export class ChapterTabs extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  render() {
    const styles = getStyles()

    return (
      <div>
        <Card style={styles.style}>
          <CardHeader
            title="URL Avatar"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} >
            <Tabs tabItemContainerStyle={styles.tabItemContainerStyle} inkBarStyle={styles.inkBarStyle}>
              <Tab label="Lehrplan" >
                <div>
                  <div>
                    <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
                      click
                    </Button>
                    <Collapse in={this.state.open}>
                      <div>
                        <Well>
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                          Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                        </Well>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </Tab>
              <Tab label="Sonstige Vermögensgegenstände" >
                <div>
                  <h2 >Tab Two</h2>
                </div>
              </Tab>
            </Tabs>
          </CardText>
        </Card>
      </div>
    )
  }
}

function getStyles() {
  return {
    tabItemContainerStyle: {
      backgroundColor: '#26A65B',
      fontWeight: 'bold',
    },
    inkBarStyle: {
      backgroundColor: '#446CB3',
    },
    style: {
      float: 'left',
      width: '700px',
      margin: '0.5px',
      overflow: 'inherit',
      alignItems: 'center',
    },
  }
}

ChapterTabs.propTypes = propTypes

export default Radium(ChapterTabs)
