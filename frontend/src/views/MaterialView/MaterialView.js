import React from 'react'
import { connect } from 'react-redux'
import DashboardToolBar from '../../containers/DashboardToolBar'
import PreviewMaterial from '../../containers/PreviewMaterial'
import { getCourseInstance, setCurCourseInstance, GET_COURSE_INSTANCE_REQUEST } from '../../redux/modules/course-instance'
import { getPkg, setCurPkg, GET_PKG_REQUEST } from '../../redux/modules/pkg'
import { getMaterial, setCurMaterial } from '../../redux/modules/materials'
import { getQuestions } from '../../redux/modules/question'
import { getUser } from '../../redux/modules/user'
import classes from './MaterialView.scss'
import * as selectors from '../../redux/selectors'

type Props = {

};

export class MaterialView extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      didSetCurPkg: false,
      didGetPkg: false,
      didGetCourseInstance: false,
    }
  }

  componentDidMount () {
    const mid = this.props.params.id
    this.props.setCurMaterial(mid)
    this.props.getMaterial(mid)
    this.props.getQuestions('', '', mid)
    if (!this.props.userMetadata.fetchedData) {
      this.props.getUser()
    }
  }

  componentWillReceiveProps(newProps) {
   /* if (_.isEmpty(this.props.pkg) &&*/
        //typeof this.props.requests[GET_PKG_REQUEST] === 'undefined' &&
        //newProps && newProps.material && newProps.material.pkg) {
      //console.log('getting package', typeof this.props.requests)

      ////this.props.setCurPkg(newProps.material.pkg)
      ////this.props.getPkg(newProps.material.pkg, true)
   /* }*/
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

  render () {
    return (
      <div className={classes.dashboardRoot}>
        <DashboardToolBar />
        <PreviewMaterial
          location={this.props.location}
          courseInstance={this.props.courseInstance}
          pkg={this.props.pkg}
          material={this.props.material}
          questions={this.props.questions}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  var material = selectors.getCurMaterial(state)
  var pkg = {}
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
    questions: selectors.getCurMaterialQuestions(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMaterial: (mid) => dispatch(getMaterial(mid)),
    setCurMaterial: (mid) => dispatch(setCurMaterial(mid)),
    getQuestions: (mid) => dispatch(getQuestions('', '', mid)),
    setCurPkg: (pid) => dispatch(setCurPkg(pid)),
    getPkg: (pid) => dispatch(getPkg(pid)),
    setCurCourseInstance: (cid) => dispatch(setCurCourseInstance(cid)),
    getCourseInstance: (cid) => dispatch(getCourseInstance(cid)),
    getUser: () => dispatch(getUser()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaterialView)
