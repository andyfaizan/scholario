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


    // TODO: FILE PREVIEW
    return (
      <div>
        <div>
          <div>
            <Dropzone
              { ...files } style={dropStyle} activeStyle={activeStyle}
              onDrop={ ( filesToUpload, e ) => files.onChange(filesToUpload) }
              accept="image/*, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .mp4, .mp3, .pdf, .txt">
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

AddMaterial = reduxForm({
  form: 'AddMaterial',
  fields
})(AddMaterial)

export default AddMaterial
