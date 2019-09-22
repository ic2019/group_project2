function buildPiePlot() {
    ​
        var url = "/pie";
      
        d3.json(url).then(function(response) {
      
          console.log(response)
      
          var data ={
            labels: [response.industry],
            values:[response.revenue],
            type: "pie"
          };
      
          var layout = {
            height: 600,
            width: 800
          };    
          
          Plotly.plot("pie", data, layout);
        })
      };

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

console.log("I am inside app.js")
buildbarPlot();

buildPiePlot();
    
    
    
    
    