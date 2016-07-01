import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

export const fields = []

const validate = () => {
  const errors = {}
  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
}

const defaultProps = {
  fields: {},
}

function NewComment({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
    </form>
  )
}

NewComment.propTypes = propTypes
NewComment.defaultProps = defaultProps

export default reduxForm({
  form: 'NewComment',
  fields,
  validate,
})(NewComment)
