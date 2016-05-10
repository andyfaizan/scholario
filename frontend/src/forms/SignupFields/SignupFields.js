import React, { PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import classes from './SignupFields.scss'
import RaisedButton from 'material-ui/lib/raised-button'
import Checkbox from 'material-ui/lib/checkbox'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import { reduxForm } from 'redux-form'

import { getUniversities } from '../../redux/modules/university'
import { getPrograms } from '../../redux/modules/program'

var request = require('superagent');
export const fields = [ 'firstname', 'lastname', 'role', 'email' , 'password' ]

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Erforderlich'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
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
  if (!values.role) {
    errors.role = 'Geben Sie Ihr Role ein'
  }
  return errors
}

export class SignupFields extends React.Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    universities: PropTypes.array,
    // resetForm: PropTypes.func.isRequired,te
    // submitting: PropTypes.bool.isRequired
  }

   constructor(props) {
    super(props);
    this.state = {value: this.props.universities[0]._id}
  }

  handleChange = (event, index, value) => this.setState({value})
  // handleChange = (event, index, value) => this.setState({value});

  componentDidMount() {
    this.props.dispatch(getUniversities())
    this.props.dispatch(getPrograms())
  }

  render () {
      const styles = {
        errorStyle:
        {
          backgroundColor: '#9fa8a3'
        },
        underlineStyle:
        {
          borderColor: '#e3e0cf'
        },
        focusStyle:
        {
          borderColor: '#e3e0cf'
        },
        floatingLabelStyle:
        {
          color: '#9fa8a3'
        },
        labelStyle:
        {
          color: '#fff',
          fontWeight: 'bold'
        },
        block:
        {
          maxWidth: '250'
        },
        checkBox:
        {
          marginBottom: '16',
          paddingLeft: '10px',
          backgroundColor: '#000'
        },
        blocking:
        {
          overflow: 'hidden'
        }
      }
      var i = 0 ;
      const { fields: { email, password, firstname, lastname, role } } = this.props
      return (
        <div>
            <div className={classes.signupContainer}>
              <TextField
                {...firstname}
                hintText='Steve'
                errorText={firstname.touched && firstname.error ? firstname.error : ''}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelText='First Name'
                underlineFocusStyle={styles.focusStyle} />
              <br/>
              <TextField
                {...lastname}
                hintText='Jobs'
                errorText={lastname.touched && lastname.error ? lastname.error : ''}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelText='Last Name'
                underlineFocusStyle={styles.focusStyle} />
              <br/>
              <TextField
                {...email}
                hintText='abc@gmail.com'
                errorText={email.touched && email.error ? email.error : ''}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelText='Email Id'
                underlineFocusStyle={styles.focusStyle} />
              <br/>
              <TextField
                {...password}
                errorText={password.touched && password.error ? password.error : ''}
                floatingLabelText='Password'
                type='password'
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineFocusStyle={styles.focusStyle}
                />
              <br/>
              <br/>
             <SelectField
                style = {styles.blocking}
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineFocusStyle={styles.focusStyle}
                value={this.state.value}
                onChange={this.handleChange}>
                {this.props.universities.map(university=>
                    <MenuItem key={university._id} value={university._id} primaryText={university.name} />
                )}
                </SelectField>
                <br/>
                <br/>
             
                <br/>
              <TextField
                {...role}
                hintText='student oder prof'
                errorText={role.touched && role.error ? role.error : ''}
                floatingLabelText='Role'
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineFocusStyle={styles.focusStyle}
                />
              {/*TODO Why Checkboxes and not Radiobuttons?*/}
              {/*<Grid>
                <Row className='show-grid'>
                  <Col xs={12} md={1} align='right'>
                    <Checkbox
                      label='Teacher'
                      style={styles.checkbox} />
                  </Col>
                  <Col xs={6} md={1}>
                    <Checkbox
                      label='Student'
                      style={styles.checkbox}/>
                  </Col>
                </Row>
              </Grid>
              <SelectField
                value={this.state.value}
                onChange={this.handleChange}>
                <MenuItem value={1} primaryText='Never' />
                <MenuItem value={2} primaryText='Every Night' />
                <MenuItem value={3} primaryText='Weeknights' />
                </SelectField>
                <br/>
                <br/>
                <SelectField
                value={this.state.value}
                onChange={this.handleChange}>
                <MenuItem value={1} primaryText='Never' />
                <MenuItem value={2} primaryText='Every Night' />
                <MenuItem value={3} primaryText='Weeknights' />
                </SelectField>*/}
                <br/>
              </div>
          </div>
        )
      }
}

export default reduxForm({
  form: 'signupForm',
  fields,
  validate
})(SignupFields)
