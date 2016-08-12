import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { Card, CardTitle } from 'material-ui/Card'
import Toggle from 'material-ui/Toggle';

import { ToolBarGreen, CardBlue } from '../../styles/colors'

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

function NotificationSettings({ handleSubmit }) {
    const styles = getStyles()
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardTitle
          title="Benachrichtigungseinstellungen"
          subtitle="Legen Sie Ihre Einstellungen für die Benachrichtigungen."
        />
        <fieldset style={styles.fieldsetStyle}>
          <br/>
          <br/>
          <div style={styles.block}>
            <Toggle
              label="Question"
              defaultToggled={true}
              style={styles.toggle}
            />
            <br/>
            <Toggle
              label="Question"
              defaultToggled={true}
              style={styles.toggle}
            />
            <br/>
            <Toggle
              label="Question"
              defaultToggled={true}
              style={styles.toggle}
            />
            <br/>
            <Toggle
              label="Question"
              defaultToggled={true}
              style={styles.toggle}
            />
            <br/>
            <Toggle
              label="Question"
              defaultToggled={true}
              style={styles.toggle}
            />
            <br/>
          </div>
        </fieldset>
        <br/>
        <br/>
      </Card>
    </form>
  )
}

function getStyles() {
  return {
    standardFieldFormatting: {
      marginLeft: '10%',
    },
    fieldsetStyle: {
      marginLeft: '10%',
      marginRight: '10%',
      marginTop: '5%',
      marginBottom: '5%',
    },
    buttonStyle: {
      width: '80%',
    },
    block: {
      maxWidth: '50%',
      marginLeft: '25%',
    },
    toggle: {
      marginBottom: '16',
    },
  }
}

NotificationSettings.propTypes = propTypes
NotificationSettings.defaultProps = defaultProps

export default reduxForm({
  form: 'NotificationSettings',
  fields,
  validate,
})(NotificationSettings)
