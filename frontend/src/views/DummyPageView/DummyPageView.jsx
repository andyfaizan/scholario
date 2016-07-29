import React from 'react'
import Radium from 'radium'

const propTypes = {
}

function DummyPage() {
  const styles = getStyles()

  return (
    <div>
      <div style={styles.dashboardRoot}>
        <div style={styles.container}>
          <h1>
            Coming soon.
          </h1>
        </div>
      </div>
    </div>
  )
}

function getStyles() {
  return {
    dashboardRoot: {
      backgroundColor: '#FBF6EC',
      minHeight: '100vh',
    },
    container: {
      height: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      h1: {
        margin: 0,
      },
    },
  }
}


DummyPage.propTypes = propTypes

export default Radium(DummyPage)
