import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import _ from 'lodash'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import Questions from '../../containers/Questions'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import Bookmarks from '../../components/Bookmarks/Bookmarks'
import MaterialComponent from '../../components/MaterialComponent/MaterialComponent'
import AddMaterialComp from '../../components/AddMaterialComp/AddMaterialComp'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import { setCurPkg, getPkg } from '../../redux/modules/pkg'
import { getQuestions } from '../../redux/modules/question'
import { getUser } from '../../redux/modules/user'
import * as selectors from '../../redux/selectors'
import Feedback from '../../containers/Feedback'
import {
  show, ADD_MATERIAL_MODAL as addMaterialModalAction,
  ADD_BOOKMARK_MODAL as addBookmarkModalAction,
  UPLOAD_ASSIGNMENT_MODAL as uploadAssignmentModalAction } from '../../redux/modules/modal'
import { deleteBookmark } from '../../redux/modules/bookmark'
import { deleteMaterial } from '../../redux/modules/materials'


const propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  userMetadata: PropTypes.object,
  user: PropTypes.object,
  courseInstance: PropTypes.object,
  pkg: PropTypes.object,
  recentQuestions: PropTypes.array,
  popularQuestions: PropTypes.array,
  modal: PropTypes.object,
  packageName: PropTypes.string,
  courseId: PropTypes.string,
  dispatch: PropTypes.func,
}

export class Package extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      didGetCourseInstance: false,
    }
  }

  componentDidMount() {
    const pid = this.props.params.id
    this.props.dispatch(setCurPkg(pid))
    this.props.dispatch(getPkg(pid))
    this.props.dispatch(getQuestions('', pid))
    if (!this.props.userMetadata.fetchedData) {
      this.props.dispatch(getUser())
    }
  }

  componentWillReceiveProps(newProps) {
    if (_.isEmpty(this.props.courseInstance) &&
        !this.state.didGetCourseInstance &&
        newProps && newProps.pkg && newProps.pkg.courseInstance) {
      this.setState({
        didGetCourseInstance: true,
      })
      this.props.dispatch(setCurCourseInstance(newProps.pkg.courseInstance))
      this.props.dispatch(getCourseInstance(newProps.pkg.courseInstance))
    }
  }

  shouldComponentUpdate(nextProps) {
    return !(_.isEqual(this.props.location, nextProps.location)
        && _.isEqual(this.props.params, nextProps.params)
        && _.isEqual(this.props.user, nextProps.user)
        && _.isEqual(this.props.userMetadata, nextProps.userMetadata)
        && _.isEqual(this.props.courseInstance, nextProps.courseInstance)
        && _.isEqual(this.props.pkg, nextProps.pkg)
        && _.isEqual(this.props.recentQuestions, nextProps.recentQuestions)
        && _.isEqual(this.props.popularQuestions, nextProps.popularQuestions)
        && _.isEqual(this.props.modal, nextProps.modal)
        && this.props.packageName === nextProps.packageName
        && this.props.courseId === nextProps.courseId
      )
  }

  render() {
    const styles = getStyles()

    const { user, pkg, courseInstance } = this.props
    const errorType = 'POST_MATERIAL_ERR'
    const okayType = 'POST_MATERIAL_OK'
    const questionOkayType = 'ADD_QUESTION_OK'
    const questionErrorType = 'ADD_QUESTION_ERR'

    let materialsNew = []
    let addMaterial

    if (user && pkg && pkg.owner && pkg.owner._id === user._id) {
      addMaterial = (
        <AddMaterialComp modal={this.props.modal} show={() => this.props.dispatch(show(addMaterialModalAction))} />
      )
    }

    if (pkg.materials) {
      materialsNew = pkg.materials.map(material =>
        <MaterialComponent
          key={material._id} materialTitle={material.name} materialNotifications={10}
          materialOwner={pkg.owner}
          user={user}
          downloadUrl={material.url}
          dateUploaded={material.createDate}
          keywords={['Blue ', 'Green ', 'Red ']}
          materialUrl={`/material/${material._id}`}
          ext={material.ext}
          onClickDeleteMaterial={() => this.props.dispatch(deleteMaterial(material._id, material.pkg))}
        />
      )
    }


    return (
      <div>
        <div style={styles.dashboardRoot}>
          <CourseInfoBar
            courseTitle={courseInstance.course ? courseInstance.course.name : ''}
            courseUrl={`/course/${courseInstance._id}`}
            semesterInstance={
              courseInstance.semester ? `${courseInstance.semester.term} ${courseInstance.semester.year}` : ''
            }
            teachersName={courseInstance.prof ? `${courseInstance.prof.firstname} ${courseInstance.prof.lastname}` : ''}
            shortInformation={courseInstance.description}
            participantsNum={courseInstance.participantsNum}
            pkgName={this.props.pkg.name}
            modal={this.props.modal}
            show={() => this.props.dispatch(show(uploadAssignmentModalAction))}
          />
          <br />
          <Grid className="container-fluid">
            <Row >
              <Col xs={16} md={8}>
                <div>
                 {addMaterial}
                 {materialsNew}
                </div>
              </Col>
              <Col xs={8} md={4}>
                <Questions
                  recentQuestions={this.props.recentQuestions}
                  popularQuestions={this.props.popularQuestions}
                  location={this.props.location}
                  linkToQuestionsList={`/course/${courseInstance._id}/questions`}
                />
                <br />
                <br />
                <Bookmarks
                  bookmarks={this.props.pkg.bookmarks}
                  modal={this.props.modal}
                  show={() => this.props.dispatch(show(addBookmarkModalAction))}
                  onClickDeleteBookmark={(bid, pid) => this.props.dispatch(deleteBookmark(bid, pid))}
                />
              </Col>
            </Row>
          </Grid>
          <br />
        </div>
        <Feedback errorType={errorType} okayType={okayType} />
        <Feedback errorType={questionErrorType} okayType={questionOkayType} message="Frage Erstellt!" />
      </div>
    )
  }
}

function getStyles() {
  return {
    dashboardRoot: {
      backgroundColor: '#FBF6EC',
      minHeight: '100vh',
    },
  }
}

const mapStateToProps = (state) => ({
  user: selectors.getUser(state),
  userMetadata: selectors.getUserMetadata(state),
  pkg: selectors.getCurPkg(state),
  recentQuestions: selectors.getCurQuestionsFactory('pkg', 'date')(state),
  popularQuestions: selectors.getCurQuestionsFactory('pkg', 'vote')(state),
  courseInstance: selectors.getCurCourseInstance(state),
  modal: state.modal,
})

Package.propTypes = propTypes

export default connect(
  mapStateToProps
)(Radium(Package))
