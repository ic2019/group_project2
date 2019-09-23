function buildbarPlot() {

  var url = "/fortune_api";

  d3.json(url).then(function(response) {

    var data ={
      labels: response.ticks,
      series:[
              response.revenue,
              response.profit
            ]
    };

    var options = {
      width: 600,
      height: 600,
      seriesBarDistance: 10
    };    
    
    new Chartist.Bar("#barchart", data, options)
  })
};

function buildbarPlot_pr() {

  var url = "/fortune_api";

  d3.json(url).then(function(response) {

    var data ={
      labels: response.ticks,
      series: [response.profitmgn]
    };
    console.log(data)
    var options = {
      width: 600,
      height: 600,
      seriesBarDistance: 10
    };    
    
    new Chartist.Bar("#barchart_pr", data, options)
  })
};

function buildbarPlot_pe() {

  var url = "/fortune_api";

  d3.json(url).then(function(response) {

    // console.log(response)

    var data ={
      labels: response.ticks,
      series:[
              response.revenue_pe,
              response.profit_pe
            ]
    };

    var options = {
      width: 600,
      height: 600,
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true
      // plugins:[
      //   Chartist.plugins.tooltip()
      // ]
    };    
    
    new Chartist.Bar("#barchart_pe", data, options)
  })
};

buildbarPlot();
buildbarPlot_pr();
buildbarPlot_pe();