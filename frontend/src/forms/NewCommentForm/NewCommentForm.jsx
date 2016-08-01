import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'

const validate = () => {
  const errors = {}
  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
}

function NewComment({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
    </form>
  )
}

NewComment.propTypes = propTypes

export default reduxForm({
  form: 'NewComment',
  validate,
})(NewComment)
