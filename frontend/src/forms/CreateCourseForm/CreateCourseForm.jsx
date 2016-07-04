import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'
import classes from './CreateCourseForm.scss'
import TextField from 'material-ui/TextField'
import SelectFieldWrapper from '../../components/SelectFieldWrapper/SelectFieldWrapper'
import MenuItem from 'material-ui/MenuItem'

export const fields = ['course', 'teacher', 'assistant', 'semester',
'subject', 'uni', 'info']

const validate = (values) => {
  const errors = {}
  if (!values.course) {
    errors.course = 'Erforderlich'
  }
  if (!values.teacher) {
    errors.teacher = 'Erforderlich'
  }
  if (!values.assistant) {
    errors.assistant = 'Erforderlich'
  }
  if (!values.subject) {
    errors.subject = 'Erforderlich'
  }
  if (!values.uni) {
    errors.uni = 'Erforderlich'
  }
  if (!values.info) {
    errors.info = 'Erforderlich'
  }
  return errors
}

const propTypes = {
  fields: PropTypes.object,
}

function CreateCourse({ fields: { course, teacher, assistant, semester, subject, uni, info } }) {
  const courseHint = 'Kursname'
  const courseLabel = 'Kurs'
  const teacherLabel = 'Lehrer'
  const teacherHint = 'Lehrer'
  const assistantHint = 'Mitarbeiter'
  const assistantLabel = 'Assistent'
  const subjectHint = 'Fach'
  const subjectLabel = 'Fachbereich'
  const uniHint = 'Uni'
  const uniLabel = 'Hochschule'
  const infoLabel = 'Information'
  const semesterLabel = 'Semester'

  const menuItems = []
  for (let i = 0; i < 8; i++) {
    menuItems.push(
      <MenuItem
        key={i}
        value={i + 1}
        primaryText={`Semester ${i + 1}`}
      />
    )
  }

  return (
    <div>
      <div className={classes.createCourseContainer} fullWidth>
        {/* TODO extract presentational TextField component
        */}
        <TextField
          {...course}
          hintText={courseHint}
          errorText={course.touched && course.error ? course.error : ''}
          floatingLabelStyle={classes.floatingLabelStyle}
          floatingLabelText={courseLabel}
          underlineFocusStyle={classes.focusStyle}
          fullWidth
        />
        <br />
        <TextField
          {...teacher}
          hintText={teacherHint}
          errorText={teacher.touched && teacher.error ? teacher.error : ''}
          floatingLabelStyle={classes.floatingLabelStyle}
          floatingLabelText={teacherLabel}
          underlineFocusStyle={classes.focusStyle}
          fullWidth
        />
        <br />
        <TextField
          {...assistant}
          hintText={assistantHint}
          errorText={assistant.touched && assistant.error ? assistant.error : ''}
          floatingLabelStyle={classes.floatingLabelStyle}
          floatingLabelText={assistantLabel}
          underlineFocusStyle={classes.focusStyle}
          fullWidth
        />
        <br />
        <TextField
          {...subject}
          hintText={subjectHint}
          errorText={subject.touched && subject.error ? subject.error : ''}
          floatingLabelStyle={classes.floatingLabelStyle}
          floatingLabelText={subjectLabel}
          underlineFocusStyle={classes.focusStyle}
          fullWidth
        />
        <br />
        <SelectFieldWrapper
          {...semester}
          floatingLabelText={semesterLabel}
          floatingLabelStyle={classes.floatingLabelStyle}
          fullWidth
        >
          {menuItems}
        </SelectFieldWrapper>
        <br />
        <TextField
          {...uni}
          hintText={uniHint}
          errorText={uni.touched && uni.error ? uni.error : ''}
          floatingLabelStyle={classes.floatingLabelStyle}
          floatingLabelText={uniLabel}
          underlineFocusStyle={classes.focusStyle}
          fullWidth
        />
        <br />
        <TextField
          {...info}
          errorText={info.touched && info.error ? info.error : ''}
          floatingLabelStyle={classes.floatingLabelStyle}
          floatingLabelText={infoLabel}
          underlineFocusStyle={classes.focusStyle}
          fullWidth
          multiLine
          rows={2}
          rowsMax={4}
        />
        <br />
        <br />
      </div>
    </div>
  )
}

CreateCourse.propTypes = propTypes

export default reduxForm({
  form: 'CreateCourse',
  fields,
  validate,
})(Radium(CreateCourse))
