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
  title: 'Top Uploads',
  statsList: [
    {
      amount: '12',
      content: 'Notes on Probability Theory',
    },
    {
      amount: '45',
      content: 'Case study on KPMG',
    },
    {
      amount: '32',
      content: 'Harvard Video Lecture',
    },
    {
      amount: '3',
      content: 'Economics flowchart',
    },
    {
      amount: '67',
      content: 'Essay on the Great Depression',
    },
  ],
  totalAmount: 76,
})

// const mapDispatchToProps = (dispatch) => ({
// })

// TopAnswersBox.propTypes = propTypes

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(StatsBox)
