Chart.defaults.global.defaultFontFamily = 'Helvetica';
Chart.defaults.global.defaultFontColor = '#000000';

function makeChart(data) {


  var dates = data.map(function(d) {return d.date});
  var sleep_hours = data.map(function(d) {return +d.sleep_hours});
  var date_colors = data.map(function(d) {return d.workout === 'Yes' ? '#F50000' : '#3DC01C';});

  var chart = new Chart('chart', {
    type: 'horizontalBar',
    options: {maintainAspectRatio: true,
      legend: {display: false
      },

      scales: {
        xAxes: [{scaleLabel: {
              display: true,
              labelString: 'Hours of Sleep',
              fontSize: 16
              }
        }]
      }
    },

    data: {
      labels: dates,
      datasets: [{
          data: sleep_hours,
          backgroundColor: date_colors
      }]
    }
  })
}

// Request data using D3
d3.csv('https://raw.githubusercontent.com/TheodoreFong/HTML_CSS/master/W209_HW1/HW_1.csv').then(makeChart);
