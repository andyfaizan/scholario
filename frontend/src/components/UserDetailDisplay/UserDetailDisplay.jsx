import React, { PropTypes } from 'react'
import Radium from 'radium'

import Avatar from 'material-ui/Avatar'
import ListItem from 'material-ui/List/ListItem'
import Divider from 'material-ui/Divider'

import ActivityOfUser from '../../components/ActivityOfUser/ActivityOfUser'

const propTypes = {
  nameInitialForAvatar: PropTypes.string,
  fullName: PropTypes.string,
  universityName: PropTypes.string,
  programmeEnrolled: PropTypes.stirng,
  socialConnects: PropTypes.array,
}

function UserDetailDisplay() {
  const styles = getStyles()

  return (
    <div>
      <ListItem
        leftAvatar={
          <Avatar>
            A
          </Avatar>
        }
      >
        Letter Avatar  custom colors and size
      </ListItem>
      <div style={styles.userMetadata}>
        <h5>RWTH AAachen</h5>
        <h5>Media  Informatics</h5>
        <h5>Social Connects </h5>
        <br />
      </div>
      <Divider />
      <br />
      <ActivityOfUser />
    </div>
    )
}

function getStyles() {
  return {
    forgotPassword: {
      display: 'table-cell',
      verticalAlign: 'middle',
    },
    userMetadata: {
      position: 'relative',
      marginLeft: '75px',
      marginTop: '-10px',
    },
  }
}

UserDetailDisplay.propTypes = propTypes

export default Radium(UserDetailDisplay)

