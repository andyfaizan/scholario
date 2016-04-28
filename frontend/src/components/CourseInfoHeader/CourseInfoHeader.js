import React, { PropTypes } from 'react'
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

const CourseInfoHeader = ({currentCourse}) => (
  <Card>
    <CardTitle
      title={currentCourse ? currentCourse.name : 'Course Name'}
      subtitle={currentCourse ? currentCourse.module : 'Course Module'} />
    <CardText>
      {currentCourse ? currentCourse.info : 'Some information regarding the course'}
    </CardText>
  </Card>
);


CourseInfoHeader.propTypes = {
  currentCourse: PropTypes.object.isRequired
}

export default CourseInfoHeader;
