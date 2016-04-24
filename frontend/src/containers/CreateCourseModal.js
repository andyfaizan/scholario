import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {hide} from '../redux/modules/Modal'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import CreateCourseForm from '../forms/CreateCourseForm/CreateCourseForm'

export class CreateCourseModal extends React.Component {
  static propTypes = {
    modal: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired
  }

  render() {

    const title = "Kurs Erstellen"

    const labelStyle = {
      color: 'white',
      fontWeight: 'bold'
    }

    const create = () => {
      console.log('Created course')
    }

    const actions = [
      <div>
        <CreateCourseForm {...create}/>
      </div>,
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.hide}
      />,
      <RaisedButton
        // TODO disabled={submitting}
        label='Create'
        // type='submit'
        primary={false}
        backgroundColor='#f1c40f'
        labelStyle={labelStyle}
        onTouchTap={this.props.hide}
        onClick={create}
        />
    ];

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={true}
          open={this.props.modal.visible}
          onRequestClose={this.props.hide}>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal
})
export default connect((mapStateToProps), {
  hide: () => hide('CREATE_COURSE_MODAL')
})(CreateCourseModal)
