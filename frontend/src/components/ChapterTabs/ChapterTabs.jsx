import React, { PropTypes } from 'react'
import Radium from 'radium'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import {Tabs, Tab} from 'material-ui/Tabs';

const propTypes = {

}

function ChapterTabs() {
  const styles = getStyles()

  return (
    <div>
      <Card>
        <CardHeader
          title="URL Avatar"
        />
        <CardText>
          <Tabs>
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

  }
}

ChapterTabs.propTypes = propTypes

export default Radium(ChapterTabs)
