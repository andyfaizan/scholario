import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

import { Card, CardTitle } from 'material-ui/Card'
import { Toggle } from 'redux-form-material-ui'

const validate = () => {
  const errors = {}
  return errors
}

const propTypes = {
  handleSubmit: PropTypes.func,
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
          <br />
          <br />
          <div style={styles.block}>
            <Field
              name="questions"
              component={Toggle}
              label="Benachrichtigungen für Fragen"
              defaultToggled
              labelPosition="left"
              style={styles.toggle}
              onToggle={handleSubmit}
            />
            <br />
            <Field
              name="material"
              component={Toggle}
              label="Benachrichtigungen für Material"
              defaultToggled
              labelPosition="left"
              style={styles.toggle}
              onToggle={handleSubmit}
            />
            <br />
            <Field
              name="course"
              component={Toggle}
              label="Benachrichtigungen für den Fortschritt in jedem Kurs"
              defaultToggled
              labelPosition="left"
              style={styles.toggle}
              onToggle={handleSubmit}
            />
            <br />
            <Field
              name="friends"
              component={Toggle}
              label="Benachrichtigungen von Aktivitäten von Freunden"
              defaultToggled
              labelPosition="left"
              style={styles.toggle}
              onToggle={handleSubmit}
            />
            <br />
            <Field
              name="announcements"
              component={Toggle}
              label="Benachrichtigungen wichtige Ankündigungen"
              defaultToggled
              labelPosition="left"
              style={styles.toggle}
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
