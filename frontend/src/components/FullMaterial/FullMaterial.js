import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import IFrame from '../IFrame/IFrame'
import RightSectionTeacherDashboard from '../RightSectionTeacherDashboard/RightSectionTeacherDashboard'
import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'
import Subheader from 'material-ui/lib/Subheader'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import ReactPlayer from 'react-player'
import classes from './FullMaterial.scss'
import Avatar from 'material-ui/lib/avatar'
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back'
import Questions from '../../containers/Questions'
import IconButton from 'material-ui/lib/icon-button'
import { Router, Route, Link } from 'react-router'

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

const getFileType = (extension) => {
  switch (extension.split(".")[1]) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'ppt':
    case 'pptx':
    return 'doc'
    break

    case 'mp4':
    case 'webm':
    return 'video'
    break

    case 'jpeg':
    case 'jpg':
    case 'png':
    return 'image'
    break
  }
}

// //avatar={ <Avatar icon={<ArrowBack />} onClick={console.log("Tapped")}/> }
const getFrame = (material) => {
  console.dir(material)
  var fileType = getFileType(material.ext)
  if(fileType === 'image'){
    return <img src={material.url} style={mediaStyle}/>
  }
  if(fileType === 'video'){
    return (
      <div className={classes.videoStyle}>
        <ReactPlayer
          url={material.url}
          playing={playing}
          // volume={volume}
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
  return <IFrame src={material.url}/>
}

const FullMaterial = ({location, courseInstance, pkg, material, questions, onClickVote}) => (
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
            questions={questions}
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
