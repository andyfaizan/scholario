import React from 'react'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import SetForgotPasswordForm from '../../forms/SetForgotPasswordForm/SetForgotPasswordForm'
import classes from './ForgotPasswordView.scss'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

type Props = {

};

export class ForgotPasswordView extends React.Component {
  props: Props;


  render () {

  	const pathForgotPass = '/forgetPassword' ;
    const pathResetPass = '/resetPassword';
    var displayCard

  	if (this.props.location.pathname === pathForgotPass) {

  		displayCard = <ForgotPassword />

  	}else if(this.props.location.pathname === pathCourses){

  		displayCard = <SetForgotPasswordForm />

  	}else{
  		console.log('Invalid pathname')
  		displayCard =null
  	}

    return (
      <div>
      	<div className={classes.landing}>
        <div>
          <NavBarLandingPage />
        </div>
         <div className={classes.container}>
          
          {displayCard} 
          
        </div>
        <Divider />
      </div>
      <div>
        </div>
      <div className={classes.footer}>
          <FooterLanding />
      </div>
      </div>
    )
  }
}

export default ForgotPasswordView
