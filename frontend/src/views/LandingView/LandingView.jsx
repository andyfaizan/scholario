import React from 'react'
import Radium from 'radium'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import BonnRhein from './MainPicture@3x.png'

const propTypes = {

}

function LandingView() {
  const styles = getStyles()

  return (
    <div>
      <div style={styles.landing}>
        <div>
          <NavBarLandingPage />
        </div>
        <div style={styles.container}>
          <img
            style={styles.dash}
            src={BonnRhein}
            alt="No Net."
          />
          <FlatButton
            backgroundColor='#3557A4'
            label="Demo anfordern"
            style={styles.demoButton}
            labelStyle={styles.demoButtonLabelStyle}
          />
        </div>
        <div style={styles.courseErstellen}>
          Kurse erstellen
        </div>
        <div style={styles.onlineCourseImage}>
          dasdsadsa
        </div>
        <div style={styles.courseErleben}>
          Kurse erleben
        </div>
        <div style={styles.onlineCourseLernenImage}>
          dsadsasad
        </div>
        <div style={styles.comingSoon}>
          Coming Soon
        </div>
        <div style={styles.addContactForm}>
          dsada
        </div>
        <Divider />
      </div>
      <div style={styles.footer}>
        <FooterLanding />
      </div>
    </div>
  )
}

function getStyles() {
  return {
    landing: {
      backgroundColor: '#FBF6EC',
    },
    container: {
      fontWeight: 'bold',
      backgroundColor: '#FBF6EC',
      height: '87%',
      backgroundSize: 'cover', /* for IE9+, Safari 4.1+, Chrome 3.0+, Firefox 3.6+ */
      WebkitBackgroundSize: 'cover', /* for Safari 3.0 - 4.0 , Chrome 1.0 - 3.0 */
      MozBackgroundSize: 'cover', /* optional for Firefox 3.6 */
      OBackgroundSize: 'cover', /* for Opera 9.5 */
      margin: 0, /* to remove the default white margin of body */
      padding: 0, /* to remove the default white margin of body */
      overflow: 'hidden',
    },
    footer: {
      fontSize: '20px',
      backgroundColor: '#FBF6EC',
      color: '#FFFFFF',
      height: '10%',
    },
    dash: {
      display: 'block',
      width: '100%',
    },
    a: {
      ':link': {
        backgroundColor: 'rebeccapurple',
      },
    },
    courseErstellen: {
      backgroundColor: '#3557A4',
      color: 'white',
    },
    onlineCourseImage: {
      backgroundColor: '#F9F9F9',
    },
    courseErleben: {
      backgroundColor: '#3557A4',
      color: 'white',
    },
    onlineCourseLernenImage: {
      backgroundColor: '#F9F9F9',
    },
    comingSoon: {
      backgroundColor: '#3557A4',
      color: 'white',
    },
    addContactForm: {
      backgroundColor: '#F9F9F9',
    },
    style: {
      height: '100px',
      width: '100px',
      margin: '20px',
      textAlign: 'center',
      display: 'inline-block',
    },
    demoButton: {
      position: 'absolute',
      marginLeft: '43%',
      marginTop: '-17%',
      marginRight: 'auto',
      marginBottom: 'auto',
    },
    demoButtonLabelStyle: {
      color: 'white',
    },
  }
}

LandingView.propTypes = propTypes

export default Radium(LandingView)
