import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import _ from 'lodash'
import { addPkg } from '../redux/modules/pkg'
import { hide, ADD_PACKAGE_MODAL as addPackageModalAction } from '../redux/modules/modal'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import AddPackageForm from '../forms/AddPackageForm/AddPackageForm'
import * as selectors from '../redux/selectors'


const propTypes = {
  modal: PropTypes.object.isRequired,
  location: PropTypes.object,
  courseInstances: PropTypes.array,
  allPkgs: PropTypes.array,
  hide: PropTypes.func.isRequired,
  addPkg: PropTypes.func,
}

export class AddPackageModal extends React.Component {
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

  onAddPkgSubmit = (data) => {
    this.props.addPkg(data)
    this.props.hide()
  }

  getCourseFromPkg = (id) => {
    if (this.props.courseInstances) {
      for (let i = 0; i < this.props.courseInstances.length; i++) {
        for (let j = 0; j < this.props.courseInstances[i].pkgs.length; j++) {
          if (this.props.courseInstances[i].pkgs[j]._id === id) {
            return this.props.courseInstances[i]
          }
        }
      }
    }
    return {}
  }

  getCourseFromMaterial = (pkgArray, id) => {
    for (let i = 0; i < pkgArray.length; i++) {
      for (let j = 0; j < pkgArray[i].materials.length; j++) {
        if (pkgArray[i].materials[j]._id === id) {
          return pkgArray[i]
        }
      }
    }
    return {}
  }

  getObjects(obj) {
    return _.pickBy(obj, _.isObjectLike)
  }

  create = () => {
    this.refs.myForm.submit()  // will return a promise
  }

  calculateFormProps = () => {
    const defaultData = {
      courseInstance: '',
    }
    if (this.props.location) {
      const pathArray = this.props.location.pathname.split('/')
      const currentLevel = pathArray[1]
      const id = pathArray[2]
      if (typeof id !== 'number') return defaultData
      let currCourseInstance

      switch (currentLevel) {
      case 'course':
        defaultData.courseInstance = id
        break

      case 'package':
        currCourseInstance = this.getCourseFromPkg(id)
        defaultData.courseInstance = currCourseInstance._id
        break

      case 'material': {
        const pkgArray = this.getObjects(this.props.allPkgs)
        const currPkg = this.getPkgFromMaterial(pkgArray, id)
        currCourseInstance = this.getCourseFromPkg(currPkg._id)
        defaultData.courseInstance = currCourseInstance._id
        break
      }
      default:
        break
      }
    }
    return defaultData
  }

  render() {
    const styles = getStyles()
    const title = 'Package Erstellen'

    const actions = [
      <FlatButton
        label="Abbrechen"
        secondary
        labelStyle={styles.labelStyle2}
        onTouchTap={this.props.hide}
      />,
      <RaisedButton
        // TODO disabled={submitting}
        label="Erstellen"
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
          <AddPackageForm
            ref="myForm"
            onSubmit={this.onAddPkgSubmit}
            courseInstances={this.props.courseInstances}
            allPkgs={this.props.allPkgs}
            defaultData={this.data}
            getObjects={this.getObjects}
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
  courseInstances: selectors.getUserCourseInstances(state),
  allPkgs: selectors.getPkgs(state),
})

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hide(addPackageModalAction)),
  addPkg: (data) => {
    dispatch(addPkg(data.name, data.courseInstance,
        data.access))
  },
})

AddPackageModal.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Radium(AddPackageModal))
