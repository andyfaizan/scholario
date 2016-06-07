import React from 'react'
import { reduxForm } from 'redux-form'
import Dropzone from 'react-dropzone'
import LinearProgress from 'material-ui/LinearProgress'
import classes from './AddMaterialForm.scss'

export const fields = [ 'files' ]

type Props = {
  fields: Object,
  request: Object,
  addMaterial: Function,
  pkgId: String
}

var uploadError
var correctFiles = []
var showFiles

export class AddMaterial extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
  }

  componentWillMount() {
    uploadError = false
    showFiles = false
    correctFiles = []
  }

  previewFiles(files){
    var imgArray = []
    for (var i = 0; i < files.length; i++) {
      if(files[i].type.indexOf("image") > -1)
        imgArray.push(<img src={files[i].preview} className={classes.previewStyle}/>)
    }
    if(imgArray.length === 0 ){
      return <strong>Kein Preview :(</strong>
    }
    return imgArray
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

    const maxFileSize = 800*1024*1024
    const supportedTypes =
        "image/jpeg, image/gif, image/png, image/bmp, image/x-bmp, image/x-icon \
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
        .doc, .docx, .ppt, .pptx, .xls, .xlsx, .mp4, .mp3, .pdf, .txt"
    // TODO: FILE PREVIEW
    return (
      <div>
        <div>
          <div>
            <Dropzone
              { ...files } style={dropStyle} activeStyle={activeStyle}
              onDrop={
                ( filesToUpload, e ) => {
                  uploadError = false
                  showFiles = false
                  filesToUpload.map((file) => file.size < maxFileSize
                    && supportedTypes.indexOf(file.type) > -1 ?
                    correctFiles.push(file) : (uploadError = true))
                  if(correctFiles.length > 0){
                    files.onChange(correctFiles)
                    this.props.addMaterial(this.props.pkgId, correctFiles)
                    showFiles = true
                  }
                }
              }
              disableClick={this.props.request ? true : false}
              accept={supportedTypes}>
              <div className={classes.containerStyle}>
                {showFiles ?
                  this.previewFiles(correctFiles) :
                  <strong>Zieh deine Datein hier hin, oder clicke zum Durchsuchen</strong>}
              </div>
            </Dropzone>
            {uploadError ?
              <div className={classes.errorText}>
                <strong>Einige Datein konnte nicht hochgeladen!</strong>
              </div>
              : null}
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
