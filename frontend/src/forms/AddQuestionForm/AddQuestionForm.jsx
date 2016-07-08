import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import SelectFieldWrapper from '../../components/SelectFieldWrapper/SelectFieldWrapper'
// Inspiration: http://redux-form.com/5.1.0/#/examples/initializing-from-state?_k=r7lr04
export const fields = ['title', 'description', 'courseInstance', 'pkg', 'material']

const propTypes = {
  fields: PropTypes.object,
  courseInstances: PropTypes.array,
  allPkgs: PropTypes.object,
  getObjects: PropTypes.func,
}

const defaultProps = {
  fields: {},
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

    const { fields: { title, description, courseInstance, pkg, material } } = this.props

    let courseItems = []
    if (this.props.courseInstances && this.props.courseInstances.length > 0) {
      courseItems = this.props.courseInstances
      .map(c => <MenuItem key={c._id} value={c._id} primaryText={c.course.name} />)
    }

    let packageItems = []
    if (this.props.fields.courseInstance.value && this.props.courseInstances.length > 0) {
      packageItems = this.props.courseInstances
        .find(c => c._id === this.props.fields.courseInstance.value).pkgs // pkgs in courseInstance is an array
        .map(p =>
          <MenuItem key={p._id} value={p._id} primaryText={p.name} />
        )
    }

    let materialItems = []
    if (this.props.fields.pkg.value) {
      const pkgArray = this.props.getObjects(this.props.allPkgs)
    console.log(pkgArray)
      const selectedPkg = pkgArray.find(p => p._id === this.props.fields.pkg.value)
      materialItems = selectedPkg.materials.map(m =>
        <MenuItem key={m._id} value={m._id} primaryText={m.name} />)
    }

    return (
      <div>
        <div style={styles.addQuestionContainer} fullWidth>
          <TextField
            {...title}
            hintText={titleHint}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={titleLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
            maxLength={titleLimit}
          />
          <br />
          <TextField
            {...description}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={descriptionLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
            multiLine
            rows={4}
            maxLength={descriptionLimit}
          />
          <br />
          <SelectFieldWrapper
            {...courseInstance}
            style={styles.blocking}
            floatingLabelText={courseLabel}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
          >
            {courseItems}
          </SelectFieldWrapper>
          <br />
          <SelectFieldWrapper
            {...pkg}
            style={styles.blocking}
            floatingLabelText={packageLabel}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
          >
            {packageItems}
          </SelectFieldWrapper>
          <br />
          <SelectFieldWrapper
            {...material}
            style={styles.blocking}
            floatingLabelText={materialLabel}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
          >
            {materialItems}
          </SelectFieldWrapper>
          <br />
          <br />
        </div>
      </div>
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

const mapStateToProps = () => ({
  // initialValues: ownProps.defaultData // will pull state into form's initialValues
})

AddQuestion.propTypes = propTypes
AddQuestion.defaultProps = defaultProps

export default reduxForm({
  form: 'AddQuestion',
  fields,
}, mapStateToProps)(Radium(AddQuestion))
