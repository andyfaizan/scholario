import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

const propTypes = {

}

export class AssignmentExcerscises extends React.Component {

  render () {
    const styles = getStyles()
    return (
      <div></div>
    )
  }
}

function getStyles() {
  return {

  }
}

AssignmentExcerscises.propTypes = propTypes

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(AssignmentExcerscises))
