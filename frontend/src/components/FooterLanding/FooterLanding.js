import React from 'react'
import classes from './FooterLanding.scss'
import { Router, Route, Link } from 'react-router'
import ImpressumView from '../../views/ImpressumView'

type Props = {

};
export class FooterLanding extends React.Component {
  props: Props;

  render () {
    const impressumLink = '/impressum'
    const linkStyle={
      backgroundColor: 'white',
      marginLeft: 20
    }
    return (
      <div>
        <a href={impressumLink} style={linkStyle}>
          Impressum
        </a>
      </div>
    )
  }
}

export default FooterLanding
