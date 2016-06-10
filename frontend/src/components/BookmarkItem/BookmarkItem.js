import React, { PropTypes } from 'react'
import ListItem from 'material-ui/List/ListItem';
import Colors from 'material-ui/styles/colors';
import ActionQuestionAnswer from 'material-ui/svg-icons/action/bookmark-border';
import IconButton from 'material-ui/IconButton';
import { Router, Route, Link } from 'react-router'
import { browserHistory } from '../../history'
import ThumbsUp from 'material-ui/svg-icons/action/delete';

type Props = {

	bookmarkLabel: string,
	datePosted: string,
	bookmarkURL: string,
  	postedBy: string

};

export class BookmarkItem extends React.Component {
  props: Props;

  render () {


  	const styleSecondaryText = {

      color: '#26A65B',
      opacity: 0.2
    };

    const border = {

      color:'#26A65B'

    };

    const touchBookmark = () => {
        window.open(this.props.bookmarkURL);

      }

    const date = this.props.datePosted;

    const secondaryText = <div className={styleSecondaryText}>
                              {this.props.postedBy} gepostet am {date ? date.slice(0,10) : ''}
                          </div>

    return (
      <div>
          <ListItem
            leftIcon={<ActionQuestionAnswer color="#26A65B"/>}
            primaryText= {this.props.bookmarkLabel}
            secondaryText={secondaryText}
            innerDivStyle={{color:'#26A65B'}}
            style={border}
            rightIconButton={<div><IconButton onTouchTap={this.props.onClickDeleteBookmark}>
                             <ThumbsUp color='#EF4836' /></IconButton></div>}
            onTouchTap={touchBookmark}
          />
      </div>
    )
  }
}

export default BookmarkItem
