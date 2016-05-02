import React, { PropTypes } from 'react'
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment';
import Colors from 'material-ui/lib/styles/colors';
import EditorInsertChart from 'material-ui/lib/svg-icons/editor/insert-chart';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import Divider from 'material-ui/lib/divider';

const Data = ({ name, subtext, isFolder, subsubfolders, onClick }) => (
  <ListItem
    leftAvatar={<Avatar icon={isFolder ? <FileFolder /> : <ActionAssignment />} />}
    rightIcon={<ActionInfo />}
    primaryText={name}
    secondaryText={subtext}
    initiallyOpen={isFolder}
    primaryTogglesNestedList={isFolder}
    // nestedItems={[{children}]}
  />
);


function lazyFunction(f) {
    return function () {
        return f.apply(this, arguments);
    };
}

var lazyTreeType = lazyFunction(function () {
    return Data.propTypes;
});

Data.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  subtext: PropTypes.string.isRequired,
  isFolder: PropTypes.bool.isRequired,
  subsubfolders: React.PropTypes.arrayOf(lazyTreeType)
}

export default Data
