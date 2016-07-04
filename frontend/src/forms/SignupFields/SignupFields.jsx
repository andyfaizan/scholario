import React, { PropTypes } from 'react'
import Radium from 'radium'
import TextField from 'material-ui/TextField'
import classes from './SignupFields.scss'
import MenuItem from 'material-ui/MenuItem'
import SelectFieldWrapper from '../../components/SelectFieldWrapper/SelectFieldWrapper'
import { reduxForm } from 'redux-form'
import { getUniversities } from '../../redux/modules/university'
import { getPrograms } from '../../redux/modules/program'


export const fields = ['firstname', 'lastname', 'email', 'password', 'university', 'program']

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Erforderlich'
  } else if (!/^[AZ09._%+-]+@[AZ09.-]+\.[AZ]{2,4}$/i.test(values.email)) {
    errors.email = 'Ungültige Email Addresse'
  }
  if (!values.password) {
    errors.password = 'Erforderlich'
  } else if (values.password.length < 8) {
    errors.password = 'Mindestens 8 zeichnen'
  }
  if (!values.firstname) {
    errors.firstname = 'Geben Sie Ihr Vorname ein'
  }
  if (!values.lastname) {
    errors.lastname = 'Geben Sie Ihr Nachname ein'
  }

  return errors
}

const propTypes = {
  fields: PropTypes.object.isRequired,
  universities: PropTypes.array,
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  confirm: PropTypes.func,
  // resetForm: PropTypes.func.isRequired,te
  // submitting: PropTypes.bool.isRequired
}

export class SignupFields extends React.Component {
  constructor(props) {
    super(props)
    this.checkKeyAndSubmit = this.checkKeyAndSubmit.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getUniversities())
    this.props.dispatch(getPrograms())
  }

  checkKeyAndSubmit = (e) => {
    if (e.keyCode === 13) this.props.confirm()
  }

  render() {
    const styles = getStyles()

    const { fields: { email, password, firstname, lastname, university, program } } = this.props

    let programItems = []
    if (this.props.fields.university.value) {
      programItems = this.props.universities
        .find(u => u._id === this.props.fields.university.value).programs
        .map(p =>
          <MenuItem key={p._id} value={p._id} primaryText={p.name} />
        )
    }

    return (
      <div>
        <div style={styles.signupContainer}>
          <TextField
            {...firstname}
            hintText="Steve"
            errorText={firstname.touched && firstname.error ? firstname.error : ''}
            floatingLabelStyle={classes.floatingLabelStyle}
            floatingLabelText="Vorname"
            underlineFocusStyle={classes.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          />
          <TextField
            {...lastname}
            hintText="Jobs"
            errorText={lastname.touched && lastname.error ? lastname.error : ''}
            floatingLabelStyle={classes.floatingLabelStyle}
            floatingLabelText="Nachname"
            underlineFocusStyle={classes.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          />
          <TextField
            {...email}
            hintText="abc@gmail.com"
            errorText={email.touched && email.error ? email.error : ''}
            floatingLabelStyle={classes.floatingLabelStyle}
            floatingLabelText="Email"
            underlineFocusStyle={classes.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          />
          <TextField
            {...password}
            errorText={password.touched && password.error ? password.error : ''}
            floatingLabelText="Passwort"
            type="password"
            floatingLabelStyle={classes.floatingLabelStyle}
            underlineFocusStyle={classes.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          />
          <SelectFieldWrapper
            {...university}
            style={styles.blocking}
            floatingLabelText="Hochschule"
            floatingLabelStyle={classes.floatingLabelStyle}
            underlineFocusStyle={classes.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          >
            {this.props.universities.map(u =>
              <MenuItem key={u._id} value={u._id} primaryText={u.name} />
            )}
          </SelectFieldWrapper>
          <SelectFieldWrapper
            {...program}
            style={styles.blocking}
            floatingLabelText="Program"
            floatingLabelStyle={classes.floatingLabelStyle}
            underlineFocusStyle={classes.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          >
            {programItems}
          </SelectFieldWrapper>
        </div>
      </div>
    )
  }
}

function getStyles() {
  return {
    signupContainer: {
      alignItems: 'center',
      marginLeft: '10%',
      marginRight: '10%',
      overflow: 'scroll',
      maxHeight: '400px',
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
    labelStyle: {
      color: '#fff',
      fontWeight: 'bold',
    },
    block: {
      maxWidth: '250px',
    },
    checkBox: {
      marginBottom: '16px',
      paddingLeft: '10px',
      backgroundColor: '#000',
    },
    blocking: {
      overflow: 'hidden',
    },
  }
}

SignupFields.propTypes = propTypes

export default reduxForm({
  form: 'signupForm',
  fields,
  validate,
})(Radium(SignupFields))
