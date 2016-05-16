import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {submit} from 'redux-form'
import {hide} from '../redux/modules/modal'
import {ADD_QUESTION_MODAL as add_question} from '../redux/modules/modal'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import Avatar from 'material-ui/lib/avatar'
import AddQuestionForm from '../forms/AddQuestionForm/AddQuestionForm'
import * as selectors from '../redux/selectors'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'


export class AddQuestionModal extends React.Component {
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
    console.log('Create question called')
    this.refs.myForm.submit()  // will return a promise
  }

  onSubmit = () => {
    this.props.hide()
    console.log('onSubmit called')
  }

  render() {
    const title = "Eine Frage stellen"
    const labelStyle = {
      color: 'white',
      fontWeight: 'bold'
    }

    const dialogStyle = {
      maxHeight: '500'
    }

    const actions = [
      <FlatButton
        label="Verwerfen"
        secondary={true}
        onTouchEnd={this.props.hide}/>,
      <RaisedButton
        // TODO disabled={submitting}
        label='Zustimmen'
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
          open={this.props.modal.visible}
          autoScrollBodyContent={true}
          autoDetectWindowHeight={true}
          contentStyle={dialogStyle}>
          <Row>
            <Col md={1}>
              <Avatar src="http://lorempixel.com/100/100/nature/"/>
            </Col>
            <Col md={11}>
              <AddQuestionForm ref="myForm" onSubmit={this.onSubmit}/>
            </Col>
          </Row>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    courses: selectors.getUserCourseInstances(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hide: () => dispatch(hide(add_question))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps)
(AddQuestionModal)
