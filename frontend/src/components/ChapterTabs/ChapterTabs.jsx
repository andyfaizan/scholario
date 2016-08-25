import React, { PropTypes } from 'react'
import Radium from 'radium'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const propTypes = {

}

function ChapterTabs() {
  const styles = getStyles()

  return (
    <div>
      <Card>
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
        />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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
