import React from 'react'
import { reduxForm } from 'redux-form'
import Dropzone from 'react-dropzone'
import LinearProgress from 'material-ui/LinearProgress'

export const fields = [ 'files' ]

type Props = {
  fields: Object,
  request: Object,
  addMaterial: Function,
  pkgId: String
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
      borderColor: '#27ae60',
      borderStyle: 'dashed',
      borderWidth: 2
    }

    const activeStyle = {
      margin: 30,
      padding: 30,
      borderRadius: 8,
      borderColor: '#27ae60',
      borderStyle: 'solid',
      borderWidth: 2,
      backgroundColor: '#eeeeee'
    }


    // TODO: FILE PREVIEW
    return (
      <div>
        <div>
          <div>
            <Dropzone
              { ...files } style={dropStyle} activeStyle={activeStyle}
              onDrop={
                ( filesToUpload, e ) => {
                  files.onChange(filesToUpload)
                  this.props.addMaterial(this.props.pkgId, filesToUpload)
                }
              }
              accept="image/*, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .mp4, .mp3, .pdf, .txt">
              <div style={{'text-align': 'center'}}>
                Zieh deine Datein hier hin, oder clicke zum Durchsuchen
              </div>
            </Dropzone>
            {this.props.request ? <LinearProgress mode="indeterminate" />: null}
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
