import React from 'react';
import Paper from 'material-ui/Paper';
import classes from './Box.scss'

type Props = {
  content: Object,
  width: Number,
  height: Number
}

export class Box extends React.Component {
  props: Props;

  render () {
    const boxStyle = {
      height: this.props.height,
      width: this.props.width,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block'
    }

    return (
      <div>
        <Paper
          style={boxStyle}
          zDepth={1}>
          <h1>{this.props.content ? this.props.content : 'Heading'}</h1>
          {this.props.content ? this.props.content : 'Some text'}
        </Paper>
      </div>
    )
  }
}

export default Box
