import React from 'react'
import classes from './IFrame.scss'

function IFrame({ src }) {
  return (
    <iframe
      className={classes.fitParent}
      src={`https://docs.google.com/viewer?url=${src}&embedded=true`}
      height={600}
      frameBorder="0"
    />
    )
}

IFrame.propTypes = {
  src: String,
}

export default IFrame
