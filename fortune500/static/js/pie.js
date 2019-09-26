var industry = [];
var r_per = [];
var p_per = [];

/**
 * Function to get selected sector and invoke functions to draw pie charts
 */
function init() {
    console.log("I am inside init")
    selector = d3.select("#selDataset1");
    selector.on("change", function() {

       var sector = selector.property("value");

      console.log(sector);
      
      buildPiePlot(sector);
      buildPiePlot_pp(sector);

    });

  
  
  }
  
  function buildPiePlot(sector) {
    console.log("I am inside buildpie plot")
    var url = "/api/pie";
    d3.json(url).then(function(response) {
      
      for (var i=0; i < response.length; i++) {
        if (response[i].Sector == sector) {
          industry.push(response[i].Industry)
          r_per.push(response[i].Revenue_Percent)
          p_per.push(response[i].Profit_Percent)

        }
        

      }
      console.log(industry);
      console.log(r_per);
      console.log(p_per);
      var trace1 = [
        {
          labels: industry,
          values: r_per,
          hoverinfo: "hovertext",
          type: "pie"
      }
    ];

    var layout = {
      margin: { 
        t: 0,
        l: 0 ,
       height: 600,
      width: 800},
      showlegend: false
      
    };
      Plotly.plot("pie", trace1, layout);
    });
   }
  
    function buildPiePlot_pp(sector) {
    var url = "/api/pie";
    d3.json(url).then(function(response) {
      console.log(response)
      
      for (var i=0; i < response.length; i++) {
        if (response[i].Sector == sector) {
          industry.push(response[i].Industry)
          p_per.push(response[i].Profit_Percent)
        }
      }
      
      var trace2 = [
        {
          labels: industry,
          values: p_per,
          hoverinfo: "hovertext",
          type: "pie"
      }
    ];
      var layout = {
        margin: { 
          t: 0,
          l: 0 ,
         height: 600,
        width: 800} ,
        showlegend: false
      }; 
      
      Plotly.plot("pie_pp", trace2, layout);
    });
   }

   // Main Program
init();