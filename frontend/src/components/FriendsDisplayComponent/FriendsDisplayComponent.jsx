import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import Friend from 'material-ui/svg-icons/social/person'
import IconButton from 'material-ui/IconButton'
import classes from './FriendsDisplayComponent.scss'

function FriendsDisplayComponent({ fullName, discipline, universityName }) {
  const header = (
    <div>
      <h3>{fullName}</h3>
      <h5>{universityName}</h5>
      <h6>{discipline}</h6>
    </div>
  )

  const container = (
    <div>
      <IconButton disableTouchRipple className={classes.friendsButtonStyle}>
        <Friend className={classes.noteFriendsStyle} />
      </IconButton>
    </div>
  )

  const nodeFriendsComp = [
    header,
    container,
  ]

  return (
    <div>
      <Paper className={classes.friendsPaperStyle} zDepth={1} children={nodeFriendsComp} />
    </div>
    )
}

FriendsDisplayComponent.propTypes = {
  fullName: PropTypes.string,
  discipline: PropTypes.string,
  universityName: PropTypes.string,
}

export default FriendsDisplayComponent
