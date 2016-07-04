import React, { PropTypes } from 'react'
import Radium from 'radium'
import ListItem from 'material-ui/List/ListItem'
import ActionQuestionAnswer from 'material-ui/svg-icons/action/bookmark-border'
import IconButton from 'material-ui/IconButton'
import ThumbsUp from 'material-ui/svg-icons/action/delete'


const propTypes = {
  bookmarkLabel: PropTypes.string,
  datePosted: PropTypes.string,
  bookmarkURL: PropTypes.string,
  postedBy: PropTypes.string,
  onClickDeleteBookmark: PropTypes.func,
}

function BookmarkItem({ bookmarkLabel, datePosted, bookmarkURL, postedBy, onClickDeleteBookmark }) {
  const styles = getStyles()

  const touchBookmark = () => {
    window.open(bookmarkURL)
  }

  const date = datePosted

  const secondaryText = (
    <div style={styles.styleSecondaryText}>
        {postedBy} gepostet am {date ? date.slice(0, 10) : ''}
    </div>
  )

  return (
    <div>
      <ListItem
        leftIcon={<ActionQuestionAnswer color="#26A65B" />}
        primaryText={bookmarkLabel}
        secondaryText={secondaryText}
        innerDivStyle={{ color: '#26A65B' }}
        style={styles.border}
        rightIconButton={
          <div>
            <IconButton disableTouchRipple onTouchTap={onClickDeleteBookmark}>
              <ThumbsUp color="#EF4836" />
            </IconButton>
          </div>
        }
        onTouchTap={touchBookmark}
      />
    </div>
  )
}

function getStyles() {
  return {
    styleSecondaryText: {
      color: '#26A65B',
      opacity: 0.2,
    },
    border: {
      color: '#26A65B',
    },
  }
}

BookmarkItem.propTypes = propTypes

export default Radium(BookmarkItem)
