import React, { PropTypes } from 'react'
import Radium from 'radium'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import List from 'material-ui/List/List'
import AddBox from 'material-ui/svg-icons/content/add-box'
import ViewList from 'material-ui/svg-icons/action/view-list'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import BookmarkItem from '../../components/BookmarkItem/BookmarkItem'
import ModalRoot from '../../modals/ModalRoot'
import { ADD_BOOKMARK_MODAL as addBookmarkModalAction } from '../../redux/modules/modal'


const propTypes = {
  bookmarks: PropTypes.array,
  modal: PropTypes.object,
  show: PropTypes.func,
  onClickDeleteBookmark: PropTypes.func,
}

function Bookmarks({ bookmarks, modal, show, onClickDeleteBookmark }) {
  const styles = getStyles()

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
      <Card style={styles.border}>
        <CardText >
          <List>
            <Subheader style={styles.subheader}>
              <IconButton disableTouchRipple tooltip={allBookmarks} style={styles.iconStyles}>
                <ViewList color="#26A65B" />
              </IconButton>
              <IconButton disableTouchRipple tooltip={allBookmarksAdd} style={styles.iconStyles} onTouchTap={show}>
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

function getStyles() {
  return {
    border: {
      color: '#26A65B',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#26A65B',
    },
    subheader: {
      color: '#26A65B',
    },
    iconStyles: {
      float: 'left',
      position: 'relative',
      marginLeft: '-15px',
    },
  }
}

Bookmarks.propTypes = propTypes

export default Radium(Bookmarks)
