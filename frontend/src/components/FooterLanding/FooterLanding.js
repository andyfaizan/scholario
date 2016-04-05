import React from 'react'
import classes from './FooterLanding.scss'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

type Props = {

};
export class FooterLanding extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <div className='row'>
          <Row>
          <Col md="1">md-1</Col>
          <Col md="1">md-1</Col>
          <Col md="1">md-1</Col>
          <Col md="1">md-1</Col>
          <Col md="1">md-1</Col>
          <Col md="1">md-1</Col>
          <Col md="1">md-1</Col>
          <Col md="1">md-1</Col>
          <Col md="1">md-1</Col>
          <Col md="1">md-1</Col>
          <Col md="1">md-1</Col>
          <Col md="1">md-1</Col>
        </Row>
          <div className='col-md-3'>
            rohan
          </div>
          <div className='col-md-3'>
            rohan
          </div>
          <div className='col-md-6'>
            <div className={classes.rightContent}>
              <a> dsadsa </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FooterLanding

