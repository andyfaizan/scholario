import React, { PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

const propTypes = {

}

export class <%= pascalEntityName %> extends React.Component {
  const styles = getStyles()

  render () {
    return (
      <div></div>
    )
  }
}

function getStyles() {
  return {

  }
}

<%= pascalEntityName %>.propTypes = propTypes

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(<%= pascalEntityName %>))
