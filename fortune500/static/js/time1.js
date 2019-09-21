/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
var stock = [];

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }


  // Submit Button handler
function handleSubmit(e) {

    // Prevent the page from 
    console.log("I am inside handle submit")
    e.preventDefault();
    
    selector = d3.select("#selDataset");
    // Using jQuery getting all the selected items
    var text = $('#selDataset option:selected').toArray().map(item => item.text).join();
    var startDate = d3.select("#startDate").node().value;
    var endDate = d3.select("#endDate").node().value;
    console.log(startDate);
    console.log(endDate);
    console.log(text);

  // Clearing the all the element data from the dropdown from the selection
  $('#form').trigger("reset");
  $("#selDataset option:selected").each(function(){
    $(this).removeAttr("selected");
  });
    var stockList = text.split(',');
    for (var i=0; i < stockList.length; i++) {
        stock.push(stockList[i].split(':')[2].trim());
    }
    
    console.log(stock);
    buildPlot(stock,startDate,endDate);

}
    // Select the input value from the form

  function buildPlot(stock, startDate, endDate) {
      //var apiKey = "YOUR KEY HERE";
      var name =  openingPrices = highPrices = lowPrices = closingPrices = dates = trace = [];

      for (var i=0; i < stock.length; i++) {
        var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock[i]}.json?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
        console.log(url);
           
      d3.json(url).then(function(data) {
        console.log(data);
    
        // Grab values from the response json object to build the plots
        name = data.dataset.name;
        //stock[i] = data.dataset.dataset_code;
        //var startDate = data.dataset.start_date;
        //var endDate = data.dataset.end_date;
        dates = unpack(data.dataset.data, 0);
        openingPrices = unpack(data.dataset.data, 1);
        highPrices = unpack(data.dataset.data, 2);
        lowPrices = unpack(data.dataset.data, 3);
        closingPrices = unpack(data.dataset.data, 4);
        //trace[i] = `trace${i}`
         trace1 = {
          type: "scatter",
          mode: "lines",
          name: name,
          x: dates,
          y: closingPrices,
          line: {
            //color: "#17BECF"
          }
        };
    
        // Candlestick Trace
        var trace2 = {
          type: "candlestick",
          x: dates,
          high: highPrices,
          low: lowPrices,
          open: openingPrices,
          close: closingPrices
        };
    
        var data = [trace1, trace2 ];
    
        var layout = {
          title: `${name} closing prices`,
          xaxis: {
            range: [startDate, endDate],
            type: "date"
          },
          yaxis: {
            autorange: true,
            type: "linear"
          }
        };
    
        Plotly.newPlot("time", data, layout);
      }).catch(function(e) {
        console.error(e);
      });

    }
  }