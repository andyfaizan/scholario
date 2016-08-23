import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

const propTypes = {

}

export class NewCourse extends React.Component {

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

NewCourse.propTypes = propTypes

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(NewCourse))
