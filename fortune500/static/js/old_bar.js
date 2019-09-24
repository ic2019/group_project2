/**
 * Below is Satheesh's stuff
 */
function buildbarPlot() {
  console.log("I am inside buildbarPlot");


  var url = "/api/bar";

  d3.json(url).then(function(response) {

    var data ={
      labels: response.ticks,
      series:[
              response.revenue,
              response.profit
            ]
    };

    var options = {
      width: 500,
      height: 500,
      seriesBarDistance: 10,
    };    
    
    new Chartist.Bar("#barchart", data, options);
  });
};


function buildbarPlot_pr() {

  var url = "/api/bar";

  d3.json(url).then(function(response) {

    var data ={
      labels: response.ticks,
      series: [response.profitmgn]
    };
    console.log(data)
    var options = {
      width: 500,
      height: 500,
      seriesBarDistance: 10
    };    
    
    new Chartist.Bar("#barchart_pr", data, options)
  })
};

/*
function buildbarPlot_pe() {

  var url = "/api/bar";

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
    };    
    
    new Chartist.Bar("#barchart_pe", data, options)
  })
};
*/

// Main Program
//init();

//buildPiePlot();
//buildPiePlot_pp();

buildbarPlot();
buildbarPlot_pr();
buildbarPlot_pe();



    
    
    
    