import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm, Field } from 'redux-form'
import Dropzone from 'react-dropzone'
import LinearProgress from 'material-ui/LinearProgress'

const propTypes = {
  request: PropTypes.object,
  sendSolution: PropTypes.func,
  progress: PropTypes.number,
  aId: PropTypes.string,
}

const dropComponentPropTypes = {
  input: PropTypes.object,
}

const dropComponent = (props) => {
  const styles = getStyles()
  const uploadMessage = 'Zieh deine Lösungen hier hin, oder klicke zum Durchsuchen'
  return (
    <Dropzone
      {...props}
      disableClick={props.input.request}
      activeStyle={styles.activeStyle}
      style={styles.dropStyle}
      onDrop={
        (filesToUpload) => {
          props.input.onChange(filesToUpload)
          props.input.sendSolution(props.input.aId, filesToUpload)
        }}
    >
      <div style={styles.containerStyle}>
        <strong>{uploadMessage}</strong>
      </div>
    </Dropzone>
) }

dropComponent.propTypes = dropComponentPropTypes

function UploadSolution({ request, sendSolution, progress, aId }) {
  const uploadText = 'Wird hochgeladen:'
  return (
    <div>
      <Field
        name="files"
        component={dropComponent}
        props={{
          aId,
          request,
          sendSolution,
          progress,
        }}
      />
      {
        request ?
          <div style={getStyles().progressStyle}>
            <strong>{uploadText} {Math.floor(progress)}%</strong>
            <LinearProgress
              mode="determinate"
              value={progress}
            />
          </div>
        : null
      }
    </div>
  )
}

function getStyles() {
  return {
    containerStyle: {
      textAlign: 'center',
      align: 'center',
    },
    progressStyle: {
      marginLeft: '30px',
      marginRight: '30px',
      textAlign: 'right',
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

UploadSolution.propTypes = propTypes

export default reduxForm({
  form: 'UploadSolution',
})(Radium(UploadSolution))
