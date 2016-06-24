import React, { PropTypes } from 'react'
import ListItem from 'material-ui/List/ListItem'
import ActionQuestionAnswer from 'material-ui/svg-icons/action/bookmark-border'
import IconButton from 'material-ui/IconButton'
import ThumbsUp from 'material-ui/svg-icons/action/delete'
import classes from './BookmarkItem.scss'

function BookmarkItem({ bookmarkLabel, datePosted, bookmarkURL, postedBy, onClickDeleteBookmark }) {
  const touchBookmark = () => {
    window.open(bookmarkURL)
  }

  const date = datePosted

  const secondaryText = (
    <div className={classes.styleSecondaryText}>
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
        style={classes.border}
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

BookmarkItem.propTypes = {
  bookmarkLabel: PropTypes.string,
  datePosted: PropTypes.string,
  bookmarkURL: PropTypes.string,
  postedBy: PropTypes.string,
  onClickDeleteBookmark: PropTypes.func,
}

export default BookmarkItem
