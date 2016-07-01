import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import DashboardToolBar from '../../containers/DashboardToolBar'
import PreviewMaterial from '../../containers/PreviewMaterial'
import {
  getCourseInstance, setCurCourseInstance,
  GET_COURSE_INSTANCE_REQUEST } from '../../redux/modules/course-instance'
import { getPkg, setCurPkg } from '../../redux/modules/pkg'
import { getMaterial, setCurMaterial } from '../../redux/modules/materials'
import { getQuestions } from '../../redux/modules/question'
import { getUser } from '../../redux/modules/user'
import classes from './MaterialView.scss'
import * as selectors from '../../redux/selectors'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import Feedback from '../../containers/Feedback'

const propTypes = {
  params: PropTypes.object,
  location: PropTypes.object,
  userMetadata: PropTypes.object,
  courseInstance: PropTypes.object,
  pkg: PropTypes.object,
  material: PropTypes.object,
  recentQuestions: PropTypes.array,
  popularQuestions: PropTypes.array,
  requests: PropTypes.array,
  curPkgId: PropTypes.string,
  setCurMaterial: PropTypes.func,
  setCurPkg: PropTypes.func,
  setCurCourseInstance: PropTypes.func,
  getMaterial: PropTypes.func,
  getQuestions: PropTypes.func,
  getUser: PropTypes.func,
  getCourseInstance: PropTypes.func,
}

export class MaterialView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      didSetCurPkg: false,
      didGetPkg: false,
      didGetCourseInstance: false,
    }
  }

  componentDidMount() {
    const mid = this.props.params.id
    this.props.setCurMaterial(mid)
    this.props.getMaterial(mid)
    this.props.getQuestions('', '', mid)
    if (!this.props.userMetadata.fetchedData) {
      this.props.getUser()
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.curPkgId && !this.state.didSetCurPkg && newProps && newProps.pkg) {
      this.setState({ didSetCurPkg: true })
      this.props.setCurPkg(newProps.pkg._id)
    }
    if (_.isEmpty(this.props.courseInstance) &&
        !this.state.didGetCourseInstance &&
        typeof this.props.requests[GET_COURSE_INSTANCE_REQUEST] === 'undefined' &&
        newProps && newProps.pkg && newProps.pkg.courseInstance) {
      this.setState({
        didGetCourseInstance: true,
      })
      this.props.setCurCourseInstance(newProps.pkg.courseInstance)
      this.props.getCourseInstance(newProps.pkg.courseInstance)
    }
  }

  render() {
    const questionOkayType = 'ADD_QUESTION_OK'
    const questionErrorType = 'ADD_QUESTION_ERR'

    return (
      <div>
        <div className={classes.dashboardRoot}>
          <DashboardToolBar />
          <PreviewMaterial
            location={this.props.location}
            courseInstance={this.props.courseInstance}
            pkg={this.props.pkg}
            material={this.props.material}
            recentQuestions={this.props.recentQuestions}
            popularQuestions={this.props.popularQuestions}
          />
          <br />
          <Feedback errorType={questionErrorType} okayType={questionOkayType} message="Frage Erstellt!" />
        </div>
        <div className={classes.footer}>
          <FooterLanding />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let material = selectors.getCurMaterial(state)
  let pkg = {}
  if (material) {
    pkg = selectors.getPkgFactory(material.pkg)(state)
  } else {
    material = {}
  }

  return {
    userMetadata: selectors.getUserMetadata(state),
    courseInstance: selectors.getCurCourseInstance(state),
    pkg,
    material,
    requests: selectors.getRequests(state),
    recentQuestions: selectors.getCurQuestionsFactory('material', 'date')(state),
    popularQuestions: selectors.getCurQuestionsFactory('material', 'vote')(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMaterial: (mid) => dispatch(getMaterial(mid)),
  setCurMaterial: (mid) => dispatch(setCurMaterial(mid)),
  getQuestions: (mid) => dispatch(getQuestions('', '', mid)),
  setCurPkg: (pid) => dispatch(setCurPkg(pid)),
  getPkg: (pid) => dispatch(getPkg(pid)),
  setCurCourseInstance: (cid) => dispatch(setCurCourseInstance(cid)),
  getCourseInstance: (cid) => dispatch(getCourseInstance(cid)),
  getUser: () => dispatch(getUser()),
})

MaterialView.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaterialView)