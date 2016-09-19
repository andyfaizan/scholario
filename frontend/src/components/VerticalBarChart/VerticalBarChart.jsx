import React from 'react'
import Radium from 'radium'

import { Bar as BarChart } from 'react-chartjs'

const propTypes = {

}

const sampleData = {
  labels: ['Physics', 'Chemistry', 'Math', 'English', 'Deutsch'],
  datasets: [
    {
      label: 'First Sem Progress',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      // [
      //   'rgba(255, 99, 132, 0.2)',
      //   'rgba(54, 162, 235, 0.2)',
      //   'rgba(255, 206, 86, 0.2)',
      //   'rgba(75, 192, 192, 0.2)',
      //   'rgba(153, 102, 255, 0.2)',
      // ],
      borderColor: 'rgba(255,99,132,1)',
      // [
      //   'rgba(255,99,132,1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      // ],
      borderWidth: 1,
      data: [65, 59, 80, 81, 56],
    },
  ],
}

const options = {
  hover: {
    mode: 'label',
  },
}

function VerticalBarChart() {
  const styles = getStyles()

  return (
    <div>
      <div style={styles.graphContainer}>
        <BarChart
          data={sampleData}
          width="330"
          height="300"
          options={options}
        />
      </div>
    </div>
  )
}

function getStyles() {
  return {
    graphContainer: {
      border: '1px solid white',
      padding: '15px',
    },
  }
}

VerticalBarChart.propTypes = propTypes

export default Radium(VerticalBarChart)
