import React from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import classes from './AddQuestionForm.scss'
import MenuItem from 'material-ui/lib/menus/menu-item'
import SelectFieldWrapper from '../../components/SelectFieldWrapper/SelectFieldWrapper.js'
import {getCourseInstances} from '../../redux/modules/course-instance'

export const fields = ['title', 'content', 'course', 'pkg', 'material']

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  fields: Object,
}
export class AddQuestion extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
  }

  componentDidMount() {
    this.props.dispatch(getCourseInstances())
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

    const titleLabel = 'Frage'
    const titleHint = 'Ein Titel für die Frage'
    const contentLabel = 'Content'
    const packageLabel = 'Package'
    const courseLabel = 'Kurs'
    const materialLabel = 'Material'

    const { fields: { title, content, course, pkg, material} } = this.props

    var courseItems = []
    for (let i = 0; i < 8; i++) {
      courseItems.push(
        <MenuItem
          key={i}
          value={i + 1}
          primaryText={`Semester ${i + 1}`}
        />
      );
    }
    var packageItems = []
    for (let i = 0; i < 8; i++) {
      packageItems.push(
        <MenuItem
          key={i}
          value={i + 1}
          primaryText={`Semester ${i + 1}`}
        />
      );
    }
    var materialItems = []
    for (let i = 0; i < 8; i++) {
      materialItems.push(
        <MenuItem
          key={i}
          value={i + 1}
          primaryText={`Semester ${i + 1}`}
        />
      );
    }

    // if (this.props.currentCourse) {
    //   courseItems = this.props.universities
    //     .find(u => u._id === this.props.fields.university.value).programs
    //     .map(p =>
    //       <MenuItem key={p._id} value={p._id} primaryText={p.name} />
    //     )
    // }
    return (
      <div>
        <div className={classes.addQuestionContainer} fullWidth={true}>
          <TextField
            {...title}
            hintText={titleHint}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={titleLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth={true}
            />
          <br/>
          <TextField
            {...content}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={contentLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth={true}
            multiLine={true}
            rows={4}
            />
          <br/>
          <SelectFieldWrapper
             {...course}
             style = {styles.blocking}
             floatingLabelText={courseLabel}
             floatingLabelStyle={styles.floatingLabelStyle}
             underlineFocusStyle={styles.focusStyle}
             fullWidth={true}>
             {courseItems}
             </SelectFieldWrapper>
          <br/>
           <SelectFieldWrapper
              {...pkg}
              style = {styles.blocking}
              floatingLabelText={packageLabel}
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.focusStyle}
              fullWidth={true}>
              { packageItems }
            </SelectFieldWrapper>
            <br/>
            <SelectFieldWrapper
               {...material}
               style = {styles.blocking}
               floatingLabelText={materialLabel}
               floatingLabelStyle={styles.floatingLabelStyle}
               underlineFocusStyle={styles.focusStyle}
               fullWidth={true}>
               { materialItems }
               </SelectFieldWrapper>
          <br/>
          <br/>
        </div>
      </div>
    )
  }
}

AddQuestion = reduxForm({
  form: 'AddQuestion',
  fields,
  validate
})(AddQuestion)

export default AddQuestion
