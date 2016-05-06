import React from 'react'
import classes from './IFrame.scss'

type Props = {
  src: String,
  height: Number,
  width: Number
};
export class IFrame extends React.Component {
  props: Props;

  render () {
    return (
        <iframe className={classes.fitParent}
          src={"https://docs.google.com/viewer?url="+this.props.src+"&embedded=true"}
          height={600}
          frameborder="0"/>
    )
  }
}

export default IFrame
