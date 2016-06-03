import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {submit} from 'redux-form'
import {hide} from '../redux/modules/modal'
import {ADD_BOOKMARK_MODAL as add_bookmark} from '../redux/modules/modal'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import AddBookmarkForm from '../forms/AddBookmarkForm/AddBookmarkForm'
import * as selectors from '../redux/selectors'
import { postBookmark, POST_BOOKMARK_REQUEST, POST_BOOKMARK_OK } from '../redux/modules/bookmark'

export class AddBookmarkModal extends React.Component {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    hide: PropTypes.func.isRequired
  }

  constructor(props) {
  super(props)
  this.create = this.create.bind(this)
  this.onAddBookmarkSubmit = this.onAddBookmarkSubmit.bind(this)
}

  create() {
    console.log("Create bookmark called")
    this.refs.myForm.submit()
  }

  onAddBookmarkSubmit(data) {
    console.log("onAddBookmarkSubmit called")
    this.props.postBookmark(this.props.pkgId, data)
    this.props.hide()
  }

  render() {
    const title = "Lesezeichen Hinzufügen"
    const labelStyle1 = {
      color: 'white',
      fontWeight: 'bold'
    }
    const labelStyle2 = {
      color: 'black'
    }

    const actions = [
      <FlatButton
          label="Abbrechen"
          secondary={true}
          labelStyle={labelStyle2}
          onTouchTap={this.props.hide}/>,
      <RaisedButton
        //disabled={this.props.request ? true : false}
        label='Fertig'
        primary={false}
        backgroundColor='#446CB3'
        labelStyle={labelStyle1}
        onTouchTap={this.create}/>
    ];

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={true}
          open={this.props.modal.visible}
          autoScrollBodyContent={true}
          autoDetectWindowHeight={true}>
            <AddBookmarkForm ref="myForm"
            onSubmit={this.onAddBookmarkSubmit} />
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    pkgId: selectors.getCurPkgId(state),
    request: selectors.getRequest(state, POST_BOOKMARK_REQUEST),
    postOk: selectors.getRequest(state, POST_BOOKMARK_OK)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hide: () => dispatch(hide(add_bookmark)),
    postBookmark: (pkgId, data) => {
        dispatch(postBookmark(pkgId, data.title, data.url))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(AddBookmarkModal)
