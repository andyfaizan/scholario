import { connect } from 'react-redux'
import FullMaterial from '../components/FullMaterial/FullMaterial'
import { voteQuestion } from '../redux/modules/question'

const mapStateToProps = (state, ownProps) => ({
  location: ownProps.location,
  courseInstance: ownProps.courseInstance,
  pkg: ownProps.pkg,
  material: ownProps.material,
  recentQuestions: ownProps.recentQuestions,
  popularQuestions: ownProps.popularQuestions,
})

const mapDispatchToProps = (dispatch) => ({
  onClickVote: (qid) => dispatch(voteQuestion(qid)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullMaterial)
