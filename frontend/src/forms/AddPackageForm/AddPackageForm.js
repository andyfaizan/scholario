import React from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import classes from './AddPackageForm.scss'
import MenuItem from 'material-ui/MenuItem';
import SelectFieldWrapper from '../../components/SelectFieldWrapper/SelectFieldWrapper.js'
import { load } from '../../redux/modules/AddPkg'
// Inspiration: http://redux-form.com/5.1.0/#/examples/initializing-from-state?_k=r7lr04
export const fields = ['name', 'courseInstance', 'access']

type Props = {
  fields: Object,
}
export class AddPackage extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
  }

  componentWillMount() {
    this.props.dispatch(load(this.props.defaultData))
  }

  render() {

    const styles = {
      errorStyle:
      {
        backgroundColor: '#e74c3c'
      },
      underlineStyle:
      {
        borderColor: '#446CB3'
      },
      focusStyle:
      {
        borderColor: '#446CB3'
      },
      floatingLabelStyle:
      {
        color: '#26A65B'
      }
    }

    const nameLabel = 'Name'
    const nameHint = 'Packagename'
    const courseLabel = 'Kurs'
    const accessLabel = 'Wer soll das sehen?'
    const menuItem1 = 'Öffentlich'
    const menuItem2 = 'Freunde'

    const { fields: { name, courseInstance, access } } = this.props

    var courseItems = []
    if(this.props.courseInstances && this.props.courseInstances.length > 0){
      courseItems = this.props.courseInstances
      .map(c => <MenuItem key={c._id} value={c._id} primaryText={c.course.name} />)
    }

    return (
      <div>
        <div className={classes.addPackageContainer} fullWidth={true}>
          <TextField
            {...name}
            hintText={nameHint}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText={nameLabel}
            underlineFocusStyle={styles.focusStyle}
            fullWidth={true}
            />
          <br/>
          <SelectFieldWrapper
             {...courseInstance}
             style = {styles.blocking}
             floatingLabelText={courseLabel}
             floatingLabelStyle={styles.floatingLabelStyle}
             underlineFocusStyle={styles.focusStyle}
             fullWidth={true}>
             { courseItems }
             </SelectFieldWrapper>
          <br/>
           {/*<SelectFieldWrapper
              {...access}
              style = {styles.blocking}
              floatingLabelText={accessLabel}
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.focusStyle}
              fullWidth={true}>
                <MenuItem key={0} value={0} primaryText={menuItem1} />
                <MenuItem key={1} value={1} primaryText={menuItem2} />
            </SelectFieldWrapper>*/}
          <br/>
          <br/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: ownProps.defaultData // will pull state into form's initialValues
  }
}

AddPackage = reduxForm({
  form: 'AddPkg',
  fields
},
mapStateToProps
)
(AddPackage)
export default AddPackage
