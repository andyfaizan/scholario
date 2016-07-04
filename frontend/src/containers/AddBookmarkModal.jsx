import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { hide, ADD_BOOKMARK_MODAL as addBookmarkModalAction } from '../redux/modules/modal'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import AddBookmarkForm from '../forms/AddBookmarkForm/AddBookmarkForm'
import * as selectors from '../redux/selectors'
import { postBookmark, POST_BOOKMARK_REQUEST, POST_BOOKMARK_OK } from '../redux/modules/bookmark'

const propTypes = {
  modal: PropTypes.object.isRequired,
  pkgId: PropTypes.string,
  request: PropTypes.object,
  postOk: PropTypes.string,
  hide: PropTypes.func.isRequired,
  postBookmark: PropTypes.func,
}

export class AddBookmarkModal extends React.Component {
  constructor(props) {
    super(props)
    this.create = this.create.bind(this)
    this.onAddBookmarkSubmit = this.onAddBookmarkSubmit.bind(this)
  }

  onAddBookmarkSubmit(data) {
    this.props.postBookmark(this.props.pkgId, data)
    this.props.hide()
  }

  create() {
    this.refs.myForm.submit()
  }

  render() {
    const styles = getStyles()
    const title = 'Lesezeichen Hinzufügen'

    const actions = [
      <FlatButton
        label="Abbrechen"
        secondary
        labelStyle={styles.labelStyle2}
        onTouchTap={this.props.hide}
      />,
      <RaisedButton
        // disabled={this.props.request ? true : false}
        label="Fertig"
        primary={false}
        backgroundColor="#446CB3"
        labelStyle={styles.labelStyle1}
        onTouchTap={this.create}
      />,
    ]

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal
          open={this.props.modal.visible}
          autoScrollBodyContent
          autoDetectWindowHeight
        >
          <AddBookmarkForm
            ref="myForm"
            onSubmit={this.onAddBookmarkSubmit}
          />
        </Dialog>
      </div>
    )
  }
}

function getStyles() {
  return {
    labelStyle1: {
      color: 'white',
      fontWeight: 'bold',
    },
    labelStyle2: {
      color: 'black',
    },
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
  pkgId: selectors.getCurPkgId(state),
  request: selectors.getRequest(state, POST_BOOKMARK_REQUEST),
  postOk: selectors.getRequest(state, POST_BOOKMARK_OK),
})

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hide(addBookmarkModalAction)),
  postBookmark: (pkgId, data) => {
    dispatch(postBookmark(pkgId, data.title, data.url))
  },
})

AddBookmarkModal.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Radium(AddBookmarkModal))
