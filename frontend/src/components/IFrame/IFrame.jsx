import React, { PropTypes } from 'react'
import Radium from 'radium'


const propTypes = {
  src: PropTypes.string,
}

function IFrame({ src }) {
  const styles = getStyles()

  return (
    <iframe
      style={styles.fitParent}
      src={`https://docs.google.com/viewer?url=${src}&embedded=true`}
      height={600}
      frameBorder="0"
    />
    )
}

function getStyles() {
  return {
    fitParent: {
      display: 'block',
      width: '100%',
    },
  }
}

IFrame.propTypes = propTypes

export default Radium(IFrame)
