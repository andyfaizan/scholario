import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import FlatButton from 'material-ui/FlatButton';
import CardText from 'material-ui/Card/CardText';
import IFrame from '../IFrame/IFrame'
import RightSectionTeacherDashboard from '../RightSectionTeacherDashboard/RightSectionTeacherDashboard'
import List from 'material-ui/List/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import ReactPlayer from 'react-player'
import classes from './FullMaterial.scss'
import Avatar from 'material-ui/Avatar';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Questions from '../../containers/Questions'
import IconButton from 'material-ui/IconButton';
import { Router, Route, Link } from 'react-router'
import Snackbar from 'material-ui/Snackbar';

const previewStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#26A65B'
}

const mediaStyle = {
  marginLeft:'auto',
  marginRight:'auto',
  display:'block',
  padding: '10%',
  maxWidth: '100%',
  maxHeight: 'auto'
}

const youtubeConfig = {
  preload: true,
  playerVars: {
    controls: 2
  }
}

const fileConfig = {
  attributes: {
    controls: true
  }
}

const getFileType = (extension) => {
  console.log(extension)
  if(extension)
  switch (extension.split(".")[1]) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'ppt':
    case 'pptx':
    case 'xlsx':
    case 'xls':
    case 'txt':
    return 'doc'
    break

    case 'mp4':
    // case 'webm':
    case 'mp3':
    // case 'wav':
    return 'av'
    break

    case 'jpeg':
    case 'jpg':
    case 'png':
    case 'bmp':
    return 'image'
    break

    default:
      return ''
  }
}

const getFrame = (material) => {
  var fileType = getFileType(material.ext)
  if(fileType === 'image'){
    return <img src={material.url} style={mediaStyle}/>
  }
  if(fileType === 'av' && ReactPlayer.canPlay(material.url)){
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
          // onPlay={() => this.setState({ playing: true })}
          // onPause={() => this.setState({ playing: false })}
          // onBuffer={() => console.log('onBuffer')}
          // onEnded={() => this.setState({ playing: false })}
          // onError={(e) => console.log('onError', e)}
          // onProgress={this.onProgress}
          // onDuration={(duration) => this.setState({ duration })}
          />
      </div>)
  }
  if(fileType === 'doc')
    return <IFrame src={material.url}/>

  return (
    <div>
      <img src="https://placekitten.com/600/400" style={mediaStyle}/>
      <Snackbar
          open={true}
          message="Das Material kann leider nicht geöffnet werden"
          autoHideDuration={4000}
          style={{'text-align':'center'}}
      />
    </div>
  )
}

const FullMaterial = ({fileType, playing, location, courseInstance,
                       pkg, material, recentQuestions, popularQuestions, onClickVote}) => (
  <div>
  <Card>
    <CardHeader
      title={courseInstance.course ? courseInstance.course.name : ''}
      subtitle={pkg.name}
      avatar={
        <IconButton tooltip="Back to Package"
        containerElement={<Link to={`/package/${pkg._id}`}/>}>
          <ArrowBack />
        </IconButton>
      }
    />
  </Card>
  <br/>
  <br/>
  <Grid fluid={true}>
      <Row >
        <Col xs={16} md={8}>
          <Card style={previewStyle}>
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

FullMaterial.propTypes = {}

export default FullMaterial
