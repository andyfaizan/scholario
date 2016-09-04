import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

import { Card, CardTitle } from 'material-ui/Card'
// import { Toggle } from 'redux-form-material-ui'
import Toggle from 'material-ui/Toggle'

const validate = () => {
  const errors = {}
  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
}

const togglePropTypes = {
  input: PropTypes.object,
}

const renderToggle = (props) => {
  const styles = getStyles()
  return (
    <Toggle
      label={props.input.label}
      onToggle={props.input.onToggle}
      style={styles.toggle}
    />
  )
}
// TODO or not TODO defaultToggled

renderToggle.propTypes = togglePropTypes


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
          <br />
          <br />
          <div style={styles.block}>
            <Field
              name="questions"
              component={renderToggle}
              label="Benachrichtigungen für Fragen"
              onToggle={handleSubmit}
            />
            <br />
            <Field
              name="material"
              component={renderToggle}
              label="Benachrichtigungen für Material"
              onToggle={handleSubmit}
            />
            <br />
            <Field
              name="course"
              component={renderToggle}
              label="Benachrichtigungen für den Fortschritt in jedem Kurs"
              onToggle={handleSubmit}
            />
            <br />
            <Field
              name="friends"
              component={renderToggle}
              label="Benachrichtigungen von Aktivitäten von Freunden"
              onToggle={handleSubmit}
            />
            <br />
            <Field
              name="announcements"
              component={renderToggle}
              label="Benachrichtigungen wichtige Ankündigungen"
              onToggle={handleSubmit}
            />
            <br />
          </div>
        </fieldset>
        <br />
        <br />
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
      marginLeft: '20%',
    },
    toggle: {
      marginBottom: '16',
    },
  }
}

NotificationSettings.propTypes = propTypes

export default reduxForm({
  form: 'NotificationSettings',
  validate,
})(NotificationSettings)
