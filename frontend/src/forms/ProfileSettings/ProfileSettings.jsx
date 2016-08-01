import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'

export const fields = []

const validate = () => {
  const errors = {}
  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
}

const defaultProps = {
  fields: {},
}

function ProfileSettings({ fields: { university },  handleSubmit }) {
  const styles = getStyles()

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <TextField
        {...university}
        floatingLabelText="Ihre Hochschule Name"
        fullWidth={false}
        floatingLabelStyle={styles.floatingLabel}
        underlineFocusStyle={styles.underlineColor}
        style={styles.textFieldStyle}
      />
      </Card>
    </form>
  )
}

function getStyles() {
  return {
    floatingLabel: {
      opacity: '0.7',
      fontSize: '80%',
      color: '#26A65B',
    },
    underlineColor: {
      borderColor: '#446CB3',
    },
    iconStyle: {
      height: '50px',
      width: '50px',
      opacity: '0.8',
    },
    textFieldStyle: {
      width: '80%',
      padding: '0',
      fontSize: '200%',
    },
    mediumIcon: {
      width: '120px',
      height: '120px',
      paddingRight: '10px',
      paddingLeft: '10px',
      paddingTop: '10px',
      paddingBottom: '0px',
      marginTop: '0px',
      marginRight: '0px',
    },
    medium: {
      width: '60px',
      height: '60px',
    },
    sendEmail: {
      opacity: '0.8',
    },
  }
}

ProfileSettings.propTypes = propTypes
ProfileSettings.defaultProps = defaultProps

export default reduxForm({
  form: 'ProfileSettings',
  fields,
  validate,
})(ProfileSettings)
