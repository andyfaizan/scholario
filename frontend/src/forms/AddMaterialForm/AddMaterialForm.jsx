import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm, Field } from 'redux-form'
import Dropzone from 'react-dropzone'
import LinearProgress from 'material-ui/LinearProgress'

const propTypes = {
  request: PropTypes.object,
  addMaterial: PropTypes.func,
  pkgId: PropTypes.string,
  progress: PropTypes.number,
}

const dropComponentPropTypes = {
  input: PropTypes.object,
}

let uploadError
let correctFiles = []
let showFiles
let filesForPreview = []

const dropComponent = (props) => {
  const styles = getStyles()
  return (
    <Dropzone
      {...props}
      disableClick={props.input.request}
      accept={props.input.supportedTypes}
      activeStyle={styles.activeStyle}
      style={styles.dropStyle}
      onDrop={
        (filesToUpload) => {
          uploadError = false
          showFiles = false
          filesToUpload.map((file) => (file.size < props.input.maxFileSize
            && props.input.supportedTypes.indexOf(file.type) > -1 ?
            (file.name.replace(/\//g, '-'), correctFiles.push(file), filesForPreview.push(file))
            : (uploadError = true)))
          if (correctFiles.length > 0) {
            props.input.onChange(correctFiles)
            props.input.addMaterial(props.input.pkgId, correctFiles)
            correctFiles = []
            showFiles = true
          }
        }}
    >
    {showFiles ?
      props.input.previewFiles(filesForPreview) :
      <strong>Zieh deine Datein hier hin, oder clicke zum Durchsuchen</strong>}
    </Dropzone>
) }

dropComponent.propTypes = dropComponentPropTypes

export class AddMaterial extends React.Component {
  componentWillMount() {
    uploadError = false
    showFiles = false
    correctFiles = []
    filesForPreview = []
  }

  previewFiles(files) {
    const styles = getStyles()
    const imgArray = []

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.indexOf('image') > -1) {
        imgArray.push(<img src={files[i].preview} style={styles.previewStyle} alt="Preview" />)
      }
    }
    if (imgArray.length === 0) {
      return <strong>Kein Preview</strong>
    }
    return imgArray
  }

  render() {
    const uploadText = 'Wird hochgeladen'
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
            <Field
              name="files"
              component={dropComponent}
              props={{
                maxFileSize,
                supportedTypes,
                previewFiles: this.previewFiles,
                pkgId: this.props.pkgId,
                request: this.props.request,
                addMaterial: this.props.addMaterial,
              }}
            />
          {/* TODO Fix uploadError. No error shown currently */}
            {uploadError ?
              <strong>Einige Datein konnte nicht hochgeladen!</strong>
              : null}
            {
              this.props.request ?
                <div>
                  <strong>{uploadText} {Math.floor(this.props.progress)}%</strong>
                  <LinearProgress
                    mode="determinate"
                    value={this.props.progress}
                  />
                </div>
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}

function getStyles() {
  return {
    containerStyle: {
      textAlign: 'center',
      align: 'center',
    },
    previewStyle: {
      margin: '5px',
      width: '150px',
    },
    errorText: {
      textAlign: 'center',
      color: 'red',
    },
    dropStyle: {
      margin: '30px',
      padding: '30px',
      transition: 'all 0.5s',
      borderRadius: '5px',
      borderColor: '#27ae60',
      borderStyle: 'dashed',
      borderWidth: '2px',
    },
    activeStyle: {
      margin: '30px',
      padding: '30px',
      borderRadius: '8px',
      borderColor: '#27ae60',
      borderStyle: 'solid',
      borderWidth: '2px',
      backgroundColor: '#eeeeee',
    },
  }
}

AddMaterial.propTypes = propTypes

export default reduxForm({
  form: 'AddMaterial',
})(Radium(AddMaterial))
