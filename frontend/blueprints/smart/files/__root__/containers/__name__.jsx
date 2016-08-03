import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const propTypes = {

}

function <%= pascalEntityName %>({}) {

  return (
    <div></div>
  )
}

<%= pascalEntityName %>.propTypes = propTypes

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

<%= pascalEntityName %>.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= pascalEntityName %>)
