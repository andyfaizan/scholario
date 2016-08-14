import React, { PropTypes } from 'react'
import Radium from 'radium'

import List from 'material-ui/List/List'
import Card from 'material-ui/Card/Card'
import Subheader from 'material-ui/Subheader'

import Stat from '../Stat/Stat'

const propTypes = {
  statsList: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  totalAmount: PropTypes.number,
}

const defaultProps = {
  statsList: [
    {
      amount: '5',
      content: 'What is GDP?',
    },
    {
      amount: '7',
      content: 'Explain Bayes Theorem',
    },
    {
      amount: '11',
      content: 'Game theory discussion',
    },
  ],
  title: 'Top Answers',
  totalAmount: 55,
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
      paddingTop: '10px',
    },
  }
}

StatsBox.propTypes = propTypes
StatsBox.defaultProps = defaultProps

export default Radium(StatsBox)
