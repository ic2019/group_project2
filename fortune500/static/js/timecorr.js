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
function handleSubmitPrice(e) {

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
 
    var stockList = text.split(',');
    for (var i=0; i < stockList.length; i++) {
        stock.push(stockList[i].split(':')[1].trim());
    }
    
    console.log(stock);
    if (stock.length == 0) {
      alert("No stocks selected.. Try again")
    }
    buildPlotTime(stock,startDate,endDate);
    // buildPlotTimeCorr(stock[0],stock[1], startDate,endDate)

}

// Submit Button handler for time series chart
function handleSubmitCorr(e) {

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
 
    var stockList = text.split(',');
    for (var i=0; i < stockList.length; i++) {
        stock.push(stockList[i].split(':')[1].trim());
    }
    
    console.log(stock);
    // buildPlotTime(stock,startDate,endDate);
    buildPlotTimeCorr(stock[0],stock[1], startDate,endDate);
    $('#form').trigger("reset");
    $("#selDataset option:selected").each(function(){
      $(this).removeAttr("selected");
    });

}
    // Select the input value from the form

function buildPlotTime(stock, startDate, endDate) {
      //var apiKey = "YOUR KEY HERE";
      var name,  openingPrices, highPrices, lowPrices, closingPrices, dates, trace = [];
      if (stock.length > 2) {
        alert("Max 2 stocks only can be selected !");
      }
      for (var i=0; i < stock.length; i++) {
        
          var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock[i]}.json?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
          console.log(url);
        
       
       var ctr = 1;    
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
        var lgName = name.split(',')[0];
        var lastIndex = lgName.lastIndexOf(" ");
        lgName = lgName.substring(0, lastIndex);
        //trace[i] = `trace${i}`
         trace1 = {
          type: "scatter",
          mode: "lines",
          name: lgName,
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
          title: `${lgName} Closing Prices`,
          xaxis: {
            range: [startDate, endDate],
            type: "date"
          },
          yaxis: {
            autorange: true,
            type: "linear"
          },
          showlegend: true
        };
        if (ctr === 1) {
          console.log("I am plot1");
          Plotly.newPlot("time1", data, layout);
        } else  {
          console.log("Iam plot2");
          Plotly.newPlot("time2", data, layout);
        }
        ctr += 1;
        
      }).catch(function(err) {
        document.getElementById("error").innerHTML = `No data in Quandl for ${stock[i]}. Reset to another stock!`;
        // alert('No data in Quandl. Reset to try another stock!')
      });
      $('#form').trigger("reset");
      $("#selDataset option:selected").each(function(){
      $(this).removeAttr("selected");
    });

    }
  }

  /**
   * Function to reset the form
   */
  function myFunction() {
    /*
    $('#form').trigger("reset");
    $("#selDataset option:selected").each(function(){
      $(this).removeAttr("selected");
    });
    */
    $('#reset').click(function() {
      location.reload();
    });
    
  }

  // Calculate a rolling correlation for two arrays
function rollingCorrelation(arr1, arr2, windowPeriod = 10) {
    // correlation array to return
    var corrs = [];
    for (var i = 0; i < arr1.length - windowPeriod; i++) {
      // windows of data to perform correlation on
      var win1 = [];
      var win2 = [];
      for (var j = 0; j < windowPeriod; j++) {
        win1.push(arr1[i + j]);
        win2.push(arr2[i + j]);
      }
      // calculate correlation between two arrays
      corrs.push(ss.sampleCorrelation(win1, win2));
    }
    return corrs;
  }

  function buildPlotTimeCorr(stock1, stock2, startDate, endDate) {
    //var apiKey = "1x4ve2wzzYxFYBdTJXBT";
    var url1 = `https://www.quandl.com/api/v3/datasets/WIKI/${stock1}.json?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    var url2 = `https://www.quandl.com/api/v3/datasets/WIKI/${stock2}.json?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
  
    d3.json(url1).then(function(response1) {
      
      // if (err1) return console.warn(err1);
  
      d3.json(url2).then(function(response2) {
        // if (err2) return console.warn(err2);
  
        // Grab values from the response json object to build the plots
        var name1 = response1.dataset.name;
        var name2 = response2.dataset.name;
        var stock1 = response1.dataset.dataset_code;
        var stock2 = response2.dataset.dataset_code;
        var dates = unpack(response1.dataset.data, 0);
        var closingPrices1 = unpack(response1.dataset.data, 1);
        var closingPrices2 = unpack(response2.dataset.data, 1);
  
        var period = 10;
        
        var corrs = rollingCorrelation(closingPrices1, closingPrices2, period);
        var trace1 = {
          type: "scatter",
          mode: "lines",
          name: `${name1} vs ${name2}`,
          x: dates.slice(period),
          y: corrs,
          line: {
            color: "#17BECF"
          }
        };
  
        var data = [trace1];
  
        var layout = {
          title: `${stock1} ${stock2} Correlation Plot`,
          xaxis: {
            type: "date"
          },
          yaxis: {
            autorange: true,
            type: "linear"
          }
        };
  
        Plotly.newPlot("time3", data, layout);
  
      }).catch(function(err) {
        document.getElementById("error").innerHTML = `No data in Quandl for ${stock2}. Reset to another stock!`;
        // alert('No data in Quandl. Reset to try another stock!')
      });
  
    }).catch(function(err) {
      document.getElementById("error").innerHTML = `No data in Quandl for ${stock1}. Reset to another stock!`;
      // alert('No data in Quandl. Reset to try another stock!')
    });
  }

