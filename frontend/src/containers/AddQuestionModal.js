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
    this.calculateFormProps = this.calculateFormProps.bind(this)
    this.getObjects = this.getObjects.bind(this)
    this.data = this.calculateFormProps()
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

  getObjects(obj) {
    var array=[]
    for (var p in obj) {
      if (obj[p] instanceof Object) {
        array.push(obj[p])
      }
    }
    return array
  }

  calculateFormProps = () => {
    var defaultData = {
      courseInstance : '',
      pkg: '',
      material: ''
    }
    if(this.props.location){
      let pathArray = this.props.location.pathname.split("/")
      let currentLevel = pathArray[1]
      let id = pathArray[2]
      console.log(id)
      switch (currentLevel) {
        case "course":
          defaultData.courseInstance = id
          defaultData.pkg = ''
          defaultData.material = ''
          console.log(defaultData);
        break;

        case "package":
        var currCourseInstance
        var flag=0
        defaultData.pkg = id
        for (var i = 0; i < this.props.courseInstances.length && flag === 0; i++) {
          for (var j = 0; j < this.props.courseInstances[i].pkgs.length; j++) {
            if(this.props.courseInstances[i].pkgs[j]._id === id){
              currCourseInstance = this.props.courseInstances[i]
              flag=1
              break
            }
          }
        }
        defaultData.courseInstance = currCourseInstance._id
        defaultData.material = ''
        console.log(defaultData);
        break;

        case "material":
        defaultData.material = id
        let pkgArray = this.getObjects(this.props.allPkgs)
        let currPkg
        let flag = 0
        for ( var i = 0; i < pkgArray.length && flag === 0; i++ ){
          if(pkgArray[i].materials)
            for (var j = 0; j < pkgArray[i].materials.length; j++) {
              console.log(pkgArray[i]);
              if ( pkgArray[i].materials[j]._id === id ) {
                currPkg = pkgArray[i]
                flag = 1
                break
              }
            }
        }
        defaultData.pkg = currPkg._id
        let currCourseInstance
        flag = 0
        for (var i = 0; i < this.props.courseInstances.length && flag === 0; i++) {
          for (var j = 0; j < this.props.courseInstances[i].pkgs.length; j++) {
            if(this.props.courseInstances[i].pkgs[j]._id === currPkg._id){
              currCourseInstance = this.props.courseInstances[i]
              flag=1
              break;
            }
          }
        }
        defaultData.courseInstance = currCourseInstance._id
        break;

        default:
        defaultData.courseInstance = ''
        defaultData.pkg = ''
        defaultData.material = ''
        break;
      }
    }
    return defaultData
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
            defaultData={this.data}/>
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
