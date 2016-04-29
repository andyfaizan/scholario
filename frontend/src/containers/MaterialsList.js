import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment';
import Colors from 'material-ui/lib/styles/colors';
import EditorInsertChart from 'material-ui/lib/svg-icons/editor/insert-chart';

import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';

type Props = {

}
export class MaterialsList extends React.Component {
  props: Props;

  render() {
    return (
      <div>
        <List subheader="Folders" insetSubheader={true}>
          <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} />}
            rightIcon={<ActionInfo />}
            primaryText="Photos"
            secondaryText="Jan 9, 2014"
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                key={1}
                primaryText="Starred"
                leftIcon={<ActionGrade />}
              />,
              <ListItem
                key={2}
                primaryText="Sent Mail"
                leftIcon={<ContentSend />}
                disabled={true}
                nestedItems={[
                  <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                ]}
              />,
            ]}
          />
          <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} />}
            rightIcon={<ActionInfo />}
            primaryText="Recipes"
            secondaryText="Jan 17, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} />}
            rightIcon={<ActionInfo />}
            primaryText="Work"
            secondaryText="Jan 28, 2014"
          />
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialsList)
