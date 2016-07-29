import React, { PropTypes } from 'react'
import '../../styles/dashboard.scss'

import DashboardToolBar from '../../containers/DashboardToolBar'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import { ToolBarGreen } from '../../styles/colors'

function Dashboard({ children }) {
  const styles = getStyles()

  return (
    <div style={styles.dashboardLayout}>
      <div style={styles.dashboardRoot}>
        <DashboardToolBar />
      </div>
        {children}
      <div styles={styles.footer}>
        <FooterLanding />
      </div>
    </div>
  )
}

function getStyles() {
  return {
    dashboardRoot: {
      backgroundColor: '#FBF6EC',
    },
    dashboardLayout: {
      backgroundColor: ToolBarGreen,
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
