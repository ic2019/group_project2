/*
//Create a map object
var myMap = L.map("map-id", {
  center: [37.09, -95.71],
  zoom: 5
});

console.log(API_KEY)
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);
/*
// Define a markerSize function that will give each city a different radius based on its population
function markerSize(population) {
  return population / 40;
}

// Each city object contains the city's name, location and population

//path for the csv data
var path = "/api/map";
// Loop through the cities array and create one marker for each city object
d3.json(path).then(data => {
    console.log("I am inside logic.js");
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
        L.circle([data[i].long, data[i].lat], {
          fillOpacity: 0.75,
          color: "white",
          fillColor: "purple",
          // Setting our circle's radius equal to the output of our markerSize function
          // This will make our marker's size proportionate to its population
          radius: markerSize(data[i].revenue)
        }).bindPopup("<h1>" + data[i].title + "</h1> <hr> <h3>Employees: </h3>").addTo(myMap);
      }

});
*/

// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
console.log('I am inside logic.js');
var myMap = L.map("map-id").setView([45.52, -122.67], 8);


// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map

var layer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});
myMap.addLayer(layer);

