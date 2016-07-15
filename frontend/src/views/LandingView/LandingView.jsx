import React from 'react'
import Radium from 'radium'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import FooterLanding from '../../components/FooterLanding/FooterLanding'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import SendContactForm from '../../forms/SendContactForm/SendContactForm'
import { ScholarioBlue, GreyBackground, White } from '../../styles/colors'

import BonnRhein from './MainPicture@3x.png'
import CreateIcon from './CreateIconx1.png'
import Group from './Group.png'
import Cloud from './Cloud.png'
import Analytics from './Analytics.png'
import Success from './Success.png'
import UserProfile from './UserProfile.png'
import Video from './Video.png'
import Xing from './xing.png'
import Linkedin from './linkedin.png'
import MailFlat from './mailFlat.png'
import Christoph from './christoph.jpg'

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
            backgroundColor={ScholarioBlue}
            label="Demo anfordern"
            style={styles.demoButton}
            labelStyle={styles.demoButtonLabelStyle}
          />
        </div>
        <div style={styles.courseErstellen}>
          <Grid>
            <Row>
              <Col xs={8} md={4}>
                <div style={styles.courseErlebenImageStyle}>
                  <img
                    src={CreateIcon}
                    alt="No Net."
                  />
                </div>
              </Col>
              <Col xs={8} md={4}>
                <div style={styles.courseErlebenImageStyle}>
                  <img
                    src={Group}
                    alt="No Net."
                  />
                </div>
              </Col>
              <Col xs={8} md={4}>
                <div style={styles.courseErlebenImageStyle}>
                  <img
                    src={Cloud}
                    alt="No Net."
                  />
                </div>
              </Col>
            </Row>
          </Grid>
          <Grid>
            <Row>
              <Col xs={8} md={4}>
                <p style={styles.courseErlebenPrimaryTextStyle}>
                  Kurse Erstellen
                </p>
                <p style={styles.courseErlebenSecondaryTextStyle}>
                  Sie wollen ihren Kurs online anbieten?
                  <br />
                  Bauen Sie mit Scholario einen Kurs ganz
                  nach Ihren Wünschen auf.
                </p>
              </Col>
              <Col xs={8} md={4}>
                <p style={styles.courseErlebenPrimaryTextStyle}>
                  Teilnehmer einbinden
                </p>
                <p style={styles.courseErlebenSecondaryTextStyle}>
                  Sie wünschen sich mehr Interaktion und Feedback?
                  Nutzen Sie Onlineaufgaben und Fragenfeed um
                  mehr Teilnehmer zu erreichen.
                </p>
              </Col>
              <Col xs={8} md={4}>
                <p style={styles.courseErlebenPrimaryTextStyle}>
                  Materialien teilen
                </p>
                <p style={styles.courseErlebenSecondaryTextStyle}>
                  Ihre Materialien sind so gut, dass Sie diese
                  veröffentlichen möchten? Profitieren Sie
                  von unserem Netzwerk.
                </p>
              </Col>
            </Row>
          </Grid>
        </div>
        <div style={styles.courseErleben}>
          <p style={styles.headingCourseErleben}>
              DARAN ARBEITEN WIR...
          </p>
          <Grid>
            <Row>
              <Col xs={6} md={3}>
                <img
                  src={Analytics}
                  alt="No Net."
                />
                <p>
                  Lernfortschritt verfolgen...
                </p>
              </Col>
              <Col xs={6} md={3}>
                <img
                  src={Success}
                  alt="No Net."
                  style={styles.userProfileStyle}
                />
                <p>
                  Interaktiv tests erstellen...
                </p>
              </Col>
              <Col xs={6} md={3}>
                <img
                  src={Video}
                  alt="No Net."
                />
                <p>
                  Live streaming und hangout...
                </p>
              </Col>
              <Col xs={6} md={3}>
                <img
                  src={UserProfile}
                  alt="No Net."
                  style={styles.analyticsStyle}
                />
                <p>
                  Netzwerkprofile...
                </p>
              </Col>
            </Row>
          </Grid>
        </div>
        <div style={styles.addContactForm}>
          <div>
            <p style={styles.headingAddContactForm}>
              Gerne beantworten wir Ihre Fragen persönlich
            </p>
            <TextField
              floatingLabelText="Name"
              style={styles.textFieldName}
              floatingLabelStyle={styles.floatingLabel}
              underlineFocusStyle={styles.underlineColor}
            />
            <TextField
              floatingLabelText="Telefon"
              style={styles.textFieldTelefon}
              floatingLabelStyle={styles.floatingLabel}
              underlineFocusStyle={styles.underlineColor}
            />
            <FlatButton
              backgroundColor={ScholarioBlue}
              label="Abschicken"
              labelStyle={styles.demoButtonLabelStyle}
            />
            <SendContactForm />
            <br /><br /><br />
            <div style={styles.profilePic} >
              <a href="https://www.facebook.com/cwalpert">
                <Avatar
                  src={Christoph}
                  size={100}
                  style={styles.avatarStyle}
                />
              </a>
              <a href="#">
                <Avatar
                  src={Xing}
                  size={100}
                  style={styles.avatarStyle}
                />
              </a>
              <a href="#">
                <Avatar
                  src={Linkedin}
                  size={100}
                  style={styles.avatarStyle}
                />
              </a>
              <a href="#">
                <Avatar
                  src={MailFlat}
                  size={100}
                  style={styles.avatarStyle}
                />
              </a>
            </div>
            <p style={styles.footnoteAddContactForm}>
              Christoph Walpert - Initiator
            </p>
          </div>
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
      backgroundColor: GreyBackground,
    },
    container: {
      fontWeight: 'bold',
      backgroundColor: GreyBackground,
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
      color: White,
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
      backgroundColor: GreyBackground,
      color: ScholarioBlue,
      padding: '40px',
    },
    courseErlebenImageStyle: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '6em',
    },
    courseErlebenPrimaryTextStyle: {
      textAlign: 'center',
      color: '#446CB3',
      padding: '10px',
      fontFamily: 'Open Sans',
      fontSize: 'x-large',
      marginLeft: '30px',
    },
    courseErlebenSecondaryTextStyle: {
      textAlign: 'center',
      color: '#446CB3',
      padding: '10px',
      fontFamily: 'Open Sans',
      fontSize: 'large',
      marginLeft: '30px',
    },
    onlineCourseImage: {
      backgroundColor: GreyBackground,
    },
    courseErleben: {
      backgroundColor: ScholarioBlue,
      color: 'white',
      padding: '30px',
      fontFamily: 'Open Sans',
    },
    addContactForm: {
      backgroundColor: GreyBackground,
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
    centerGridElement: {
      width: '50%',
      margin: '0 auto',
    },
    headingAddContactForm: {
      textAlign: 'center',
      padding: '30px',
      color: ScholarioBlue,
      fontFamily: 'Open Sans',
      fontSize: 'x-large',
    },
    footnoteAddContactForm: {
      textAlign: 'center',
      padding: '30px',
      color: ScholarioBlue,
      fontFamily: 'Open Sans',
      fontSize: 'large',
    },
    headingCourseErleben: {
      textAlign: 'center',
      padding: '30px',
      color: 'white',
      fontFamily: 'Open Sans',
      fontSize: 'x-large',
    },
    analyticsStyle: {
      marginTop: '50%',
    },
    userProfileStyle: {
      marginTop: '50%',
    },
    profilePic: {
      marginLeft: '30%',
      marginRight: '3%',
    },
    avatarStyle: {
      marginRight: '5%',
    },
  }
}

LandingView.propTypes = propTypes

export default Radium(LandingView)
