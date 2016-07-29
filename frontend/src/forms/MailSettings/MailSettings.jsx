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

function MailSettings({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
    </form>
  )
}

MailSettings.propTypes = propTypes
MailSettings.defaultProps = defaultProps

export default reduxForm({
  form: 'MailSettings',
  fields,
  validate,
})(MailSettings)
