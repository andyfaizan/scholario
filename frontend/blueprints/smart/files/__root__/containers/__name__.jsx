import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const propTypes = {

}

function <%= pascalEntityName %>({}) {

  return (
    <div></div>
  )
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
})

<%= pascalEntityName %>.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= pascalEntityName %>)
