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

function ProfileSettings({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
    </form>
  )
}

ProfileSettings.propTypes = propTypes
ProfileSettings.defaultProps = defaultProps

export default reduxForm({
  form: 'ProfileSettings',
  fields,
  validate,
})(ProfileSettings)
