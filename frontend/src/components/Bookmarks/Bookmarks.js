import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';
import AddBox from 'material-ui/svg-icons/content/add-box';
import ViewList from 'material-ui/svg-icons/action/view-list';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import { Router, Route, Link } from 'react-router'
import BookmarkItem from '../../components/BookmarkItem/BookmarkItem'
import ModalRoot from '../../containers/ModalRoot'
import {ADD_BOOKMARK_MODAL as add_bookmark} from '../../redux/modules/modal'

type Props = {
  bookmarks: Array,
  modal: Object,
  show: Function
};

export class Bookmarks extends React.Component {
  props: Props;

  render () {

  	const boolQuestionClickable = false ;

    const border = {
      color:'#26A65B',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#26A65B'
           };
    const subheader ={
      color:'#26A65B'
    } ;

    const iconStyles = {
      float: 'left',
      position: 'relative',
      marginLeft: -15
    };

    const allBookmarks = "Alle Lesezeichen"
    const allBookmarksAdd = "Eine Lesezeichen stellen"

    var bookmarks
    if (this.props.bookmarks) {
      bookmarks = this.props.bookmarks.map(bookmark =>
        <BookmarkItem
          key={bookmark._id}
          bookmarkLabel={bookmark.title}
          bookmarkURL={bookmark.url}
          datePosted={bookmark.createDate}
        />
      )
    }
    var addBookmarkModal
    if (this.props.modal && this.props.modal.visible &&
        this.props.modal.modalType === add_bookmark) {
      addBookmarkModal = <ModalRoot modalType={add_bookmark} />
    }
    return (
      <div>
      	<Card style={border}>
          <CardText >
            <List>
              <Subheader style={subheader}>
                <IconButton tooltip={allBookmarks} style={iconStyles}>
                  <ViewList color='#26A65B' />
                </IconButton>
                <IconButton tooltip={allBookmarksAdd} style={iconStyles} onTouchTap={this.props.show}>
                  <AddBox color='#26A65B' />
                </IconButton>
                Lesezeichen
              </Subheader>
              <div>
                {bookmarks}
                {addBookmarkModal}
              </div>
            </List>
          </CardText>
       </Card>
      </div>
    )
  }
}

export default Bookmarks
