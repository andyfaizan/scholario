import React, { PropTypes } from 'react'
import Radium from 'radium'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { Tabs, Tab } from 'material-ui/Tabs'

const propTypes = {

}

function ChapterTabs() {
  const styles = getStyles()

  return (
    <div>
      <Card style={styles.style}>
        <CardHeader
          title="URL Avatar"
        />
        <CardText>
          <Tabs tabItemContainerStyle={styles.tabItemContainerStyle} inkBarStyle={styles.inkBarStyle}>
            <Tab label="Lehrplan" >
              <div>
                <h2>Tab One</h2>
                <p>
                  This is an example tab.
                </p>
                <p>
                  You can put any sort of HTML or react component in here. It even keeps the component state!
                </p>
              </div>
            </Tab>
            <Tab label="Sonstige Vermögensgegenstände" >
              <div>
                <h2 >Tab Two</h2>
                <p>
                  This is another example tab.
                </p>
              </div>
            </Tab>
          </Tabs>
        </CardText>
      </Card>
    </div>
  )
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
      height: '300px',
      width: '700px',
      margin: '8.5px',
      overflow: 'inherit',
      alignItems: 'center',
    },
  }
}

ChapterTabs.propTypes = propTypes

export default Radium(ChapterTabs)
