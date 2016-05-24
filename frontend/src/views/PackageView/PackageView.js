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
import AddMaterialComp from '../../components/AddMaterialComp/AddMaterialComp'
import IndependentPackage from '../../components/IndependentPackage/IndependentPackage'
import { getCourseInstance, setCurCourseInstance } from '../../redux/modules/course-instance'
import { setCurPkg, getPkg } from '../../redux/modules/pkg'
import { getQuestions } from '../../redux/modules/question'
import { getUser } from '../../redux/modules/user'
import * as selectors from '../../redux/selectors'
import FooterLanding from '../../components/FooterLanding/FooterLanding'


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
    this.props.dispatch(getQuestions('', pid))
    if (!this.props.userMetadata.fetchedData) {
      this.props.dispatch(getUser())
    }
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
    var addMaterial;

    if (pkg.materials) {

      addMaterial = <AddMaterialComp />

      materials = pkg.materials.map(material =>
        <IndependentPackage
          key={material._id} materialTitle={material.name} materialNotifications={10}
          dateUploaded={material.createDate.slice(0,10)}
          keywords={["Blue ","Green ", "Red "]}
          pkgUrl={`/material/${material._id}`}
        />
      )
    }

    return (
    <div>
      <div className={classes.dashboardRoot}>
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
               {addMaterial}
               {materials}
              </div>
            </Col>
            <Col xs={8} md={4}>
              <Questions
                recentQuestions={this.props.recentQuestions}
                popularQuestions={this.props.popularQuestions}
                location={this.props.location}
                linkToQuestionsList={`/course/${courseInstance._id}/questions`}
              />
            </Col>
          </Row>
        </Grid>
        <br/>
      </div>
      <br/>
       <div className={classes.footer}>
        <FooterLanding />
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userMetadata: selectors.getUserMetadata(state),
    pkg: selectors.getCurPkg(state),
    recentQuestions: selectors.getCurQuestionsFactory('pkg', 'date')(state),
    popularQuestions: selectors.getCurQuestionsFactory('pkg', 'vote')(state),
    courseInstance: selectors.getCurCourseInstance(state),
  }
}


export default connect(
  mapStateToProps
)(Package)
