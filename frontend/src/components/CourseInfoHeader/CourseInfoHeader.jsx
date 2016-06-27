import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'

function CourseInfoHeader({ currentCourse }) {
  return (
    <Card>
      <CardTitle
        title={currentCourse ? currentCourse.name : 'Course Name'}
        subtitle={currentCourse ? currentCourse.module : 'Course Module'}
      />
      <CardText>
        {currentCourse ? currentCourse.info : 'Some information regarding the course'}
      </CardText>
    </Card>
  )
}

CourseInfoHeader.propTypes = {
  currentCourse: PropTypes.object,
}

export default CourseInfoHeader
