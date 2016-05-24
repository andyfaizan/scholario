import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FullMaterial from '../components/FullMaterial/FullMaterial'
import { voteQuestion } from '../redux/modules/question'

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
    courseInstance: ownProps.courseInstance,
    pkg: ownProps.pkg,
    material: ownProps.material,
    recentQuestions: ownProps.recentQuestions,
    popularQuestions: ownProps.popularQuestions,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onClickVote: (qid) => dispatch(voteQuestion(qid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullMaterial)
