import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import _ from 'lodash'
import { addQuestion } from '../redux/modules/question'
import { hide, ADD_QUESTION_MODAL as addQuestionModalAction } from '../redux/modules/modal'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import AddQuestionForm from '../forms/AddQuestionForm/AddQuestionForm'
import * as selectors from '../redux/selectors'


const propTypes = {
  modal: PropTypes.object.isRequired,
  location: PropTypes.object,
  courseInstances: PropTypes.array,
  allPkgs: PropTypes.object,
  hide: PropTypes.func.isRequired,
  addQuestion: PropTypes.func,
}


export class AddQuestionModal extends React.Component {
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

  onAddQuestionSubmit = (data) => {
    this.props.addQuestion(data)
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

  getPkgFromMaterial = (pkgArray, id) => {
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
      pkg: '',
      material: '',
    }
    if (this.props.courseInstances && this.props.courseInstances.length > 0) {
      if (this.props.location) {
        const pathArray = this.props.location.pathname.split('/')
        const currentLevel = pathArray[1]
        const id = pathArray[2]
        if (typeof id !== 'string') return defaultData

        let currCourseInstance
        let pkgArray
        let currPkg

        switch (currentLevel) {
        case 'course':
          defaultData.courseInstance = id
          break

        case 'package':
          defaultData.pkg = id
          currCourseInstance = this.getCourseFromPkg(id)
          defaultData.courseInstance = currCourseInstance._id
          break

        case 'material':
          defaultData.material = id
          pkgArray = this.getObjects(this.props.allPkgs)
          currPkg = this.getPkgFromMaterial(pkgArray, id)
          defaultData.pkg = currPkg._id
          currCourseInstance = this.getCourseFromPkg(currPkg._id)
          defaultData.courseInstance = currCourseInstance._id
          break
        default:
          break
        }
      }
    }
    return defaultData
  }

  render() {
    const styles = getStyles()
    const title = 'Eine Frage stellen'

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
        labelStyle={styles.labelStyle}
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
          <AddQuestionForm
            ref="myForm"
            onSubmit={this.onAddQuestionSubmit}
            courseInstances={this.props.courseInstances}
            allPkgs={this.props.allPkgs}
            initialValues={this.data}
            getObjects={this.getObjects}
          />
        </Dialog>
      </div>
    )
  }
}

function getStyles() {
  return {
    labelStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
  courseInstances: selectors.getUserCourseInstances(state),
  allPkgs: selectors.getPkgs(state),
})

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hide(addQuestionModalAction)),
  addQuestion: (data) => {
    dispatch(addQuestion(data.title, data.description,
        data.courseInstance, data.pkg, data.material))
  },
})

AddQuestionModal.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Radium(AddQuestionModal))
