import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardHeader from 'material-ui/Card/CardHeader'
import IFrame from '../IFrame/IFrame'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import ReactPlayer from 'react-player'
import classes from './FullMaterial.scss'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Questions from '../../containers/Questions'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router'
import Snackbar from 'material-ui/Snackbar'


const youtubeConfig = {
  preload: true,
  playerVars: {
    controls: 2,
  },
}

const fileConfig = {
  attributes: {
    controls: true,
  },
}

const imageTypes = 'image/jpeg, image/gif, image/png, image/bmp, image/x-bmp, image/x-icon'

const mediaTypes = 'video/mp4, video/mpeg, video/webm, \
                  audio/mp3, audio/mpeg, audio/wav, audio/x-wav, audio/x-pn-wav, audio/webm'

const docTypes = 'application/pdf, \
                  application/msword, \
                  application/vnd.openxmlformats-officedocument.wordprocessingml.document, \
                  applicatio/ppt, \
                  application/vnd.openxmlformats-officedocument.presentationml.presentation, \
                  application/vnd.ms-excel, \
                  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, \
                  text/plain '

const getFileTypeFromMime = (mimetype) => {
  if (imageTypes.indexOf(mimetype) > -1) {
    return 'image'
  } else if (mediaTypes.indexOf(mimetype) > -1) {
    return 'av'
  } else if (docTypes.indexOf(mimetype) > -1) {
    return 'doc'
  }
  return ''
}

const getFileTypeFromExt = (extension) => {
  switch (extension.split('.')[1]) {
  case 'pdf':
  case 'doc':
  case 'docx':
  case 'ppt':
  case 'pptx':
  case 'xlsx':
  case 'xls':
  case 'txt':
    return 'doc'

    // case 'webm':
    // case 'wav':
  case 'mp4':
  case 'mp3':
    return 'av'

  case 'jpeg':
  case 'jpg':
  case 'png':
  case 'bmp':
    return 'image'

  default:
    return ''
  }
}

const getFrame = (material) => {
  let fileType
  if (material.mimetype) {
    fileType = getFileTypeFromMime(material.mimetype)
  } else if (material.ext) {
    fileType = getFileTypeFromExt(material.ext)
  }

  if (fileType === 'image') {
    return <img src={material.url} className={classes.mediaStyle} alt={material.name} />
  }
  if (fileType === 'av' && ReactPlayer.canPlay(material.url)) {
    return (
      <div className={classes.videoStyle}>
        <ReactPlayer
          url={material.url}
          playing={false}
          fileConfig={fileConfig}
          volume={0.5}
          // soundcloudConfig={soundcloudConfig}
          // vimeoConfig={vimeoConfig}
          youtubeConfig={youtubeConfig}
        />
      </div>)
  }
  if (fileType === 'doc') return <IFrame src={material.url} />

  return (
    <div>
      <img src="https://placekitten.com/600/400" className={classes.mediaStyle} alt="Default" />
      <Snackbar
        open
        message="Das Material kann leider nicht geöffnet werden"
        autoHideDuration={4000}
        style={{ 'text-align': 'center' }}
      />
    </div>
  )
}

const FullMaterial = ({
  location, courseInstance, pkg, material, recentQuestions,
  popularQuestions, onClickVote }) => (
  <div>
    <Card>
      <CardHeader
        title={courseInstance.course ? courseInstance.course.name : ''}
        subtitle={pkg.name}
        avatar={
          <IconButton
            disableTouchRipple
            tooltip="Back to Package"
            containerElement={<Link to={`/package/${pkg._id}`} />}
          >
            <ArrowBack />
          </IconButton>
        }
      />
    </Card>
    <br />
    <br />
    <Grid fluid>
      <Row >
        <Col xs={16} md={8}>
          <Card className={classes.previewStyle}>
            {getFrame(material)}
          </Card>
        </Col>
        <Col xs={8} md={4}>
          <Questions
            recentQuestions={recentQuestions}
            popularQuestions={popularQuestions}
            location={location}
            linkToQuestionsList={`/course/${courseInstance._id}/questions`}
            onClickVote={(qid) => onClickVote(qid)}
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

FullMaterial.propTypes = {
  location: PropTypes.any,
  courseInstance: PropTypes.object,
  pkg: PropTypes.object,
  material: PropTypes.object,
  recentQuestions: PropTypes.array,
  popularQuestions: PropTypes.array,
  onClickVote: PropTypes.func,
}

export default FullMaterial
