import React, { PropTypes } from 'react'
import Radium from 'radium'

import Paper from 'material-ui/Paper'
import Friend from 'material-ui/svg-icons/social/person'
import IconButton from 'material-ui/IconButton'


const propTypes = {
  fullName: PropTypes.string,
  discipline: PropTypes.string,
  universityName: PropTypes.string,
}

function FriendsDisplayComponent({ fullName, discipline, universityName }) {
  const styles = getStyles()

  const header = (
    <div>
      <h3>{fullName}</h3>
      <h5>{universityName}</h5>
      <h6>{discipline}</h6>
    </div>
  )

  const container = (
    <div>
      <IconButton disableTouchRipple style={styles.friendsButtonStyle}>
        <Friend style={styles.noteFriendsStyle} />
      </IconButton>
    </div>
  )

  const nodeFriendsComp = [
    header,
    container,
  ]

  return (
    <div>
      <Paper style={styles.friendsPaperStyle} zDepth={1} children={nodeFriendsComp} />
    </div>
    )
}

function getStyles() {
  return {
    friendsPaperStyle: {
      float: 'left',
      height: '170px',
      width: '300px',
      margin: '8.5px',
      backgroundColor: 'white',
      color: '#1690DB',
      borderRadius: '13px',
      overflow: 'inherit',
      alignItems: 'center',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#1690DB',
    },
    friendsButtonStyle: {
      margin: 'auto',
      width: '100%',
      height: '50px',
      lineHeight: '50px',
    },
    noteFriendsStyle: {
      width: '60px',
      height: '60px',
    },
  }
}

FriendsDisplayComponent.propTypes = propTypes

export default Radium(FriendsDisplayComponent)
