import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'

function Box({ width, height, content = 'Heading' }) {
  const boxStyle = {
    height,
    width,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  }

  return (
    <div>
      <Paper
        style={boxStyle}
        zDepth={1}
      >
        <h1>{content}</h1>
        {content}
      </Paper>
    </div>
  )
}

Box.propTypes = {
  content: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Box
