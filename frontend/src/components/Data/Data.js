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
import AddCircle from 'material-ui/lib/svg-icons/content/add-circle'
import Divider from 'material-ui/lib/divider';
import actions from '../../redux/modules/Material'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const handleAddChildClick = (e) => {
  e.preventDefault()
  const { addChild, createNode, id } = this.props
  const childId = createNode().nodeId
  add_child_material(id, childId)
}

const handleRemoveClick = (e) => {
  e.preventDefault()
  const { removeChild, deleteNode, parentId, id } = this.props
  delete_child_material(parentId, id)
  delete_material(id)
}

const renderChild = (childId) => {
  const { id } = this.props
  return (
    <ListItem key={childId}>
      <ConnectedData id={childId} parentId={id} />
    </ListItem>
  )
}

const getNestedItems = (childIds) => {
  var childItems = []
  for(var i=0; i < childIds.length; i++){
      var child = renderChild(childIds[i])
      childItems.push(child)
  }
  return childItems
}

const Data = ({parentId, id, name, subtext, childIds, fileType}) => (
  <ListItem
    leftAvatar={<Avatar icon={fileType.length === 0 ? <FileFolder /> : <ActionAssignment />} />}
    rightIcon={fileType.length === 0 ? <AddCircle /> : <ActionInfo />}
    primaryText={name}
    secondaryText={subtext}
    initiallyOpen={fileType.length === 0}
    primaryTogglesNestedList={fileType.length === 0}
    // onTouchTap={onClick}
    //nestedItems={children}
    //{childIds.map(renderChild)}
  />
);

Data.propTypes = {
  // onClick: PropTypes.func,
  parentId: PropTypes.number,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  subtext: PropTypes.string.isRequired,
  childIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  fileType: PropTypes.string.isRequired
  // onMaterialClick: PropTypes.func.isRequired,
  // onAddClick: PropTypes.func.isRequired
}

// function lazyFunction(f) {
//     return function () {
//         return f.apply(this, arguments);
//     };
// }
//
// var lazyTreeType = lazyFunction(function () {
//     return Data.propTypes;
// });

export default Data
