import React from 'react'
import classes from './DummyPageView.scss'
import DashboardToolBar from '../../containers/DashboardToolBar'
import FooterLanding from '../../components/FooterLanding/FooterLanding'

const propTypes = {
}

function DummyPage() {
  return (
    <div>
      <div className={classes.dashboardRoot}>
        <DashboardToolBar />
        <div className={classes.container}>
          <h1>
            Coming soon.
          </h1>
        </div>
      </div>
      <div className={classes.footer}>
        <FooterLanding />
      </div>
    </div>
  )
}

DummyPage.propTypes = propTypes

export default DummyPage
