// import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import StatsBox from '../components/StatsBox/StatsBox'

// const propTypes = {
//
// }
//

const mapStateToProps = () => ({
  // statsList: selectors.getAnswerStats(uid),
  title: 'Top Answers',
  // totalAmount: selectors.getTotalAnswers(uid),
})

// const mapDispatchToProps = (dispatch) => ({
// })

// TopAnswersBox.propTypes = propTypes

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(StatsBox)
