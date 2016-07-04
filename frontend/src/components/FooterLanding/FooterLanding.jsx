import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'


const propTypes = {
}

function FooterLanding() {
  const styles = getStyles()

  const impressumLink = '/impressum'

  const linkStyle = {
    backgroundColor: '#26A65B',
    color: 'white',
    align: 'center',
  }

  return (
    <div style={styles.rightContent}>
      <br />
      <Link to={impressumLink} style={linkStyle}>
        Impressum
      </Link>
    </div>
  )
}

function getStyles() {
  return {
    rightContent: {
      textAlign: 'center',
      backgroundColor: '#26A65B',
      minHeight: '80px',
    },
  }
}

FooterLanding.propTypes = propTypes

export default Radium(FooterLanding)
