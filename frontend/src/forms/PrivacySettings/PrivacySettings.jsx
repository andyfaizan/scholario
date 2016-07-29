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

function PrivacySettings({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
    </form>
  )
}

PrivacySettings.propTypes = propTypes
PrivacySettings.defaultProps = defaultProps

export default reduxForm({
  form: 'PrivacySettings',
  fields,
  validate,
})(PrivacySettings)
