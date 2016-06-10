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
import AddPkgComponent from '../../components/AddPkgComponent/AddPkgComponent'
import IndependentPackage from '../../components/IndependentPackage/IndependentPackage'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import { getQuestions, voteQuestion } from '../../redux/modules/question'
import { getUser } from '../../redux/modules/user'
import { show, ADD_PACKAGE_MODAL as add_package } from '../../redux/modules/modal'
import * as selectors from '../../redux/selectors'
import AddCircle from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import Feedback from '../../containers/Feedback'


type Props = {
  courseName: string,
  courseId: string

};

export class Course extends React.Component {

  static propTypes = {
    courseName: PropTypes.string,
    courseId: PropTypes.string,
  };

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
    var dateParts = dateString.split('-')
    return dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0]
  }

  render () {
    const { courseInstance, profPkgs, studentPkgs } = this.props
    const voteErrorType = 'VOTE_QUESTION_ERR'
    const voteOkayType = 'VOTE_QUESTION_OK'
    var profPkgEls = []
    var studentPkgEls
    var addPkgComp
    var addPkgCompProf
    var addPkgStd

    if (profPkgs) {

      profPkgEls = profPkgs.map(pkg =>
        <MaterialComponent
          key={pkg._id} materialTitle={pkg.name} materialNotifications={10}
          dateUploaded={pkg ? this.getDateFromZulu(pkg.createDate.slice(0,10)) : ''}
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
          dateUploaded={this.getDateFromZulu(pkg.createDate.slice(0,10))}
          semesterInstance={`${pkg.semesterTerm} ${pkg.semesterYear}`}
          keywords={["Blue ","Green ", "Red "]}
          pkgUrl={`/package/${pkg._id}`}
        />
      )
    }

    if(this.props.user.role == 'Student') {
      addPkgStd = <AddPkgComponent modal={this.props.modal}
        show={() => this.props.dispatch(show(add_package))}/>
    } else if (this.props.user.role == 'Prof' ) {
      addPkgCompProf = <AddPkgComponent modal={this.props.modal}
        show={() => this.props.dispatch(show(add_package))}/>
    } else {
      console.log('eroneous user role')
    }

    return (
    <div>
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
                  <br/>
                {addPkgCompProf}
                {profPkgEls}
                </fieldset>
                <br/>
                <br/>
                <br/>
                <fieldset>
                  <legend><h4>
                    Studentenmaterialien für: {courseInstance.course ? courseInstance.course.name : ''}
                  </h4></legend>
                  <br/>
                 {addPkgStd}
                {studentPkgEls}
                </fieldset>
              </div>
              <br/>
            </Col>
            <Col xs={8} md={4}>
              <Questions
                recentQuestions={this.props.recentQuestions}
                popularQuestions={this.props.popularQuestions}
                location={this.props.location}
                linkToQuestionsList={`/course/${courseInstance._id}/questions`}
                onClickVote={(qid) => this.props.dispatch(voteQuestion(qid))}
              />

              <br/>
            </Col>
          </Row>
        </Grid>
        <br/>
      <br/>
      </div>
      <Feedback errorType='ADD_PKG_ERR' okayType='ADD_PKG_OK' message="Ordner Erstellt!"/>
      <div className={classes.footer}>
        <FooterLanding />
      </div>
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
    modal: state.modal,
  }
}

export default connect(
  mapStateToProps)
(Course)
