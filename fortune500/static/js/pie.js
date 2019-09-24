/**
 * Below is Mythili's stuff
 */
var industry = [];
var r_per = [];
var p_per = [];
function init() {
    console.log("I am inside init")
    selector = d3.select("#selDataset1");
    selector.on("change", function() {

       var sector = selector.property("value");

      console.log(sector);
      
      buildPiePlot(sector);
      //buildPiePlot_pp(sector);

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
      var data ={
        labels: [response.Industry],
        values:[response.Revenue_Percent],
        type: "pie"
      };
      var layout = {
        height: 600,
        width: 800
      };
      //Plotly.plot("pie", data, layout);
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


   // Main Program
init();
