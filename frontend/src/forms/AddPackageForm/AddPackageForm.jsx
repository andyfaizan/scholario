import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm, Field } from 'redux-form'
import { TextField, SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import { load } from '../../redux/modules/AddPkg'
// Inspiration: http://redux-form.com/5.1.0/#/examples/initializing-from-state?_k=r7lr04

const propTypes = {
  defaultData: PropTypes.object,
  courseInstances: PropTypes.array,
  dispatch: PropTypes.func,
}

export class AddPackage extends React.Component {
  componentWillMount() {
    this.props.dispatch(load(this.props.defaultData))
  }

  render() {
    const styles = getStyles()
    const nameLabel = 'Name'
    const nameHint = 'Packagename'
    const courseLabel = 'Kurs'

    let courseItems = []
    if (this.props.courseInstances && this.props.courseInstances.length > 0) {
      courseItems = this.props.courseInstances
      .map(c => <MenuItem key={c._id} value={c._id} primaryText={c.course.name} />)
    }

    return (
      <div>
        <div style={styles.addPackageContainer} fullWidth>
          <Field
            name="name"
            component={TextField}
            hintText={nameHint}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={nameLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
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
           {/* <SelectFieldWrapper
              {...access}
              style = {styles.blocking}
              floatingLabelText={accessLabel}
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.focusStyle}
              fullWidth={true}>
                <MenuItem key={0} value={0} primaryText={menuItem1} />
                <MenuItem key={1} value={1} primaryText={menuItem2} />
            </SelectFieldWrapper>*/}
          <br />
          <br />
        </div>
      </div>
    )
  }
}

function getStyles() {
  return {
    addPackageContainer: {
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
      color: '#26A65B',
    },
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.defaultData, // will pull state into form's initialValues
})

AddPackage.propTypes = propTypes

export default reduxForm({
  form: 'AddPkg',
}, mapStateToProps)(Radium(AddPackage))
