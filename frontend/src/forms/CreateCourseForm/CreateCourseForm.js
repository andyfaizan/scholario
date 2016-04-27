import React from 'react'
import { reduxForm } from 'redux-form'
import classes from './CreateCourseForm.scss'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

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

// Alternative way of defining props
type Props = {
  fields: Object
}

export class CreateCourse extends React.Component {
  props: Props;

  // TODO this doesn't work. Replace with state
  handleChange = (event, index, value) => {
    this.refs.sem.value = value
  }

  render() {
    const styles = {
      errorStyle:
      {
        backgroundColor: '#e74c3c'
      },
      underlineStyle:
      {
        borderColor: '#f1c40f'
      },
      focusStyle:
      {
        borderColor: '#f1c40f'
      },
      floatingLabelStyle:
      {
        color: '#27ae60'
      }
    }

    const courseHint = 'Kursname'
    const courseLabel = 'Kurs'
    const teacherLabel = 'Name des Lehrers'
    const teacherHint = 'Lehrer'
    const assistantHint = 'Name des Mitarbeiters'
    const assistantLabel = 'Assistant'
    const subjectHint = 'Fach'
    const subjectLabel = 'Subject'
    const uniHint = 'Uni'
    const uniLabel = 'Uni'
    const infoLabel = 'Information'

    const { fields: { course, teacher, assistant, semester, subject, uni, info }, handleChange } = this.props

    const menuItems = [];
        for (let i = 0; i < 8; i++) {
          menuItems.push(
            <MenuItem
              key={i}
              value={i + 1}
              primaryText={`Semester ${i + 1}`}
            />
          );
        }

    return (
      <div>
        <div className={classes.createCourseContainer} fullWidth={true}>
          {/* TODO extract presentational TextField component
          */}
          <TextField
            {...course}
            hintText={courseHint}
            errorText={course.touched && course.error ? course.error : ''}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={courseLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth={true}
            />
          <br/>
          <TextField
            {...teacher}
            hintText={teacherHint}
            errorText={teacher.touched && teacher.error ? teacher.error : ''}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={teacherLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth={true}
            />
          <br/>
          <TextField
            {...assistant}
            hintText={assistantHint}
            errorText={assistant.touched && assistant.error ? assistant.error : ''}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={assistantLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth={true}
          />
          <br/>
          <TextField
            {...subject}
            hintText={subjectHint}
            errorText={subject.touched && subject.error ? subject.error : ''}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={subjectLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth={true}
            />
          <br/>
          <SelectField
            {...semester}
            ref="sem"
            value=""
            floatingLabelText="Semester"
            floatingLabelStyle={styles.floatingLabelStyle}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}>
            {menuItems}
          </SelectField>
          <br/>
          <TextField
            {...uni}
            hintText={uniHint}
            errorText={uni.touched && uni.error ? uni.error : ''}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={uniLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth={true}
            />
          <br/>
          <TextField
            {...info}
            errorText={info.touched && info.error ? info.error : ''}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={infoLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth={true}
            multiLine={true}
            rows={2}
            rowsMax={4}
            />
          <br/>
          <br/>
        </div>
    </div>
    )
  }
}

CreateCourse = reduxForm({
  form: 'CreateCourse',
  fields,
  validate
})(CreateCourse)

export default CreateCourse
