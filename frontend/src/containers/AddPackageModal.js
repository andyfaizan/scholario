import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {submit} from 'redux-form'
import {hide} from '../redux/modules/modal'
import {addPkg} from '../redux/modules/pkg'
import {ADD_PACKAGE_MODAL as add_package} from '../redux/modules/modal'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import AddPackageForm from '../forms/AddPackageForm/AddPackageForm'
import * as selectors from '../redux/selectors'

export class AddPackageModal extends React.Component {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    hide: PropTypes.func.isRequired,
    location: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.create = this.create.bind(this)
    this.onAddPkgSubmit = this.onAddPkgSubmit.bind(this)
    this.calculateFormProps = this.calculateFormProps.bind(this)
    this.getObjects = this.getObjects.bind(this)
    this.getCourseFromPkg = this.getCourseFromPkg.bind(this)
    this.getCourseFromMaterial = this.getCourseFromMaterial.bind(this)
    this.data = this.calculateFormProps()
  }

  create = () => {
    console.log('Create pkg called')
    this.refs.myForm.submit()  // will return a promise
  }

  onAddPkgSubmit = (data) => {
    console.log('onAddPkgSubmit called')
    this.props.addPkg(data)
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

  getCourseFromMaterial = (pkgArray, id) => {
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
      courseInstance : ''
    }
    if(this.props.location){
      let pathArray = this.props.location.pathname.split("/")
      let currentLevel = pathArray[1]
      let id = pathArray[2]
      if(typeof id !== "number")
        return defaultData
      let currCourseInstance

      switch (currentLevel) {
        case "course":
          defaultData.courseInstance = id
        break;

        case "package":
          currCourseInstance = this.getCourseFromPkg(id)
          defaultData.courseInstance = currCourseInstance._id
        break;

        case "material":
          let pkgArray = this.getObjects(this.props.allPkgs)
          let currPkg = this.getPkgFromMaterial(pkgArray, id)
          currCourseInstance = this.getCourseFromPkg(currPkg._id)
          defaultData.courseInstance = currCourseInstance._id
        break;
      }
    }
    return defaultData
  }

  render() {
    const title = "Package Erstellen"
    const labelStyle1 = {
      color: 'white',
      fontWeight: 'bold'
    }
    const labelStyle2 = {
      color: 'black'
    }

    const actions = [
      <FlatButton
        label="Verwerfen"
        secondary={true}
        labelStyle={labelStyle2}
        onTouchTap={this.props.hide}/>,
      <RaisedButton
        // TODO disabled={submitting}
        label='Zustimmen'
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
            <AddPackageForm ref="myForm"
            onSubmit={this.onAddPkgSubmit}
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
    hide: () => dispatch(hide(add_package)),
    addPkg: (data) => {
        dispatch(addPkg(data.name, data.courseInstance,
          data.access))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(AddPackageModal)
