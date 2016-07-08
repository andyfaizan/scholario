import React, { PropTypes } from 'react'
import SelectField from 'material-ui/SelectField'

const propTypes = {
  children: PropTypes.array,
  onChange: PropTypes.func,
}

class SelectFieldWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(evt, index, value) {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    return (
      <SelectField {...this.props} onChange={this.onChange}>
        {this.props.children}
      </SelectField>
    )
  }
}

SelectFieldWrapper.propTypes = propTypes

export default SelectFieldWrapper
