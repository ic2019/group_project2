// Create a map object
var myMap = L.map("map", {
   center: [37.09, -95.71], //[15.5994, -28.6731],
   zoom: 6
   // layers: [
   //   lightMap
   // ]
 });
 
 // Adding tile layer
 L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
   maxZoom: 18,
   id: "mapbox.streets-basic",
   accessToken: API_KEY
 }).addTo(myMap);
 
 L.layers = {
   lightMap
 }
 // Adjust the radius based on revenue
 function markerSize(rev) {
   return rev / 5;
 }
 
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
 //path for the  data
 var path = "/map/data"
   
 d3.json(path).then(function(fortune500) {
 //    d3.json(url).then(function(response) {
   console.log(fortune500)
   
     fortune500.forEach(company => {
       console.log(company)
   //    for (var i = 0; i < companies.length)
       L.circle([company.lat, company.long], {
         fillOpacity: 0.75,
         color: "emerald",
         fillColor: visualize(company.rank),
         radius: markerSize(company.revenue)      
       })
       .bindPopup("<h1>" + company.comp + "</h1> <hr> <h3>Rank: " + company.rank + "</h3>" + "<h3>Revenue: " 
       + company.revenue + "</h3>" + "<h3>Employee Count: " + company.emp_cnt)
       .addTo()
       // .addTo(myMap);  
     })
   // }
 });
 //})
 