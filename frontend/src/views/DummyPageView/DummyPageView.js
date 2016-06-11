import React from 'react'
import classes from './DummyPageView.scss'
import DashboardToolBar from '../../containers/DashboardToolBar'
import FooterLanding from '../../components/FooterLanding/FooterLanding'

type Props = {
};
export class DummyPage extends React.Component {
  props: Props;

  render () {
    return (
      <div className={classes.dashboardRoot}>
        <DashboardToolBar />
        <h1>
          Coming soon... :)
        </h1>
        <div className={classes.footer}>
         <FooterLanding />
       </div>
      </div>
    )
  }
}

export default DummyPage
