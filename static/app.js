function buildPlot() {

  var url = "/data";

  d3.json(url).then(function(response) {

    console.log(response)

    var data ={
      labels: [response.ticks],
      series:[response.revenue]
    };

    var options = {
      width: 500,
      height: 500
    };    
    
    new Chartist.Bar("#chart2", data, options)
  })
};

buildPlot();