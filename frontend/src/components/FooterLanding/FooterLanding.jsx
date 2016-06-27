import React from 'react'
import classes from './FooterLanding.scss'
import { Link } from 'react-router'

function FooterLanding() {
  const impressumLink = '/impressum'

  const linkStyle = {
    backgroundColor: '#26A65B',
    color: 'white',
    align: 'center',
  }

  return (
    <div className={classes.rightContent}>
      <br />
      <Link to={impressumLink} style={linkStyle}>
        Impressum
      </Link>
    </div>
  )
}

export default FooterLanding
