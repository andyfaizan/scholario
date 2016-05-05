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

// TODO: Selected list - hightlight current item
// TODO: Nested items idented to right

export class Material extends React.Component {

  constructor(props) {
    super(props)
    this.renderChild = this.renderChild.bind(this)
    this.getNestedItems = this.getNestedItems.bind(this)
  }

  static propTypes = {
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

  handleAddChildClick = (e) => {
    e.preventDefault()
    const { addChild, createNode, id } = this.props
    const childId = createNode().nodeId
    add_child_material(id, childId)
  }

  handleRemoveClick = (e) => {
    e.preventDefault()
    const { removeChild, deleteNode, parentId, id } = this.props
    delete_child_material(parentId, id)
    delete_material(id)
  }

  renderChild = (child) => (
      <Material key={child.id}
        id={child.id}
        parentId={this.props.id}
        name={child.name}
        subtext={child.subtext}
        fileType={child.fileType}
        childIds={child.childIds}
        />
    )

  getNestedItems = () => {
    // console.log("id: " + id)
    // console.log("childIds: " + childIds)
    var childItems = []
    for(var i=0; i < this.props.children.length; i++){
        var child = this.renderChild(this.props.children[i])
        childItems.push(child)
    }
    return childItems
  }

  render(){

    let childItems = []
    if(this.props.children){
      childItems = this.getNestedItems()
    }

    let {fileType, name, subtext} = this.props
    return(
      <ListItem
        leftAvatar={<Avatar icon={fileType.length === 0 ? <FileFolder /> : <ActionAssignment />} />}
        rightIcon={fileType.length === 0 ? <AddCircle /> : <ActionInfo />}
        primaryText={name}
        secondaryText={subtext}
        initiallyOpen={fileType.length === 0}
        primaryTogglesNestedList={fileType.length === 0}
        // onTouchTap={onClick}
        nestedItems={childItems}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    name: state.Material[ownProps.id].name,
    subtext: state.Material[ownProps.id].subtext,
    childIds: state.Material[ownProps.id].childIds,
    fileType: state.Material[ownProps.id].fileType,
    children: state.Material[ownProps.id].childIds.map(id => state.Material[id])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps
)(Material)
