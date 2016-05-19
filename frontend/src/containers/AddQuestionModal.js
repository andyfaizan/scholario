import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {submit} from 'redux-form'
import {hide} from '../redux/modules/modal'
import {addQuestion} from '../redux/modules/question'
import {ADD_QUESTION_MODAL as add_question} from '../redux/modules/modal'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import AddQuestionForm from '../forms/AddQuestionForm/AddQuestionForm'
import * as selectors from '../redux/selectors'

export class AddQuestionModal extends React.Component {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    hide: PropTypes.func.isRequired,
    location: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.create = this.create.bind(this)
    this.onAddQuestionSubmit = this.onAddQuestionSubmit.bind(this)
  }

  create = () => {
    console.log('Create question called')
    this.refs.myForm.submit()  // will return a promise
  }

  onAddQuestionSubmit = (data) => {
    console.log('onAddQuestionSubmit called')
    //this.props.addQuestion(data)
    this.props.hide()
  }

  render() {
    const title = "Eine Frage stellen"
    const labelStyle = {
      color: 'white',
      fontWeight: 'bold'
    }

    const actions = [
      <FlatButton
        label="Verwerfen"
        secondary={true}
        onTouchTap={this.props.hide}/>,
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
          autoDetectWindowHeight={true}>
            <AddQuestionForm ref="myForm"
            onSubmit={this.onAddQuestionSubmit}
            courseInstances={this.props.courseInstances}
            allPkgs={this.props.allPkgs}
            location={this.props.location}/>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    courseInstances: selectors.getUserCourseInstances(state),
    allPkgs: selectors.getPkgs(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hide: () => dispatch(hide(add_question)),
    addQuestion: (data) => {
        dispatch(addQuestion(data.title, data.content,
          data.course, data.pkg, data.material))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(AddQuestionModal)
