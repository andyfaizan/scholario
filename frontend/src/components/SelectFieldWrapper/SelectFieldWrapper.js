import React from 'react'
import SelectField from 'material-ui/SelectField';

class SelectFieldWrapper extends React.Component{
  onChange(evt, index, value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
  render() {
    return (
      <SelectField {...this.props} onChange={this.onChange.bind(this)}>
        {this.props.children}
      </SelectField>
    );
  }
}

export default SelectFieldWrapper

