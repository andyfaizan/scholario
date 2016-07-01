import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { hide } from '../redux/modules/modal'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import CreateCourseForm from '../forms/CreateCourseForm/CreateCourseForm'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'


const propTypes = {
  modal: PropTypes.object.isRequired,
  hide: PropTypes.func.isRequired,
}

export class CreateCourseModal extends React.Component {
  constructor(props) {
    super(props)
    this.create = this.create.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit = () => {
    this.props.hide()
  }

  create = () => {
    this.refs.myForm.submit()  // will return a promise
  }

  render() {
    const title = 'Kurs Erstellen'
    const labelStyle = {
      color: 'white',
      fontWeight: 'bold',
    }
    const avatarStyle = {
      marginLeft: '50%',
    }

    const actions = [
      <FlatButton
        label="Abbrechen"
        secondary={false}
        onTouchTap={this.props.hide}
      />,
      <RaisedButton
        // TODO disabled={submitting}
        label="Erstellen"
        primary={false}
        backgroundColor="#446CB3"
        labelStyle={labelStyle}
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
        >
          <Row>
            <Col md={1}>
              <Avatar src="http://lorempixel.com/100/100/nature/" style={avatarStyle} />
            </Col>
            <Col md={11}>
              <CreateCourseForm ref="myForm" onSubmit={this.onSubmit} />
            </Col>
          </Row>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
})

CreateCourseModal.propTypes = propTypes

export default connect((mapStateToProps), {
  hide: () => hide('CREATE_COURSE_MODAL'),
})(CreateCourseModal)