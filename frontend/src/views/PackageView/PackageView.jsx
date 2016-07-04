import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import _ from 'lodash'
import DashboardToolBar from '../../containers/DashboardToolBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Questions from '../../containers/Questions'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import Bookmarks from '../../components/Bookmarks/Bookmarks'
import PkgComp from '../../components/Pkg/Pkg'
import AddMaterialComp from '../../components/AddMaterialComp/AddMaterialComp'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import { setCurPkg, getPkg } from '../../redux/modules/pkg'
import { getQuestions } from '../../redux/modules/question'
import { getUser } from '../../redux/modules/user'
import * as selectors from '../../redux/selectors'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import Feedback from '../../containers/Feedback'
import {
  show, ADD_MATERIAL_MODAL as addMaterialModalAction,
  ADD_BOOKMARK_MODAL as addBookmarkModalAction } from '../../redux/modules/modal'
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
        <PkgComp
          key={material._id} materialTitle={material.name} materialNotifications={10}
          pkgOwner={pkg.owner}
          user={user}
          materialUrl={material.url}
          dateUploaded={material.createDate}
          keywords={['Blue ', 'Green ', 'Red ']}
          pkgUrl={`/material/${material._id}`}
          ext={material.ext}
          onClickDeleteMaterial={() => this.props.dispatch(deleteMaterial(material._id, material.pkg))}
        />
      )
    }


    return (
      <div>
        <div style={styles.dashboardRoot}>
          <DashboardToolBar />
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
        <div style={styles.footer}>
          <FooterLanding />
        </div>
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
    footer: {
      fontSize: '20px',
      backgroundColor: 'white',
      color: 'darkslategray',
      height: '10%',
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
