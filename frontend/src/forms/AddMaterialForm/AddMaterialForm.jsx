import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Dropzone from 'react-dropzone'
import LinearProgress from 'material-ui/LinearProgress'
import classes from './AddMaterialForm.scss'

export const fields = ['files']

const propTypes = {
  fields: PropTypes.object,
  request: PropTypes.object,
  addMaterial: PropTypes.func,
  pkgId: PropTypes.string,
}

const defaultProps = {
  fields: {},
}

let uploadError
let correctFiles = []
let showFiles
let filesForPreview = []

export class AddMaterial extends React.Component {
  componentWillMount() {
    uploadError = false
    showFiles = false
    correctFiles = []
    filesForPreview = []
  }

  previewFiles(files) {
    const imgArray = []
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.indexOf('image') > -1) {
        imgArray.push(<img src={files[i].preview} className={classes.previewStyle} alt="Preview" />)
      }
    }
    if (imgArray.length === 0) {
      return <strong>Kein Preview</strong>
    }
    return imgArray
  }

  render() {
    const { fields: { files } } = this.props

    const maxFileSize = 800 * 1024 * 1024
    const supportedTypes =
        'image/jpeg, image/gif, image/png, image/bmp, image/x-bmp, image/x-icon \
        video/mp4, video/mpeg, video/webm, \
        audio/mp3, audio/mpeg, audio/wav, audio/x-wav, audio/x-pn-wav, audio/webm, \
        application/pdf, \
        application/msword, \
        application/vnd.openxmlformats-officedocument.wordprocessingml.document, \
        applicatio/ppt, \
        application/vnd.openxmlformats-officedocument.presentationml.presentation, \
        application/vnd.ms-excel, \
        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, \
        text/plain, \
        video/x-msvideo, video/quicktime, \
        .doc, .docx, .ppt, .pptx, .xls, .xlsx, .mp4, .mp3, .pdf, .txt, .mov, .avi'
    // TODO: FILE PREVIEW
    return (
      <div>
        <div>
          <div>
            <Dropzone
              {...files} style={classes.dropStyle} activeStyle={classes.activeStyle}
              onDrop={
                (filesToUpload) => {
                  uploadError = false
                  showFiles = false
                  filesToUpload.map((file) => (file.size < maxFileSize
                    && supportedTypes.indexOf(file.type) > -1 ?
                    (file.name.replace(/\//g, '-'), correctFiles.push(file), filesForPreview.push(file))
                    : (uploadError = true)))
                  if (correctFiles.length > 0) {
                    files.onChange(correctFiles)
                    this.props.addMaterial(this.props.pkgId, correctFiles)
                    correctFiles = []
                    showFiles = true
                  }
                }
              }
              disableClick={this.props.request}
              accept={supportedTypes}
            >
              <div className={classes.containerStyle}>
                {showFiles ?
                  this.previewFiles(filesForPreview) :
                  <strong>Zieh deine Datein hier hin, oder clicke zum Durchsuchen</strong>}
              </div>
            </Dropzone>
            {uploadError ?
              <div className={classes.errorText}>
                <strong>Einige Datein konnte nicht hochgeladen!</strong>
              </div>
              : null}
            {this.props.request ? <LinearProgress mode="indeterminate" /> : null}
          </div>
        </div>
      </div>
    )
  }
}

AddMaterial.propTypes = propTypes
AddMaterial.defaultProps = defaultProps

export default reduxForm({
  form: 'AddMaterial',
  fields,
})(AddMaterial)
