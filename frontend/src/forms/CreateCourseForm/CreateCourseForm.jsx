import React from 'react'
import Radium from 'radium'
import { reduxForm, Field } from 'redux-form'
import { TextField, SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'

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

function CreateCourse() {
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
      <div style={styles.createCourseContainer}>
        {/* TODO extract presentational TextField component
        */}
        <Field
          name="course"
          component={TextField}
          hintText={courseHint}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText={courseLabel}
          underlineFocusStyle={styles.focusStyle}
          fullWidth
        />
        <br />
        <Field
          name="teacher"
          component={TextField}
          hintText={teacherHint}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText={teacherLabel}
          underlineFocusStyle={styles.focusStyle}
          fullWidth
        />
        <br />
        <Field
          name="assistant"
          component={TextField}
          hintText={assistantHint}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText={assistantLabel}
          underlineFocusStyle={styles.focusStyle}
          fullWidth
        />
        <br />
        <Field
          name="subject"
          component={TextField}
          hintText={subjectHint}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText={subjectLabel}
          underlineFocusStyle={styles.focusStyle}
          fullWidth
        />
        <br />
        <Field
          name="semester"
          component={SelectField}
          floatingLabelText={semesterLabel}
          floatingLabelStyle={styles.floatingLabelStyle}
          fullWidth
        >
          {menuItems}
        </Field>
        <br />
        <Field
          name="uni"
          component={TextField}
          hintText={uniHint}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText={uniLabel}
          underlineFocusStyle={styles.focusStyle}
          fullWidth
        />
        <br />
        <Field
          name="info"
          component={TextField}
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

export default reduxForm({
  form: 'CreateCourse',
  validate,
})(Radium(CreateCourse))
