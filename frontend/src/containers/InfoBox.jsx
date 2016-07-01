import { connect } from 'react-redux'
import Box from '../components/Box/Box'

const mapStateToProps = (state, ownProps) => ({
  content: state.currentCourse,
  width: ownProps.width,
  height: ownProps.height,
})

export default connect(
  mapStateToProps)(Box)
