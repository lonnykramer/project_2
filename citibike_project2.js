// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  PM10: new L.LayerGroup(),
  PM25: new L.LayerGroup(),
  CO: new L.LayerGroup(),
  NO2: new L.LayerGroup(),
  O3: new L.LayerGroup(),
  BC: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [
    layers.PM10,
    layers.PM25,
    layers.CO,
    layers.NO2,
    layers.O3,
    layers.BC
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "PM10": layers.PM10,
  "PM25": layers.PM25,
  "CO": layers.CO,
  "NO2": layers.NO2,
  "O3": layers.O3,
  "BC": layers.BC
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map); // i don't want baselayer to be selectable

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function () {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  PM10: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  PM25: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  O3: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  CO: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  NO2: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  BC: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "triangle"
  })
};

// Perform an API call to the Citi Bike Station Information endpoint
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", function (infoRes) {

  // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json", function (statusRes) {
    var updatedAt = infoRes.last_updated;
    var stationStatus = statusRes.data.stations; // array of stations
    var stationInfo = infoRes.data.stations; // array of stations

    // Create an object to keep of the number of markers in each layer
    var stationCount = {
      PM10: 0,
      PM25: 0,
      CO: 0,
      NO2: 0,
      O3: 0,
      BC: 0
    };

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var stationStatusCode;

    // Loop through the stations (they're the same size and have partially matching data)
    for (var i = 0; i < stationInfo.length; i++) {

      // Create a new station object with properties of both station objects
      var station = Object.assign({}, stationInfo[i], stationStatus[i]);
      // If a station is listed but not installed, it's coming soon
      if (!station.is_installed) {
        stationStatusCode = "PM10";
      }
      // If a station has no bikes available, it's empty
      else if (!station.num_bikes_available) {
        stationStatusCode = "PM25";
      }
      // If a station is installed but isn't renting, it's out of order
      else if (station.is_installed && !station.is_renting) {
        stationStatusCode = "O3";
      }
      // If a station has less than 5 bikes, it's status is low
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "CO";
      }
      // Otherwise the station is normal
      else if (station.num_bikes_available < 5){
        stationStatusCode = "NO2";
      }
      // Otherwise the station is normal
      else {
    stationStatusCode = "BC";
  }

  // Update the station count
  stationCount[stationStatusCode]++;
  // Create a new marker with the appropriate icon and coordinates
  var newMarker = L.marker([station.lat, station.lon], {
    icon: icons[stationStatusCode]
  });

  // Add the new marker to the appropriate layer
  newMarker.addTo(layers[stationStatusCode]);

  // Bind a popup to the marker that will  display on click. This will be rendered as HTML
  newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
}

    // Call the updateLegend function, which will... update the legend!
    updateLegend(updatedAt, stationCount);
  });
});

// Update the legend's innerHTML with the last updated time and station count
function updateLegend(time, stationCount) {
  document.querySelector(".legend").innerHTML = [
    "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
    "<p class='out-of-order'>O3: " + stationCount.O3 + "</p>",
    "<p class='coming-soon'>PM10: " + stationCount.PM10 + "</p>",
    "<p class='empty'>PM25: " + stationCount.PM25 + "</p>",
    "<p class='low'>CO: " + stationCount.CO + "</p>",
    "<p class='healthy'>NO2: " + stationCount.NO2 + "</p>",
    "<p class='cow'>BC: " + stationCount.BC + "</p>"
  ].join("");
}
