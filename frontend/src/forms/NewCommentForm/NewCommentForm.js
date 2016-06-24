import React from 'react'
import { reduxForm } from 'redux-form'

export const fields = []

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
}
export class NewComment extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
  }

  render() {
    const { fields, handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
      </form>
    )
  }
}

NewComment = reduxForm({
  form: 'NewComment',
  fields,
  validate
})(NewComment)

export default NewComment
