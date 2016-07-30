import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm, Field } from 'redux-form'
import { TextField, SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'

const propTypes = {
  handleSubmit: PropTypes.func,
  courseInstances: PropTypes.array,
  allPkgs: PropTypes.object,
  formValues: PropTypes.object,
  getObjects: PropTypes.func,
  courseInstanceValue: PropTypes.string,
  pkgValue: PropTypes.string,
}

export class AddQuestion extends React.Component {
  componentWillMount() {
    // this.props.dispatch(load(this.props.defaultData))
  }

  render() {
    const styles = getStyles()
    const titleLabel = 'Problem'
    const titleHint = 'Ein Titel für die Frage'
    const descriptionLabel = 'Text'
    const packageLabel = 'Paket'
    const courseLabel = 'Kurs'
    const materialLabel = 'Material'
    const titleLimit = 150
    const descriptionLimit = 1000

    const { handleSubmit } = this.props

    let courseItems = []
    if (this.props.courseInstances && this.props.courseInstances.length > 0) {
      courseItems = this.props.courseInstances
      .map(c => <MenuItem key={c._id} value={c._id} primaryText={c.course.name} />)
    }

    let packageItems = []
    if (this.props.formValues && this.props.formValues.courseInstance && this.props.courseInstances.length > 0) {
      packageItems = this.props.courseInstances
        .find(c => c._id === this.props.formValues.courseInstance).pkgs // pkgs in courseInstance is an array
        .map(p =>
          <MenuItem key={p._id} value={p._id} primaryText={p.name} />
        )
    }

    let materialItems = []
    if (this.props.formValues && this.props.formValues.pkg) {
      const pkgArray = this.props.getObjects(this.props.allPkgs)
      const selectedPkg = pkgArray.find(p => p._id === this.props.formValues.pkg)
      materialItems = selectedPkg.materials.map(m =>
        <MenuItem key={m._id} value={m._id} primaryText={m.name} />)
    }

    return (
      <form onSubmit={handleSubmit}>
        <div style={styles.addQuestionContainer} fullWidth>
          <Field
            name="title"
            component={TextField}
            hintText={titleHint}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={titleLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
            maxLength={titleLimit}
          />
          <br />
          <Field
            name="description"
            component={TextField}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={descriptionLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
            multiLine
            rows={4}
            maxLength={descriptionLimit}
          />
          <br />
          <Field
            name="courseInstance"
            component={SelectField}
            style={styles.blocking}
            floatingLabelText={courseLabel}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
          >
            {courseItems}
          </Field>
          <br />
          <Field
            name="pkg"
            component={SelectField}
            style={styles.blocking}
            floatingLabelText={packageLabel}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
          >
            {packageItems}
          </Field>
          <br />
          <Field
            name="material"
            component={SelectField}
            style={styles.blocking}
            floatingLabelText={materialLabel}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
          >
            {materialItems}
          </Field>
          <br />
          <br />
        </div>
      </form>
    )
  }
}

function getStyles() {
  return {
    addQuestionContainer: {
      alignItems: 'center',
      marginLeft: '10%',
      marginRight: '10%',
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

AddQuestion.propTypes = propTypes

export default reduxForm({
  form: 'AddQuestion',
})(Radium(AddQuestion))
