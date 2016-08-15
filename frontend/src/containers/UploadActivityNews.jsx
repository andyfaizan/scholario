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
  title: 'Hat etwas bei Scholario upgeloadet',
  content: 'Rohan just uploaded "My favorite cat" to "My Cat Videos" package',
  avatarLetter: 'U',
})
// const mapDispatchToProps = (dispatch) => ({
// })

// UploadActivityNews.propTypes = propTypes

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(FeedItem)
