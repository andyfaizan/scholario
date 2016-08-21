import React, { PropTypes } from 'react'
import Radium from 'radium'

import List from 'material-ui/List/List'
import Card from 'material-ui/Card/Card'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import Stat from '../Stat/Stat'

const propTypes = {
  statsList: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  totalAmount: PropTypes.number,
}

const defaultProps = {
  statsList: [],
  title: '',
  totalAmount: 0,
}

function StatsBox({ statsList, title, totalAmount }) {
  const styles = getStyles()

  return (
    <div style={styles.container}>
      <Card>
        <List>
          <Subheader style={styles.subheader}>
            <h4>{title} ({totalAmount})</h4>
          </Subheader>
          <Divider />
          {statsList.map((stat) => <Stat amount={stat.amount} content={stat.content} />)}
        </List>
      </Card>
    </div>
  )
}

function getStyles() {
  return {
    container: {

    },
    subheader: {
      color: '#26A65B',
      paddingTop: '5px',
    },
  }
}

StatsBox.propTypes = propTypes
StatsBox.defaultProps = defaultProps

export default Radium(StatsBox)
