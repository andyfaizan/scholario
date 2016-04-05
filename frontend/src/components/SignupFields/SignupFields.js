import React from 'react'
import TextField from 'material-ui/lib/text-field'
import classes from './SignupFields.scss'
import RaisedButton from 'material-ui/lib/raised-button'
import Checkbox from 'material-ui/lib/checkbox'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

type Props = {

};
export class SignupFields extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {value: 2}
  }
  handleChange = (event, index, value) => this.setState({value});
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
    return (
      <div>
        <div className={classes.loginContainer}>
          <TextField hintText='Steve' floatingLabelStyle={styles.floatingLabelStyle} floatingLabelText='First Name' underlineFocusStyle={styles.focusStyle} />
          <br/>
          <TextField hintText='Jobs' floatingLabelStyle={styles.floatingLabelStyle} floatingLabelText='Last Name' underlineFocusStyle={styles.focusStyle} />
          <br/>
          <TextField hintText='abc@gmail.com' floatingLabelStyle={styles.floatingLabelStyle} floatingLabelText='Email Id' underlineFocusStyle={styles.focusStyle} />
          <br/>
          <br/>
          <Grid>
            <Row className='show-grid'>
              <Col xs={12} md={1} align='right'><Checkbox label='Teacher' style={styles.checkbox} /></Col>
              <Col xs={6} md={1}><Checkbox label='Student' style={styles.checkbox}/></Col>
            </Row>
          </Grid>
          <SelectField value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText='Never' />
            <MenuItem value={2} primaryText='Every Night' />
            <MenuItem value={3} primaryText='Weeknights' />
          </SelectField>
          <br/>
          <br/>
          <SelectField value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText='Never' />
            <MenuItem value={2} primaryText='Every Night' />
            <MenuItem value={3} primaryText='Weeknights' />
          </SelectField>
          <br/>
          <br/>
          <RaisedButton label='SignIn' primary={0} backgroundColor='#9fa8a3' fullWidth={1} labelStyle={styles.labelStyle} />
          <br/>
          <br/>
          <br/>
        </div>
      </div>
    )
  }
}

export default SignupFields

