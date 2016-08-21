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
  title: 'Hat einen Kurs abgeschlossen',
  content: 'Chris hat den Kurs "Mathematik" abgeschlossen',
  avatarLetter: 'A',
})
// const mapDispatchToProps = (dispatch) => ({
// })

// UploadActivityNews.propTypes = propTypes

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(FeedItem)
