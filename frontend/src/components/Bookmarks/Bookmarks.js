import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import List from 'material-ui/List/List'
import AddBox from 'material-ui/svg-icons/content/add-box'
import ViewList from 'material-ui/svg-icons/action/view-list'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import BookmarkItem from '../../components/BookmarkItem/BookmarkItem'
import ModalRoot from '../../containers/ModalRoot'
import classes from './Bookmarks.scss'
import { ADD_BOOKMARK_MODAL as addBookmarkModalAction } from '../../redux/modules/modal'

function Bookmarks({ bookmarks, modal, show, onClickDeleteBookmark }) {
  const allBookmarks = 'Alle Lesezeichen'
  const allBookmarksAdd = 'Eine Lesezeichen stellen'

  let bookmarkEls
  if (bookmarks) {
    bookmarkEls = bookmarks.map(bookmark =>
      <BookmarkItem
        key={bookmark._id}
        bookmarkLabel={bookmark.title}
        bookmarkURL={bookmark.url}
        datePosted={bookmark.createDate}
        onClickDeleteBookmark={() => onClickDeleteBookmark(bookmark._id, bookmark.pkg)}
      />
    )
  }
  let addBookmarkModal
  if (modal && modal.visible &&
      modal.modalType === addBookmarkModalAction) {
    addBookmarkModal = <ModalRoot modalType={addBookmarkModalAction} />
  }
  return (
    <div>
      <Card style={classes.border}>
        <CardText >
          <List>
            <Subheader style={classes.subheader}>
              <IconButton disableTouchRipple tooltip={allBookmarks} style={classes.iconStyles}>
                <ViewList color="#26A65B" />
              </IconButton>
              <IconButton disableTouchRipple tooltip={allBookmarksAdd} style={classes.iconStyles} onTouchTap={show}>
                <AddBox color="#26A65B" />
              </IconButton>
              Lesezeichen
            </Subheader>
            <div>
              {bookmarkEls}
              {addBookmarkModal}
            </div>
          </List>
        </CardText>
      </Card>
    </div>
  )
}

Bookmarks.propTypes = {
  bookmarks: PropTypes.array,
  modal: PropTypes.object,
  show: PropTypes.func,
  onClickDeleteBookmark: PropTypes.func,
}

export default Bookmarks
