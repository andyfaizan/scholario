import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'
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
  const styles = getStyles()
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
      <div style={styles.createCourseContainer} fullWidth>
        {/* TODO extract presentational TextField component
        */}
        <TextField
          {...course}
          hintText={courseHint}
          errorText={course.touched && course.error ? course.error : ''}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText={courseLabel}
          underlineFocusStyle={styles.focusStyle}
          fullWidth
        />
        <br />
        <TextField
          {...teacher}
          hintText={teacherHint}
          errorText={teacher.touched && teacher.error ? teacher.error : ''}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText={teacherLabel}
          underlineFocusStyle={styles.focusStyle}
          fullWidth
        />
        <br />
        <TextField
          {...assistant}
          hintText={assistantHint}
          errorText={assistant.touched && assistant.error ? assistant.error : ''}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText={assistantLabel}
          underlineFocusStyle={styles.focusStyle}
          fullWidth
        />
        <br />
        <TextField
          {...subject}
          hintText={subjectHint}
          errorText={subject.touched && subject.error ? subject.error : ''}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText={subjectLabel}
          underlineFocusStyle={styles.focusStyle}
          fullWidth
        />
        <br />
        <SelectFieldWrapper
          {...semester}
          floatingLabelText={semesterLabel}
          floatingLabelStyle={styles.floatingLabelStyle}
          fullWidth
        >
          {menuItems}
        </SelectFieldWrapper>
        <br />
        <TextField
          {...uni}
          hintText={uniHint}
          errorText={uni.touched && uni.error ? uni.error : ''}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText={uniLabel}
          underlineFocusStyle={styles.focusStyle}
          fullWidth
        />
        <br />
        <TextField
          {...info}
          errorText={info.touched && info.error ? info.error : ''}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText={infoLabel}
          underlineFocusStyle={styles.focusStyle}
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

function getStyles() {
  return {
    createCourseContainer: {
      marginLeft: '5%',
      marginRight: '10%',
      textAlign: 'left',
    },
    errorStyle: {
      backgroundColor: '#e74c3c',
    },
    underlineStyle: {
      borderColor: '#446CB3',
    },
    focusStyle: {
      borderColor: '#446CB3',
    },
    floatingLabelStyle: {
      color: '#27ae60',
    },
  }
}

CreateCourse.propTypes = propTypes

export default reduxForm({
  form: 'CreateCourse',
  fields,
  validate,
})(Radium(CreateCourse))
