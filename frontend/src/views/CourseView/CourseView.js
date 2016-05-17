import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './CourseView.scss'
import DashboardToolBar from '../../containers/DashboardToolBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Questions from '../../containers/Questions'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import MaterialComponent from '../../components/MaterialComponent/MaterialComponent'
import IndependentPackage from '../../components/IndependentPackage/IndependentPackage'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import * as selectors from '../../redux/selectors'


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
  }

  render () {
    const { courseInstance } = this.props
    var pkgs = []
    if (courseInstance.pkgs) {
      pkgs = courseInstance.pkgs.map(pkg =>
        <IndependentPackage
          key={pkg._id} materialTitle={pkg.name} materialNotifications={10}
          dateUploaded="20/06/2009"
          semesterInstance={`${pkg.semesterTerm} ${pkg.semesterYear}`}
          keywords={["Blue ","Green ", "Red "]}
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
        />
        <br/>
        <Grid className='container-fluid'>
          <Row >
            <Col xs={20} md={8}>
              <div>
                {pkgs}
              </div>
            </Col>
            <Col xs={4} md={4}>
              <Questions questions={this.props.questions} location={this.props.location}/>
            </Col>
          </Row>
        </Grid>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    courseInstance: selectors.getCurCourseInstance(state),
    questions: selectors.getUserQuestions(state),
  }
}


export default connect(
  mapStateToProps
)(Course)
