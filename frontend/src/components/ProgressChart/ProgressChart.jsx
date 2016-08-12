import React from 'react'

import { Line as LineChart } from 'react-chartjs'

// type Props = {

// };

const options = {
  scaleShowGridLines: true,
  scaleGridLineColor: 'rgba(0,0,0,.05)',
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend">\
                  <% for (var i=0; i<datasets.length; i++){%><li>\
                    <span style="background-color:<%=datasets[i].strokeColor%>">\
                    </span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
}

const graphStyle = {
  graphContainer: {
    border: '1px solid white',
    padding: '15px',
  },
}

function ProgressChart() {
  const data = chartData()

  return (
    <div>
      <div style={graphStyle.graphContainer}>
        <LineChart
          data={data}
          options={options}
          width="330" height="250"
        />
      </div>
    </div>
    )
}

function chartData() {
  return {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'My First dataset',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 80, 81, 56],
      },
      {
        label: 'My Second dataset',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [28, 48, 40, 19, 86],
      },
    ],
  }
}

export default ProgressChart

