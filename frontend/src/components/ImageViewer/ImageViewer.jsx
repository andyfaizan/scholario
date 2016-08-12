import React, { PropTypes } from 'react'
import Radium from 'radium'
import { CardMedia, CardTitle } from 'material-ui/Card'
// import { RotateLeft } from 'material-ui/svg-icons/image/rotate-left'
// import { RotateRight } from 'material-ui/svg-icons/image/rotate-right'

const propTypes = {
  src: PropTypes.string,
}

function ImageViewer({ src }) {
  // const styles = getStyles()

  return (
    <div>
      <CardMedia
        overlay={
          <div>
            <CardTitle title="Overlay title" subtitle="Overlay subtitle" />
          </div>
        }
      >
        <img src={src} alt="Not visible" />
      </CardMedia>
    </div>
  )
}

// <RotateLeft />
// <RotateRight />

// function getStyles() {
//   return {
//
//   }
// }

ImageViewer.propTypes = propTypes

export default Radium(ImageViewer)
