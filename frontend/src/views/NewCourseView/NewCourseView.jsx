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

function NewCourse() {
  const styles = getStyles()

  return (
    <div>
      <div style={styles.rootCourse} >
        <br />
        <ChapterTabs />
      </div>
    </div>
    )
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
