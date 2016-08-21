import React, { PropTypes } from 'react'
import Radium from 'radium'

import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import Avatar from 'material-ui/Avatar'

import { ScholarioBlue, greenBase } from '../../styles/colors'

const propTypes = {
  userId: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  avatarLetter: PropTypes.string,
}

const defaultProps = {
  userId: 0,
  title: 'News Feed Item',
  content: 'Rohan just uploaded "My favorite cat" to "My Cat Videos" package',
  avatarLetter: 'A',
}

function FeedItem({ title, content, avatarLetter }) {
  const styles = getStyles()

  return (
    <div>
      <Card style={styles.card}>
        <CardText>
          <div style={styles.container}>
            <Avatar
              color={ScholarioBlue}
              backgroundColor={greenBase}
              size={50}
              style={styles.avatar}
            >
            {avatarLetter}
            </Avatar>
          </div>
          <div style={styles.container}>
            <h4><strong>{title}</strong></h4>
          </div>
          <br />
          <div style={styles.content}>
            <h5>{content}</h5>
          </div>
        </CardText>
      </Card>
    </div>
  )
}

function getStyles() {
  return {
    avatar: {
      marginRight: '20px',
    },
    container: {
      display: 'inline-block',
    },
    content: {
      marginLeft: '70px',
    },
    card: {
      marginBottom: '10px',
    },
  }
}

FeedItem.propTypes = propTypes
FeedItem.defaultProps = defaultProps

export default Radium(FeedItem)
