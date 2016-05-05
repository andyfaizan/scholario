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
import actions from '../redux/modules/Material'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import Material from '../../containers/Material'

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

const renderChild = (id, childId) => {
  return (
    <Material key={childId}
      id={childId}
      parentId={id}
      name="Child"
      subtext="Child subtext"
      fileType="png"
      />
  )
}

const getNestedItems = (id, childIds) => {
  console.log("id: " + id)
  console.log("childIds: " + childIds)
  var childItems = []
  for(var i=0; i < childIds.length; i++){
      var child = renderChild(id, childIds[i])
      childItems.push(child)
  }
  return childItems
}

// TODO: Selected list - hightlight current item
// TODO: Nested items idented to right
const Material = ({parentId, id, name, subtext, childIds, fileType}) => (
  <ListItem
    leftAvatar={<Avatar icon={fileType.length === 0 ? <FileFolder /> : <ActionAssignment />} />}
    rightIcon={fileType.length === 0 ? <AddCircle /> : <ActionInfo />}
    primaryText={name}
    secondaryText={subtext}
    initiallyOpen={fileType.length === 0}
    primaryTogglesNestedList={fileType.length === 0}
    // onTouchTap={onClick}
    nestedItems={ childIds ? getNestedItems(id, childIds) : []}
  />
);

Material.propTypes = {
  // onClick: PropTypes.func,
  parentId: PropTypes.number,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  subtext: PropTypes.string.isRequired,
  childIds: PropTypes.arrayOf(PropTypes.number.isRequired),
  fileType: PropTypes.string.isRequired
  // onMaterialClick: PropTypes.func.isRequired,
  // onAddClick: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    name: state.Material[ownProps.id].name,
    subtext: state.Material[ownProps.id].subtext,
    childIds: state.Material[ownProps.id].childIds,
    fileType: state.Material[ownProps.id].fileType,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps
)(Material)
