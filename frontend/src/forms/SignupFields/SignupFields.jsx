import React, { PropTypes } from 'react'
import Radium from 'radium'

import MenuItem from 'material-ui/MenuItem'

import { TextField, SelectField } from 'redux-form-material-ui'
import { reduxForm, Field } from 'redux-form'
import { getUniversities } from '../../redux/modules/university'
import { getPrograms } from '../../redux/modules/program'

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

    let programItems = []
    // if (this.props.fields.university.value) {
    //   programItems = this.props.universities
    //     .find(u => u._id === this.props.fields.university.value).programs
    //     .map(p =>
    //       <MenuItem key={p._id} value={p._id} primaryText={p.name} />
    //     )
    // }

    return (
      <div>
        <div style={styles.signupContainer}>
          <Field
            name="firstname"
            hintText="Steve"
            component={TextField}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText="Vorname"
            underlineFocusStyle={styles.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          />
          <Field
            name="lastname"
            hintText="Jobs"
            component={TextField}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText="Nachname"
            underlineFocusStyle={styles.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          />
          <Field
            name="email"
            hintText="abc@gmail.com"
            component={TextField}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelText="Email"
            underlineFocusStyle={styles.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          />
          <Field
            name="password"
            floatingLabelText="Passwort"
            component={TextField}
            type="password"
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          />
          <Field
            name="university"
            style={styles.blocking}
            component={SelectField}
            floatingLabelText="Hochschule"
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          >
            {this.props.universities.map(u =>
              <MenuItem key={u._id} value={u._id} primaryText={u.name} />
            )}
          </Field>
          <Field
            name="program"
            style={styles.blocking}
            component={SelectField}
            floatingLabelText="Program"
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.focusStyle}
            onKeyDown={this.checkKeyAndSubmit}
          >
            {programItems}
          </Field>
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
  validate,
})(Radium(SignupFields))
