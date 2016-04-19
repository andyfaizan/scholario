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

var request = require('superagent');
export const fields = [ 'firstname', 'lastname', 'role', 'email' , 'password' ]

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Mindestens 8 zeichnen'
  }
  if (!values.firstname) {
    errors.firstname = 'Required'
  } else if (values.firstname.length < 1) {
    errors.firstname = 'Geben Sie Ihr Vorname ein'
  }
  if (!values.lastname) {
    errors.lastname = 'Required'
  } else if (values.lastname.length < 1) {
    errors.lastname = 'Geben Sie Ihr Nachname ein'
  }
  return errors
}

export class SignupFields extends React.Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
    // resetForm: PropTypes.func.isRequired,te
    // submitting: PropTypes.bool.isRequired
  }

  // handleChange = (event, index, value) => this.setState({value});

  sendRequest = (data) => {
    request
    .post('https://api.scholario.de/users')
    .send({ email: data.email, password: data.password,
      firstname: data.firstname, lastname: data.lastname, role: 'student' })
      .end(function(err, res){
        // Calling the end function will send the request
        console.log("Data is : " + data.email + " " + data.password +
        " " + data.firstname + " " + data.lastname + " " + data.role );
        if(res.ok){
          console.log("Status : " + res.status);
          console.log("Response body : " + res.text);
        } else{
          console.log("Response not ok. Error is : " + err);
        }
      })
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
        }
      }

      const { fields: { email, password, firstname, lastname, role }, handleSubmit } = this.props
      return (
        <div>
          <form onSubmit={handleSubmit(this.sendRequest.bind(this))}>
            <div className={classes.loginContainer}>
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
              <Grid>
                {/*TODO Why Checkboxes and not Radiobuttons?*/}
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
              {/*<SelectField
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
                <br/>
                <RaisedButton
                  label='Signup'
                  type='submit'
                  primary={false}
                  backgroundColor='#9fa8a3'
                  fullWidth={true}
                  labelStyle={styles.labelStyle} />
                <br/>
                <br/>
                <br/>
              </div>
            </form>
          </div>
        )
      }
}

export default reduxForm({
  form: 'signupForm',
  fields,
  validate
})(SignupFields)
