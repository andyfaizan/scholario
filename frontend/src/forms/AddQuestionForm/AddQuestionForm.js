import React from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import classes from './AddQuestionForm.scss'
import MenuItem from 'material-ui/lib/menus/menu-item'
import SelectFieldWrapper from '../../components/SelectFieldWrapper/SelectFieldWrapper.js'
import {getCourseInstances} from '../../redux/modules/course-instance'
import { load } from '../../redux/modules/AskQuestion'

export const fields = ['title', 'content', 'courseInstance', 'pkg', 'material']

type Props = {
  fields: Object,
}
export class AddQuestion extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
  }

  constructor(props) {
    super(props)
    this.getObjects = this.getObjects.bind(this)
  }

   componentWillMount() {
     this.props.dispatch(load(this.props.defaultData))
  //  this.props.dispatch(getCourseInstances())
   }

   componentWillUnmount() {
     var emptyData = {
       courseInstance : '',
       pkg: '',
       material: ''
     }
     this.props.dispatch(load(emptyData))
   }

  getObjects(obj) {
    var array=[]
    for (var p in obj) {
      if (obj[p] instanceof Object) {
        array.push(obj[p])
      }
    }
    return array
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

    const { fields: { title, content, courseInstance, pkg, material} } = this.props

    var packageItems = []
    if (this.props.fields.courseInstance.value) {
      packageItems = this.props.courseInstances
        .find(c => c._id === this.props.fields.courseInstance.value).pkgs // pkgs in courseInstance is an array
        .map(p =>
          <MenuItem key={p._id} value={p._id} primaryText={p.name} />
        )
    }

    var materials = []
    var materialItems = []
    if (this.props.fields.pkg.value) {
      var pkgArray = this.getObjects(this.props.allPkgs)
      for ( var i = 0; i < pkgArray.length; i++ ){
        if ( pkgArray[i]._id === this.props.fields.pkg.value ) {
          materials = pkgArray[i].materials
        }
      }
      materialItems = materials.map(m =>
        <MenuItem key={m._id} value={m._id} primaryText={m.name} />)
    }

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
             {...courseInstance}
             style = {styles.blocking}
             floatingLabelText={courseLabel}
             floatingLabelStyle={styles.floatingLabelStyle}
             underlineFocusStyle={styles.focusStyle}
             fullWidth={true}>
             {this.props.courseInstances
             .map(c => <MenuItem key={c._id} value={c._id} primaryText={c.course.name} />)}
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

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: ownProps.defaultData // will pull state into form's initialValues
  }
}

AddQuestion = reduxForm({
  form: 'AddQuestion',
  fields
},
mapStateToProps
)
(AddQuestion)
export default AddQuestion
