import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import Friend from 'material-ui/svg-icons/social/person'
import IconButton from 'material-ui/IconButton'

function FriendsDisplayComponent({ fullName, discipline, universityName }) {
  const friendsPaperStyle = {
    float: 'left',
    height: 170,
    width: 300,
    margin: 8.5,
    backgroundColor: 'white',
    color: '#1690DB',
    borderRadius: 13,
    overflow: 'inherit',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#1690DB',
  }

  const friendsButtonStyle = {

    margin: 'auto',
    width: '100%',
    height: 50,
    lineHeight: 50,
  }

  const noteFriendsStyle = {
    width: 60,
    height: 60,
  }

  const header = (
    <div>
      <h3>{fullName}</h3>
      <h5>{universityName}</h5>
      <h6>{discipline}</h6>
    </div>
    )

  const container = (
    <div>
      <IconButton disableTouchRipple style={friendsButtonStyle}>
        <Friend style={noteFriendsStyle} />
      </IconButton>
    </div>
    )

  const nodeFriendsComp = [

    header,
    container,
  ]

  return (
    <div>
      <Paper style={friendsPaperStyle} zDepth={1} children={nodeFriendsComp} />
    </div>
    )
}

FriendsDisplayComponent.propTypes = {
  fullName: PropTypes.string,
  discipline: PropTypes.string,
  universityName: PropTypes.string,
}

export default FriendsDisplayComponent
