import React, { PropTypes } from 'react'

import { Card, CardTitle } from 'material-ui/Card'

import SetProfileDataForm from '../../forms/SetProfileDataForm/SetProfileDataForm'
import SetEmailForm from '../../forms/SetEmailForm/SetEmailForm'
import SetSocialConnectsForm from '../../forms/SetSocialConnectsForm/SetSocialConnectsForm'

const propTypes = {
  handleProfileDataSubmit: PropTypes.func,
  handleEmailSubmit: PropTypes.func,
  handleSocialConnectsSubmit: PropTypes.func,
}

function ProfileSettings({ handleProfileDataSubmit, handleEmailSubmit, handleSocialConnectsSubmit }) {
  return (
    <div>
      <Card>
        <CardTitle
          title="Profileinstellungen"
          subtitle="Aktualisieren Sie Ihre aktuellen Informationen reagarding Profil."
        />
        <SetProfileDataForm onSubmit={handleProfileDataSubmit} />
        <SetEmailForm onSubmit={handleEmailSubmit} />
        <SetSocialConnectsForm onSubmit={handleSocialConnectsSubmit} />
        <br />
        <br />
      </Card>
    </div>
  )
}

ProfileSettings.propTypes = propTypes

export default ProfileSettings
