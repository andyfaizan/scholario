import React from 'react'
import { reduxForm } from 'redux-form'
import Dropzone from 'react-dropzone';

export const fields = [ 'files' ]

type Props = {
  fields: Object,
}
export class AddMaterial extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
  }

  constructor(props) {
    super(props)
    this.getPreview = this.getPreview.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  getPreview = (obj) => {
    if(obj)
    {
      let preview = Object.keys(obj).map(key => obj[key])
      return preview
    }
  }

  onDrop = (files) => {
    // console.dir(files)
  }

  render() {
    const { fields : {files} } = this.props
    var filePreviews = []
    if(this.props.fields.files && this.props.fields.files.value)
      filePreviews = this.getPreview(this.props.fields.files.value)

    return (
      <div>
        <div>
          <label>Datein</label>
          <div>
            <Dropzone
              { ...files } onDrop={this.onDrop}>
              <div>
                Zieh deine Datein hier hin, oder clicke zum Durchsuchen
              </div>
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}

// {this.props.fields.files.value.length > 0 ? <div>
//   <h2>Uploading {this.props.fields.files.value.length} files...</h2>
// <div>{
//     filePreviews
//   }</div>
// </div> : null}

AddMaterial = reduxForm({
  form: 'AddMaterial',
  fields
})(AddMaterial)

export default AddMaterial
