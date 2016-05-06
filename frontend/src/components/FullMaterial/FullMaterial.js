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

const border = {
  color:'#26A65B',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#26A65B'
};

const FullMaterial = ({}) => (
  <Card>
    <CardHeader
      title="Game Theory"
      subtitle="Basics of Economics"
      avatar="http://lorempixel.com/100/100/nature/"
      />
    <Grid fluid={true}>
      <Row >
        <Col xs={20} md={8}>
          <Card style={border}>
            <IFrame src="msxnet.org/orwell/print/animal_farm.pdf"/>
          </Card>
        </Col>
        <Col xs={4} md={4}>
          <RightSectionTeacherDashboard questions={[]}/>
        </Col>
      </Row>
    </Grid>
    {/*<CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
      >

      </CardMedia>
      <CardTitle title="Card title" subtitle="Card subtitle" />
      <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
      <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>*/}
  </Card>
);

FullMaterial.propTypes = {}

export default FullMaterial
