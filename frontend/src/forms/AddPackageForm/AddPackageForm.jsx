import React, { PropTypes } from 'react'
import Radium from 'radium'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import SelectFieldWrapper from '../../components/SelectFieldWrapper/SelectFieldWrapper'
import { load } from '../../redux/modules/AddPkg'
// Inspiration: http://redux-form.com/5.1.0/#/examples/initializing-from-state?_k=r7lr04
export const fields = ['name', 'courseInstance', 'access']

const propTypes = {
  fields: PropTypes.object,
  defaultData: PropTypes.object,
  courseInstances: PropTypes.array,
  dispatch: PropTypes.func,
}

const defaultProps = {
  fields: {},
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

    const { fields: { name, courseInstance } } = this.props

    let courseItems = []
    if (this.props.courseInstances && this.props.courseInstances.length > 0) {
      courseItems = this.props.courseInstances
      .map(c => <MenuItem key={c._id} value={c._id} primaryText={c.course.name} />)
    }

    return (
      <div>
        <div styles={styles.addPackageContainer} fullWidth>
          <TextField
            {...name}
            hintText={nameHint}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={nameLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
          />
          <br />
          <SelectFieldWrapper
            {...courseInstance}
            styles={styles.blocking}
            floatingLabelText={courseLabel}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
            fullWidth
          >
            {courseItems}
          </SelectFieldWrapper>
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
AddPackage.defaultProps = defaultProps

export default reduxForm({
  form: 'AddPkg',
  fields,
}, mapStateToProps)(Radium(AddPackage))
