import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {submit} from 'redux-form'
import {hide} from '../redux/modules/modal'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import CreateCourseForm from '../forms/CreateCourseForm/CreateCourseForm'

export class CreateCourseModal extends React.Component {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    hide: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.create = this.create.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  create = () => {
    console.log('Creat course called')
    this.refs.myForm.submit()  // will return a promise
  }

  onSubmit = () => {
    this.props.hide()
    console.log('onSubmit called')
  }

  render() {
    const title = "Kurs Erstellen"
    const labelStyle = {
      color: 'white',
      fontWeight: 'bold'
    }

    const actions = [
      <div>
        <CreateCourseForm ref="myForm" onSubmit={this.onSubmit}/>
      </div>,
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.hide}/>,
      <RaisedButton
        // TODO disabled={submitting}
        label='Create'
        primary={false}
        backgroundColor='#f1c40f'
        labelStyle={labelStyle}
        onTouchTap={this.create}/>
    ];

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={true}
          open={this.props.modal.visible}>
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
