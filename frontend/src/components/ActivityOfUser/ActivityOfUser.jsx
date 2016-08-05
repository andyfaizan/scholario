import React, { PropTypes } from 'react'
import Radium from 'radium'

import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'

const propTypes = {
  typeOfActivity: PropTypes.string,
  activityDetail: PropTypes.string,
}

function ActivityOfUser() {
  // const styles = getStyles()

  return (
    <div>
      <ListItem
        leftAvatar={
          <Avatar>
            wZ
          </Avatar>
        }
      >
        Activity Detail
      </ListItem>
    </div>
  )
}

// function getStyles() {
//   return {
//     forgotPassword: {
//       display: 'table-cell',
//       verticalAlign: 'middle',
//     },
//     userMetadata: {
//       position: 'relative',
//       marginLeft: '75px',
//       marginTop: '-10px',
//     },
//   }
// }

ActivityOfUser.propTypes = propTypes

export default Radium(ActivityOfUser)

