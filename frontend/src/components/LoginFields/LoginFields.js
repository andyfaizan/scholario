import React from 'react'
import TextField from 'material-ui/lib/text-field'

type Props = {

};
export class LoginFields extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <TextField
          floatingLabelText='Username or Email Address'
        />
      </div>
    )
  }
}

export default LoginFields

