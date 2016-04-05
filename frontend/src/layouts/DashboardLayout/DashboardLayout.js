import React, { PropTypes } from 'react'
import '../../styles/dashboard.scss'

function Dashboard ({ children }) {
  return (
    <div className='dashboard-layout'>
      {children}
    </div>
  )
}

Dashboard.propTypes = {
  children: PropTypes.element
}

export default Dashboard
