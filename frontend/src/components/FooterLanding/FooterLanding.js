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
    return (
      <div>
        <a href={impressumLink}>
          Impressum
        </a>
      </div>
    )
  }
}

export default FooterLanding
