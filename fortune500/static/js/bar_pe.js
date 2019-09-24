
// Bar plot per employee

function buildbarPlot_pe() {

    var url = "/api/bar";
  
    d3.json(url).then(function(response) {
  
      // console.log(response)
  
      new Chart(document.getElementById("barchart_pe"), {
        type: 'horizontalBar',
        data: {
          labels: response.ticks,
          datasets: [
            {
              label: "Revenue/Employee",
              backgroundColor: "red",
              data: response.revenue_pe
            },
            {
                label: "Profit/Employee",
                backgroundColor: "coral",
                data: response.profit_pe
              }
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                  var label = data.datasets[tooltipItem.datasetIndex].label || '';

                  if (label) {
                      label += ': ';
                  }
                  //label += Math.round(tooltipItem.yLabel * 100) / 100;
                  label += Math.round(tooltipItem.xLabel,2);
                  return label;
              }
          }

          },
          legend: { display: true },
          title: {
            display: true,
            text: 'Revenue, Profit Per Employee in $M'
          }
        }
    });

    });


  };

  buildbarPlot_pe();