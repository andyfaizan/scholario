import React from 'react'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import SetForgotPasswordForm from '../../forms/SetForgotPasswordForm/SetForgotPasswordForm'
import classes from './LandingView.scss'
import Divider from 'material-ui/Divider'
import BonnRhein from './Main.png'

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
      <div>
      <div className={classes.landing}>
        <div>
          <NavBarLandingPage />
        </div>
         <div className={classes.container}>
           <img className={classes.dash}
              src={BonnRhein}
              alt='No Net.' />

        </div>
        <div className={classes.courseErstellen}>
         Kurse erstellen
        </div>  
        <div className={classes.onlineCourseImage}>
        dasdsadsa
        </div>
        <div className={classes.courseErleben}>
        Kurse erleben
        </div>
        <div className={classes.onlineCourseLernenImage}>
        dsadsasad
        </div>
        <div className={classes.comingSoon}>
        Coming Soon
        </div>
        <div className={classes.addContactForm}>
        dsada
        </div>
        <Divider />
      </div>
      <div className={classes.footer}>
          <FooterLanding />
      </div>
      </div>
    )
  }
}

export default LandingView
