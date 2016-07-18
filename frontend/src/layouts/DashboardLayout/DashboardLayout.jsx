import React, { PropTypes } from 'react'
import '../../styles/dashboard.scss'

import DashboardToolBar from '../../containers/DashboardToolBar'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import { ToolBarGreen } from '../../styles/colors'

function Dashboard({ children }) {
  const styles = getStyles()

  return (
    <div style={styles.dashboardLayout}>
      <DashboardToolBar />
        {children}
      <FooterLanding />
    </div>
  )
}

function getStyles() {
  return {
    dashboardRoot: {
      backgroundColor: '#FBF6EC',
      minHeight: '100vh',
    },
    dashboardLayout {
      backgroundColor: ToolBarGreen,
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

Dashboard.propTypes = {
  children: PropTypes.element,
}

export default Dashboard
