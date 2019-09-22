
// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71], //[15.5994, -28.6731],
  zoom: 6
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Adjust the radius based on revenue
function markerSize(rev) {
  return rev / 5;
}

//
function visualize(rank) {
  if (rank < 50) {
    color = "teal"
  }
  else if (rank < 100) {
    color = "peach"
  }
  else if (rank < 150) {
    color = "yellow"
  }
  else if (rank < 200) {
    color = "limegreen"
  }
  else if (rank < 250) {
    color = "red"
  }
  else if (rank < 300) {
    color = "mint"
  }
  else if (rank < 350) {
    color = "purple"
  }
  else if (rank < 400) {
    color = "orange"
  }
  else if (rank < 450) {
    color = "burgundy"
  }
  else if (rank < 500) {
    color = "black"
  }

  return color
}
//path for the csv data
var path = "/fortune_api_500"


function genCircle(companies) {
  console.log(companies);
//   companies.forEach(company => {
// //    console.log(company);
  // for (var i = 0; i < companies.length)
  //   L.circle([company.lati, company.longi], {
  //     fillOpacity: 0.75,
  //     color: "emerald",
  //     fillColor: visualize(company.ranks),
  //     radius: markerSize(company.revenues)      
  //   })
  //   .bindPopup("<h1>" + company.titles + "</h1> <hr> <h3>Rank: " + company.ranks + "</h3>" + "<h3>Revenue: " 
  //   + company.revenues + "</h3>" + "<h3>Employee Count: " + company.employee)
  //   .addTo(myMap);  
  // })
}


d3.json(path).then(function(fortune500) {
//  d3.json(url).then(function(response) {
  //console.log(fortune500)
  
  var portfo = {
    titles: fortune500.comp,
    ranks: fortune500.rank,
    revenues: fortune500.revenue_pe,
    employee: fortune500.emp_cnt,
    lati: fortune500.lat,
    longi: fortune500.long,
    sect: fortune500.sector 
  }
  genCircle(portfo)


  // foreach (var i = 0; i < portfo.length; i++) {
  //   var company = portfo;
  //   //var color = "";
  //   console.log("Count is ", company.length)
  //   var location = [company.lati[i], company.longi[i]];

  //   //creating the circles
  //   L.circle(location, {
  //     fillOpacity: 0.75,
  //     color: "emerald",
  //     fillColor: visualize(company.ranks[i]),
  //     //created a function that would return the points, multiplied for visibility
  //     radius: markerSize(company.revenues[i])
  //   })
  //   .bindPopup("<h1>" + company.titles[i] + "</h1> <hr> <h3>Rank: " + company.ranks[i] + "</h3>" + "<h3>Revenue: " 
  //   + company.revenues[i] + "</h3>" + "<h3>Employee Count: " + company.employee[i])
  //   .addTo(myMap);
  // }
});


// foreach (var i = 0; i < portfo.length; i++) {
//   var company = portfo;
//   //var color = "";
//   console.log("Count is ", company.length)
//   var location = [company.lati[i], company.longi[i]];

//   //creating the circles
//   L.circle(location, {
//     fillOpacity: 0.75,
//     color: "emerald",
//     fillColor: visualize(company.ranks[i]),
//     //created a function that would return the points, multiplied for visibility
//     radius: markerSize(company.revenues[i])
//   })
//   .bindPopup("<h1>" + company.titles[i] + "</h1> <hr> <h3>Rank: " + company.ranks[i] + "</h3>" + "<h3>Revenue: " 
//   + company.revenues[i] + "</h3>" + "<h3>Employee Count: " + company.employee[i])
//   .addTo(myMap);
// }