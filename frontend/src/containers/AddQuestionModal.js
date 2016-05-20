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
    this.getCourseFromPkg = this.getCourseFromPkg.bind(this)
    this.getPkgFromMaterial = this.getPkgFromMaterial.bind(this)
    this.data = this.calculateFormProps()
  }

  create = () => {
    console.log('Create question called')
    this.refs.myForm.submit()  // will return a promise
  }

  onAddQuestionSubmit = (data) => {
    console.log('onAddQuestionSubmit called')
    this.props.addQuestion(data)
    this.props.hide()
  }

  getCourseFromPkg = (id) => {
    if(this.props.courseInstances)
    for (var i = 0; i < this.props.courseInstances.length; i++) {
      for (var j = 0; j < this.props.courseInstances[i].pkgs.length; j++) {
        if(this.props.courseInstances[i].pkgs[j]._id === id){
          return this.props.courseInstances[i]
        }
      }
    }
  }

  getPkgFromMaterial = (pkgArray, id) => {
    for ( var i = 0; i < pkgArray.length; i++ ){
        for (var j = 0; j < pkgArray[i].materials.length; j++) {
          if ( pkgArray[i].materials[j]._id === id ) {
            return pkgArray[i]
          }
        }
    }
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
    if(this.props.courseInstances && this.props.courseInstances.length > 0)
    if(this.props.location){
      let pathArray = this.props.location.pathname.split("/")
      let currentLevel = pathArray[1]
      let id = pathArray[2]
      if(typeof id !== "number")
        return
      let currCourseInstance
      let pkgArray
      let currPkg

      switch (currentLevel) {
        case "course":
          defaultData.courseInstance = id
        break;

        case "package":
          defaultData.pkg = id
          currCourseInstance = this.getCourseFromPkg(id)
          defaultData.courseInstance = currCourseInstance._id
        break;

        case "material":
          defaultData.material = id
          pkgArray = this.getObjects(this.props.allPkgs)
          currPkg = this.getPkgFromMaterial(pkgArray, id)
          defaultData.pkg = currPkg._id
          currCourseInstance = this.getCourseFromPkg(currPkg._id)
          defaultData.courseInstance = currCourseInstance._id
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
        secondary={false}
        onTouchTap={this.props.hide}/>,
      <RaisedButton
        // TODO disabled={submitting}
        label='Zustimmen'
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
          autoScrollBodyContent={true}
          autoDetectWindowHeight={true}>
            <AddQuestionForm ref="myForm"
            onSubmit={this.onAddQuestionSubmit}
            courseInstances={this.props.courseInstances}
            allPkgs={this.props.allPkgs}
            defaultData={this.data}
            getObjects={this.getObjects}/>
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
        dispatch(addQuestion(data.title, data.description,
          data.courseInstance, data.pkg, data.material))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(AddQuestionModal)
