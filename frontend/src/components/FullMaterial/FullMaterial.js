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

const getFrame = (fileType, playing) => {
  if(fileType === 'image'){
    return <img src="http://lorempixel.com/400/300/nature/" style={mediaStyle}/>
  }
  if(fileType === 'video'){
    return (
      <div className={classes.videoStyle}>
        <ReactPlayer
          url='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
          playing={playing}
          // volume={volume}
          // soundcloudConfig={soundcloudConfig}
          // vimeoConfig={vimeoConfig}
          // youtubeConfig={youtubeConfig}
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
  return <IFrame src="msxnet.org/orwell/print/animal_farm.pdf"/>
}

const FullMaterial = ({fileType}) => (
  <Card>
    <CardHeader
      title="Game Theory"
      subtitle="Basics of Economics"
      avatar="http://lorempixel.com/100/100/nature/"
      />
    <Grid fluid={true}>
      <Row >
        <Col xs={20} md={8}>
          <Card style={previewStyle}>
            {getFrame(fileType)}
          </Card>
        </Col>
        <Col xs={4} md={4}>
          <RightSectionTeacherDashboard questions={[]}/>
        </Col>
      </Row>
    </Grid>
  </Card>
);

FullMaterial.propTypes = {}

export default FullMaterial
