import React from 'react'
import Radium from 'radium'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import Divider from 'material-ui/Divider'
import BonnRhein from './Main.png'

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
      '-webkitBackgroundSize': 'cover', /* for Safari 3.0 - 4.0 , Chrome 1.0 - 3.0 */
      '-mozBackgroundSize': 'cover', /* optional for Firefox 3.6 */
      '-oBackgroundSize': 'cover', /* for Opera 9.5 */
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
  }
}

LandingView.propTypes = propTypes

export default Radium(LandingView)
