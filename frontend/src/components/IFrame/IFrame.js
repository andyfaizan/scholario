import React from 'react'

type Props = {
  src: String,
  height: Number,
  width: Number
};
export class IFrame extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <iframe
          src={"https://docs.google.com/viewer?url="+this.props.src+"&embedded=true"}
          height={300}
          width={610}
          frameborder="0"/>
      </div>
    )
  }
}

export default IFrame
