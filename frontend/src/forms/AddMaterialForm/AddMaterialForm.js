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
  }

  getPreview = (obj) => {
    if(obj)
    {
      let preview = Object.keys(obj).map(key => obj[key])
      return preview
    }
  }

  render() {
    const { fields : {files} } = this.props

    const dropStyle = {
      margin: 30,
      padding: 30,
      transition: 'all 0.5s',
      borderRadius: 5,
      borderColor: 'black',
      borderStyle: 'dashed',
      borderWidth: 2
    }

    const activeStyle = {
      margin: 30,
      padding: 30,
      borderRadius: 8,
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 2
    }

    var filePreviews = []
    if(this.props.fields.files && this.props.fields.files.value)
      filePreviews = this.getPreview(this.props.fields.files.value)

    return (
      <div>
        <div>
          <div>
            <Dropzone
              { ...files } style={dropStyle} activeStyle={activeStyle}
              onDrop={ ( filesToUpload, e ) => files.onChange(filesToUpload) }>
              <div style={{'text-align': 'center'}}>
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
