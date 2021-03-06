import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import _ from 'lodash'

import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import PkgComponent from '../../components/PkgComponent/PkgComponent'
import AddPkgComponent from '../../components/AddPkgComponent/AddPkgComponent'
import ChapterTabs from '../../components/ChapterTabs/ChapterTabs'

import Questions from '../../containers/Questions'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import { getQuestions, voteQuestion } from '../../redux/modules/question'
import { getUser } from '../../redux/modules/user'
import { deletePkg } from '../../redux/modules/pkg'
import { show, ADD_PACKAGE_MODAL as addPackageModalAction } from '../../redux/modules/modal'
import * as selectors from '../../redux/selectors'
import Feedback from '../../containers/Feedback'


const propTypes = {
  courseName: PropTypes.string,
  courseId: PropTypes.string,
  dispatch: PropTypes.func,
  params: PropTypes.object,
  userMetadata: PropTypes.object,
  courseInstance: PropTypes.object,
  profPkgs: PropTypes.array,
  studentPkgs: PropTypes.array,
  user: PropTypes.object,
  modal: PropTypes.object,
  recentQuestions: PropTypes.array,
  popularQuestions: PropTypes.array,
  location: PropTypes.object,
}

export class NewCourse extends React.Component {
  constructor(props) {
    super(props)
    this.getDateFromZulu = this.getDateFromZulu.bind(this)
  }

  componentDidMount() {
    const cid = this.props.params.id
    this.props.dispatch(setCurCourseInstance(cid))
    this.props.dispatch(getCourseInstance(cid))
    this.props.dispatch(getQuestions(cid))
    if (!this.props.userMetadata.fetchedData) {
      this.props.dispatch(getUser())
    }
  }

  shouldComponentUpdate(nextProps) {
    return !(this.props.courseId === nextProps.courseId
        && _.isEqual(this.props.params, nextProps.params)
        && _.isEqual(this.props.userMetadata, nextProps.userMetadata)
        && _.isEqual(this.props.courseInstance, nextProps.courseInstance)
        && _.isEqual(this.props.profPkgs, nextProps.profPkgs)
        && _.isEqual(this.props.studentPkgs, nextProps.studentPkgs)
        && _.isEqual(this.props.user, nextProps.user)
        && _.isEqual(this.props.modal, nextProps.modal)
        && _.isEqual(this.props.recentQuestions, nextProps.recentQuestions)
        && _.isEqual(this.props.popularQuestions, nextProps.popularQuestions)
        && _.isEqual(this.props.location, nextProps.location)
      )
  }

  getDateFromZulu(dateString) {
    const dateParts = dateString.slice(0, 10).split('-')
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }

  render() {
    const styles = getStyles()

    const { courseInstance, profPkgs, studentPkgs, user } = this.props
    let profPkgEls = []
    let studentPkgEls
    let addPkgCompProf
    let addPkgStd

    if (profPkgs) {
      profPkgEls = profPkgs.map(pkg =>
        <PkgComponent
          key={pkg._id} pkgTitle={pkg.name} pkgNotifications={10}
          dateUploaded={pkg ? this.getDateFromZulu(pkg.createDate) : ''}
          semesterInstance={`${pkg.semesterTerm} ${pkg.semesterYear}`}
          keywords={['Blue ', 'Green ', 'Red ']}
          pkgUrl={`/package/${pkg._id}`}
          user={user}
          owner={pkg.owner}
          onClickDeletePkg={() => this.props.dispatch(deletePkg(pkg._id, courseInstance._id))}
        />
      )
    }

    if (studentPkgs) {
      studentPkgEls = studentPkgs.map(pkg =>
        <PkgComponent
          key={pkg._id} pkgTitle={pkg.name} pkgNotifications={10}
          dateUploaded={this.getDateFromZulu(pkg.createDate)}
          semesterInstance={`${pkg.semesterTerm} ${pkg.semesterYear}`}
          keywords={['Blue ', 'Green ', 'Red ']}
          pkgUrl={`/package/${pkg._id}`}
          user={user}
          owner={pkg.owner}
          onClickDeletePkg={() => this.props.dispatch(deletePkg(pkg._id, courseInstance._id))}
        />
      )
    }

    if (this.props.user.role === 'Student') {
      addPkgStd = (
        <AddPkgComponent
          modal={this.props.modal}
          show={() => this.props.dispatch(show(addPackageModalAction))}
        />
      )
    } else if (this.props.user.role === 'Prof') {
      addPkgCompProf = (
        <AddPkgComponent
          modal={this.props.modal}
          show={() => this.props.dispatch(show(addPackageModalAction))}
        />
      )
    }

    return (
      <div>
        <div style={styles.rootCourse}>
          <CourseInfoBar
            courseTitle={courseInstance.course ? courseInstance.course.name : ''}
            courseUrl={`/course/${courseInstance._id}`}
            semesterInstance={
              courseInstance.semester ? `${courseInstance.semester.term} ${courseInstance.semester.year}` : ''
            }
            teachersName={courseInstance.prof ? `${courseInstance.prof.firstname} ${courseInstance.prof.lastname}` : ''}
            shortInformation={courseInstance.description}
            participantsNum={courseInstance.participantsNum}
            userRole={this.props.user ? this.props.user.role : ''}
          />
          <br />
          <Grid className="container-fluid">
            <Row >
              <Col xs={16} md={8}>
                <div>
                  <ChapterTabs />
                  <ChapterTabs />
                </div>
                <br />
              </Col>
              <Col xs={8} md={4}>
                <Questions
                  recentQuestions={this.props.recentQuestions}
                  popularQuestions={this.props.popularQuestions}
                  location={this.props.location}
                  linkToQuestionsList={`/course/${courseInstance._id}/questions`}
                  onClickVote={(qid) => this.props.dispatch(voteQuestion(qid))}
                />
                <br />
              </Col>
            </Row>
          </Grid>
          <br />
          <br />
        </div>
        <Feedback errorType="ADD_PKG_ERR" okayType="ADD_PKG_OK" message="Ordner Erstellt!" />
      </div>
    )
  }
}

function getStyles() {
  return {
    rootCourse: {
      backgroundColor: '#FBF6EC',
      minHeight: '100vh',
    },
    legend: {
      textAlign: 'center',
      color: '#26A65B',
      fontWeight: 'bolder',
    },
    fieldset: {
      borderColor: '#26A65B',
    },
  }
}

NewCourse.propTypes = propTypes

const mapStateToProps = (state) => ({
  user: selectors.getUser(state),
  userMetadata: selectors.getUserMetadata(state),
  courseInstance: selectors.getCurCourseInstance(state),
  profPkgs: selectors.getCurCIProfPkgs(state),
  studentPkgs: selectors.getCurCIStudentPkgs(state),
  recentQuestions: selectors.getCurQuestionsFactory('courseInstance', 'date')(state),
  popularQuestions: selectors.getCurQuestionsFactory('courseInstance', 'vote')(state),
  modal: state.modal,
})

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(NewCourse))
