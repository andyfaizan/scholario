import React, { PropTypes } from 'react'
import Radium from 'radium'

import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'

import { ScholarioBlue, greenBase } from '../../styles/colors'

const propTypes = {
  totalAmount: PropTypes.number,
  content: PropTypes.string,
}

const defaultProps = {
  totalAmount: '10',
  content: 'What is a REST api?',
}

function Stat({ totalAmount, content }) {
  const styles = getStyles()

  return (
    <ListItem
      disabled
      style={styles.item}
      leftAvatar={
        <Avatar
          color={ScholarioBlue}
          backgroundColor={greenBase}
          size={50}
          style={styles.avatar}
        >
          {totalAmount}
        </Avatar>
      }
    >
      {content}
    </ListItem>
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
