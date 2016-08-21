import React, { PropTypes } from 'react'
import Radium from 'radium'

import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'

import { ScholarioBlue, greenBase } from '../../styles/colors'

const propTypes = {
  amount: PropTypes.number,
  content: PropTypes.string,
}

const defaultProps = {
  amount: '10',
  content: 'What is a REST api?',
}

function Stat({ amount, content }) {
  const styles = getStyles()

  return (
    <ListItem
      style={styles.item}
      primaryText={content}
      leftAvatar={
        <Avatar
          color={ScholarioBlue}
          backgroundColor={greenBase}
          size={40}
          style={styles.avatar}
        >
          {amount}
        </Avatar>
      }
    />
  )
}

function getStyles() {
  return {
    item: {
    },
  }
}

Stat.propTypes = propTypes
Stat.defaultProps = defaultProps

export default Radium(Stat)
