// import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import StatsBox from '../components/StatsBox/StatsBox'

// const propTypes = {
//
// }
//

const mapStateToProps = () => ({
  // statsList: selectors.getAnswerStats(uid),
  // totalAmount: selectors.getTotalAnswers(uid),
  title: 'Top Answers',
  statsList: [
    {
      amount: '5',
      content: 'What is GDP?',
    },
    {
      amount: '7',
      content: 'Explain Bayes Theorem',
    },
    {
      amount: '11',
      content: 'Game theory discussion',
    },
  ],
  totalAmount: '43',
})

// const mapDispatchToProps = (dispatch) => ({
// })

// TopAnswersBox.propTypes = propTypes

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(StatsBox)
