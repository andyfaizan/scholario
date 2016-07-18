import React from 'react'
import Radium from 'radium'

import DashboardToolBar from '../../containers/DashboardToolBar'
import FooterLanding from '../../components/FooterLanding/FooterLanding'

const propTypes = {
}

function DummyPage() {
  const styles = getStyles()

  return (
    <div>
      <div style={styles.dashboardRoot}>
        <DashboardToolBar />
        <div style={styles.container}>
          <h1>
            Coming soon.
          </h1>
        </div>
      </div>
      <div style={styles.footer}>
        <FooterLanding />
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
    footer: {
      fontSize: '20px',
      backgroundColor: '#FBF6EC',
      color: 'darkslategray',
      height: '10%',
    },
  }
}


DummyPage.propTypes = propTypes

export default Radium(DummyPage)
