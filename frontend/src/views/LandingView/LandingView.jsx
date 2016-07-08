import React from 'react'
import Radium from 'radium'
import NavBarLandingPage from '../../containers/NavBarLandingPage'
import FooterLanding from '../../components/FooterLanding/FooterLanding'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import BonnRhein from './MainPicture@3x.png'
import CreateIcon from './CreateIconx1.png'
import Chat from './Chat.png'
import Group from './Group.png'
import Cloud from './Cloud.png'
import Analytics from './Analytics.png'
import Success from './Success.png'
import UserProfile from './UserProfile.png'
import Video from './Video.png'

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
            backgroundColor="#3557A4"
            label="Demo anfordern"
            style={styles.demoButton}
            labelStyle={styles.demoButtonLabelStyle}
          />
        </div>
        <div style={styles.courseErstellen}>
          <Grid>
            <Row>
              <Col xs={8} md={4}>
                <img
                  src={CreateIcon}
                  alt="No Net."
                />
              </Col>
              <Col xs={8} md={4}>
                <img
                  src={Chat}
                  alt="No Net."
                />
                <img
                  src={Group}
                  alt="No Net."
                />
              </Col>
              <Col xs={8} md={4}>
                <img
                  src={Cloud}
                  alt="No Net."
                />
              </Col>
            </Row>
          </Grid>
          <Grid>
            <Row>
              <Col xs={8} md={4}>
               Rohan
              </Col>
              <Col xs={8} md={4}>
                Ali
              </Col>
              <Col xs={8} md={4}>
                Asmat
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
              Gerne beantworten wir Ihre Fragen personlich
            </p>
            <TextField
              hintText="Name"
              style={styles.textFieldName}
            />
            <TextField
              hintText="Telefon"
            />
            <FlatButton
              backgroundColor="#3557A4"
              label="Abschicken"
              labelStyle={styles.demoButtonLabelStyle}
            />
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
      backgroundColor: '#F9F9F9',
      color: '#3557A4',
      padding: '30px',
    },
    onlineCourseImage: {
      backgroundColor: '#F9F9F9',
    },
    courseErleben: {
      backgroundColor: '#3557A4',
      color: 'white',
      padding: '30px',
      fontFamily: 'Open Sans',
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
    centerGridElement: {
      width: '50%',
      margin: '0 auto',
    },
    headingAddContactForm: {
      textAlign: 'center',
      padding: '30px',
      color: '#3557A4',
      fontFamily: 'Open Sans',
      fontSize: 'x-large',
    },
    footnoteAddContactForm: {
      textAlign: 'center',
      padding: '30px',
      color: '#3557A4',
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
    textFieldName: {
      marginLeft: '25%',
      marginRight: '3%',
    },
  }
}

LandingView.propTypes = propTypes

export default Radium(LandingView)
