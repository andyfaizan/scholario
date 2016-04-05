import React from 'react'
import classes from './FooterLanding.scss'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

type Props = {

};
export class FooterLanding extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} md={8}>Home</Col>
            <Col xs={6} md={2}>Home</Col>
            <Col xs={6} md={2}>Home</Col>
          </Row>
          <Row className='show-grid'>
            <Col xs={12} md={8}>Home</Col>
            <Col xs={6} md={2}>Home</Col>
            <Col xs={6} md={2}>Home</Col>
          </Row>
          <Row className='show-grid'>
            <Col xs={12} md={8}>Home</Col>
            <Col xs={6} md={2}>Home</Col>
            <Col xs={6} md={2}>Home</Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default FooterLanding

