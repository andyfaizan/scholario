import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classes from './PackageView.scss'
import DashboardToolBar from '../../containers/DashboardToolBar'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Questions from '../../containers/Questions'
import CourseInfoBar from '../../components/CourseInfoBar/CourseInfoBar'
import MaterialComponent from '../../components/MaterialComponent/MaterialComponent'
import IndependentPackage from '../../components/IndependentPackage/IndependentPackage'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import { setCurPkg, getPkg } from '../../redux/modules/pkg'
import * as selectors from '../../redux/selectors'


type Props = {
  packageName: PropTypes.string,
  courseId: PropTypes.string,
};

export class Package extends React.Component {
  props: Props

  componentDidMount() {
    const pid = this.props.params.id
    this.props.dispatch(setCurPkg(pid))
    this.props.dispatch(getPkg(pid))
  }

  componentWillReceiveProps(newProps) {
    if (_.isEmpty(this.props.courseInstance) && newProps && newProps.pkg && newProps.pkg.courseInstance) {
      this.props.dispatch(setCurCourseInstance(newProps.pkg.courseInstance))
      this.props.dispatch(getCourseInstance(newProps.pkg.courseInstance))
    }
  }

  render () {
    const { pkg, courseInstance } = this.props
    var materials = []
    if (pkg.materials) {
      materials = pkg.materials.map(material =>
        <IndependentPackage
          key={material._id} materialTitle={material.name} materialNotifications={10}
          dateUploaded="20/06/2009"
          keywords={["Blue ","Green ", "Red "]}
          pkgUrl={`/material/${material._id}`}
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
            <Col xs={16} md={8}>
              <div>
                {materials}
              </div>
            </Col>
            <Col xs={8} md={4}>
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
    pkg: selectors.getCurPkg(state),
    questions: selectors.getUserQuestions(state),
    courseInstance: selectors.getCurCourseInstance(state),
  }
}


export default connect(
  mapStateToProps
)(Package)
