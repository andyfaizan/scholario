import React, { PropTypes } from 'react'
import '../../styles/dashboard.scss'

import DashboardToolBar from '../../containers/DashboardToolBar'
import FooterLanding from '../../components/FooterLanding/FooterLanding'

function Dashboard({ children }) {
  return (
    <div className="dashboard-layout">
      <DashboardToolBar />
        {children}
      <FooterLanding />
    </div>
  )
}

Dashboard.propTypes = {
  children: PropTypes.element,
}

export default Dashboard
