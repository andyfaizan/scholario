import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'
import Divider from 'material-ui/lib/divider'
import CourseCard from '../../components/CourseCard/CourseCard'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import AutoComplete from 'material-ui/lib/auto-complete'

type Props = {

};
export class LeftSectionTeacherDashboard extends React.Component {
  props: Props;

  render () {

    var floatingLabelTextState = 'Search Your Courses';
    //const filter dataSource for Connects and Courses 
    const filterDataSource = [
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue',
      'Purple',
      'Black',
      'White',
    ];

    return (
      <div>
       <Card>
          <Grid>
            <Row>
            <Col  md={4}>
              <h2>Courses</h2>
            </Col>
            <Col md={4}>
              <AutoComplete
              floatingLabelText= {floatingLabelTextState}
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={filterDataSource}
              />
            </Col>
            </Row>
          </Grid>
          <Divider />
          <CardText>
              <CourseCard />
          </CardText>
       </Card>
      </div>
    )
  }
}

export default LeftSectionTeacherDashboard

