import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {submit} from 'redux-form'
import {hide} from '../redux/modules/modal'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import Avatar from 'material-ui/lib/avatar'
import CreateCourseForm from '../forms/CreateCourseForm/CreateCourseForm'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

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
    const avatarStyle = {
      marginLeft: '50%'
    }

    const actions = [
      <FlatButton
        label="Abbrechen"
        secondary={false}
        onTouchTap={this.props.hide}/>,
      <RaisedButton
        // TODO disabled={submitting}
        label='Erstellen'
        primary={false}
        backgroundColor='#446CB3'
        labelStyle={labelStyle}
        onTouchTap={this.create}/>
    ];

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={true}
          open={this.props.modal.visible}
          autoScrollBodyContent={true}>
          <Row>
            <Col md={1}>
              <Avatar src="http://lorempixel.com/100/100/nature/" style={avatarStyle}/>
            </Col>
            <Col md={11}>
              <CreateCourseForm ref="myForm" onSubmit={this.onSubmit}/>
            </Col>
          </Row>
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
