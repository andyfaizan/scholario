// import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import FeedItem from '../components/FeedItem/FeedItem'

// const propTypes = {
//
// }

// function UploadActivityNews({}) {
//
//   return (
//     <div></div>
//   )
// }
//

const mapStateToProps = () => ({
  title: 'Hat geantwortet',
  content: 'Chris hat die Fragae "What is Bayes Theorem?" geantwortet',
  avatarLetter: 'G',
})
// const mapDispatchToProps = (dispatch) => ({
// })

// UploadActivityNews.propTypes = propTypes

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(FeedItem)
