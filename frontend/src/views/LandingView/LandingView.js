import React from 'react'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import classes from './LandingView.scss'
import Divider from 'material-ui/lib/divider'
import Paper from 'material-ui/lib/paper'

type Props = {

};
export class LandingView extends React.Component {

  render () {
    const style = {
      height: '100',
      width: '100',
      margin: '20',
      textAlign: 'center',
      display: 'inline-block'
    }
    return (
      <div className={classes.landing}>
        <div className='navBar'>
          <NavBarLandingPage />
        </div>
        <div className={classes.container}>

        </div>
        <Divider />
        <div className={classes.footer}>
          <br/>
          <FooterLanding />
        </div>
      </div>
    )
  }
}

export default LandingView
