import React, { PropTypes } from 'react'

function <%= pascalEntityName %>({ children }) {
  const styles = getStyles()
  return (
    <div style={styles.<%= camelEntityName %>Layout}>
      {children}
    </div>
  )
}

function getStyles() {
  return {
    dashboardLayout: {

    },
  }
}

<%= pascalEntityName %>.propTypes = {
  children: PropTypes.element,
}

export default <%= pascalEntityName %>
