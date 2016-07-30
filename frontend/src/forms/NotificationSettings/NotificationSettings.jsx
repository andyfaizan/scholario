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

function NotificationSettings({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
    </form>
  )
}

NotificationSettings.propTypes = propTypes
NotificationSettings.defaultProps = defaultProps

export default reduxForm({
  form: 'NotificationSettings',
  fields,
  validate,
})(NotificationSettings)
