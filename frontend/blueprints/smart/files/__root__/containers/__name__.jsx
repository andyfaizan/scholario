import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const propTypes = {

}

export class <%= pascalEntityName %> extends React.Component {

  render() {
    return (
      <div></div>
    )
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
)(<%= pascalEntityName %>)
