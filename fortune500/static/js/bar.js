/**
 * Below is Satheesh's stuff
 */


function buildbarPlot() {
  console.log("I am inside buildbarPlot");


  var url = "/api/bar";

  d3.json(url).then(function(response) {

    new Chart(document.getElementById("barchart"), {
      type: 'bar',
      data: {
        labels: response.ticks,
        datasets: [
          {
            label: "Revenues M$",
            backgroundColor: "#3e95cd",
            data: response.revenue
          }, {
            label: "Profits M$",
            backgroundColor: "#8e5ea2",
            data: response.profit
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Revenues, Profits Analysis - Top 10 Fortune500'
        },
        legend: { display: true },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                    label += ': ';
                }
                //label += Math.round(tooltipItem.yLabel * 100) / 100;
                label += Math.round(tooltipItem.yLabel,2);
                return label;
            }
        }

        },
      }
  });

  });
};



function buildbarPlot_pr() {

  var url = "/api/bar";

  d3.json(url).then(function(response) {
      var total = 10;

      new Chart(document.getElementById("barchart_pr"), {
      type: 'polarArea',
      data: {
        labels: response.ticks,
        datasets: [
          {
            label: "Profit Margin",
            backgroundColor: ['#E6E6FA', '#D8BFD8', '#DDA0DD', '#DA70D6', '#EE82EE', '#FF00FF', '#FF00FF', '	#BA55D3' , '#9932CC', '#9400D3'],
            data: response.profitmgn
          }
        ]
      },
      legend: { display: true },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                    label += ': ';
                }
                label += Math.round(tooltipItem.yLabel,2);
                return label;
            }
        }

        },
  });
  });


};


// Main Program

buildbarPlot();
buildbarPlot_pr();




    
    
    
    