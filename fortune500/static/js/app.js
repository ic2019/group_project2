/**
 * Below is Mythili's stuff
 */

function init() {
  console.log("I am inside init")
  selector = d3.select("#selDataset");
  //e.preventDefault();
  sector = selector.node().value;
  console.log(sector);
  

}

function buildPiePlot() {
  console.log("I am inside buildpie plot")
  var url = "/api/pie";
  d3.json(url).then(function(response) {
    console.log(response)
    var data ={
      labels: [response.Industry],
      values:[response.Revenue_Percent],
      type: "pie"
    };
    var layout = {
      height: 600,
      width: 800
    };
    Plotly.plot("pie", data, layout);
  })
 };

  function buildPiePlot_pp() {
  var url = "/api/pie";
  d3.json(url).then(function(response) {
    console.log(response)
    var data ={
      labels: [response.Industry],
      values:[response.Profit_Percent],
      type: "pie"
    };
    var layout = {
      height: 600,
      width: 800
    };
    Plotly.plot("pie_pp", data, layout);
  })
 };




//buildPiePlot();
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
      width: 600,
      height: 600,
      seriesBarDistance: 10
    };    
    
    new Chartist.Bar("#barchart", data, options)
  })
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
      width: 600,
      height: 600,
      seriesBarDistance: 10
    };    
    
    new Chartist.Bar("#barchart_pr", data, options)
  })
};

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
      // plugins:[
      //   Chartist.plugins.tooltip()
      // ]
    };    
    
    new Chartist.Bar("#barchart_pe", data, options)
  })
};

// Main Program
init();

//buildPiePlot();
//buildPiePlot_pp();
/*
buildbarPlot();
buildbarPlot_pr();
buildbarPlot_pe();
*/

/**'
 * 
 */
    
    
    
    
    