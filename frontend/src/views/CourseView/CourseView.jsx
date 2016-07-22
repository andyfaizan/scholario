import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import _ from 'lodash'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import PkgComponent from '../../components/PkgComponent/PkgComponent'
import AddPkgComponent from '../../components/AddPkgComponent/AddPkgComponent'

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

export class Course extends React.Component {
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
                  <fieldset>
                    <legend>
                      <h4>
                        Materialien Von: {courseInstance.prof ? courseInstance.prof.firstname : ''}
                          {courseInstance.prof ? courseInstance.prof.lastname : ''}
                      </h4>
                    </legend>
                    <br />
                  {addPkgCompProf}
                  {profPkgEls}
                  </fieldset>
                  <br />
                  <br />
                  <br />
                  <fieldset>
                    <legend><h4>
                      Studentenmaterialien für: {courseInstance.course ? courseInstance.course.name : ''}
                    </h4></legend>
                    <br />
                   {addPkgStd}
                  {studentPkgEls}
                  </fieldset>
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

const mapStateToProps = (state) => {
  const courseInstance = selectors.getCurCourseInstance(state)
  let profPkgs = []
  let studentPkgs = []
  if (!_.isEmpty(courseInstance) && courseInstance.pkgs) {
    profPkgs = courseInstance.pkgs.filter(p => {
      if (state.entities && state.entities.users && state.entities.users[p.owner]) {
        return (state.entities.users[p.owner].role === 'Prof')
      }
      return false
    })
    studentPkgs = courseInstance.pkgs.filter(p => {
      if (state.entities && state.entities.users && state.entities.users[p.owner]) {
        return (state.entities.users[p.owner].role === 'Student')
      }
      return false
    })
  }

  return {
    user: selectors.getUser(state),
    userMetadata: selectors.getUserMetadata(state),
    courseInstance,
    profPkgs,
    studentPkgs,
    recentQuestions: selectors.getCurQuestionsFactory('courseInstance', 'date')(state),
    popularQuestions: selectors.getCurQuestionsFactory('courseInstance', 'vote')(state),
    modal: state.modal,
  }
}

Course.propTypes = propTypes

export default connect(
  mapStateToProps
)(Radium(Course))
