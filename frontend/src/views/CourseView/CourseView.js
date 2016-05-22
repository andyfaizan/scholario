import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './CourseView.scss'
import DashboardToolBar from '../../containers/DashboardToolBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import _ from 'lodash'
import Questions from '../../containers/Questions'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import MaterialComponent from '../../components/MaterialComponent/MaterialComponent'
import IndependentPackage from '../../components/IndependentPackage/IndependentPackage'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import { getQuestions, voteQuestion } from '../../redux/modules/question'
import { getUser } from '../../redux/modules/user'
import * as selectors from '../../redux/selectors'
import AddCircle from 'material-ui/lib/svg-icons/content/add'
import FloatingActionButton from 'material-ui/lib/floating-action-button'

type Props = {
  courseName: string,
  courseId: string

};

export class Course extends React.Component {

  static propTypes = {
    courseName: PropTypes.string,
    courseId: PropTypes.string,
  };

  componentDidMount() {
    const cid = this.props.params.id
    this.props.dispatch(setCurCourseInstance(cid))
    this.props.dispatch(getCourseInstance(cid))
    this.props.dispatch(getQuestions(cid))
    if (!this.props.userMetadata.fetchedData) {
      this.props.dispatch(getUser())
    }
  }

  render () {
    const { courseInstance, profPkgs, studentPkgs } = this.props
    var profPkgEls = []
    var studentPkgEls
    if (profPkgs) {
      profPkgEls = profPkgs.map(pkg =>
        <MaterialComponent
          key={pkg._id} materialTitle={pkg.name} materialNotifications={10}
          dateUploaded="20/06/2009"
          semesterInstance={`${pkg.semesterTerm} ${pkg.semesterYear}`}
          keywords={["Blue ","Green ", "Red "]}
          pkgUrl={`/package/${pkg._id}`}
        />
      )
    }
    if (studentPkgs) {
      studentPkgEls = studentPkgs.map(pkg =>
        <MaterialComponent
          key={pkg._id} materialTitle={pkg.name} materialNotifications={10}
          dateUploaded="20/06/2009"
          semesterInstance={`${pkg.semesterTerm} ${pkg.semesterYear}`}
          keywords={["Blue ","Green ", "Red "]}
          pkgUrl={`/package/${pkg._id}`}
        />
      )
    }


    return (
      <div className={classes.rootCourse}>
        <DashboardToolBar />
        <CourseInfoBar
          courseTitle={courseInstance.course ? courseInstance.course.name : ''}
          courseUrl={`/course/${courseInstance._id}`}
          semesterInstance={courseInstance.semester ? `${courseInstance.semester.term} ${courseInstance.semester.year}` : ''}
          teachersName={courseInstance.prof ? `${courseInstance.prof.firstname} ${courseInstance.prof.lastname}` : ''}
          shortInformation={courseInstance.description}
          participantsNum={courseInstance.participantsNum}
          userRole={this.props.user ? this.props.user.role : ''}
        />
        <br/>
        <Grid className='container-fluid'>
          <Row >
            <Col xs={16} md={8}>
              <div>
                <fieldset>
                  <legend><h4>
                    Materialien Von: {courseInstance.prof ? courseInstance.prof.firstname : ''} {courseInstance.prof ? courseInstance.prof.lastname : ''}
                  </h4></legend>
                {profPkgEls}
                </fieldset>
                <br/>
                <br/>
                <fieldset>
                  <legend><h4>
                    Studentenmaterialien für: {courseInstance.course ? courseInstance.course.name : ''}
                  </h4></legend>
                {studentPkgEls}
                </fieldset>
              </div>
            </Col>
            <Col xs={8} md={4}>
              <Questions
                recentQuestions={this.props.recentQuestions}
                popularQuestions={this.props.popularQuestions}
                location={this.props.location}
                linkToQuestionsList={`/course/${courseInstance._id}/questions`}
                onClickVote={(qid) => this.props.dispatch(voteQuestion(qid))}
              />
            </Col>
          </Row>
        </Grid>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  var courseInstance = selectors.getCurCourseInstance(state)
  var profPkgs = []
  var studentPkgs = []
  if (!_.isEmpty(courseInstance) && courseInstance.pkgs) {
    profPkgs = courseInstance.pkgs.filter(p => {
      if (state.entities && state.entities.users && state.entities.users[p.owner])
        return (state.entities.users[p.owner].role === 'Prof')
      return false
    })
    studentPkgs = courseInstance.pkgs.filter(p => {
      if (state.entities && state.entities.users && state.entities.users[p.owner])
        return (state.entities.users[p.owner].role === 'Student')
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
  }
}

export default connect(
  mapStateToProps,
)(Course)
