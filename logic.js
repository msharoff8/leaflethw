function markerSize(mag) {
  mag * 5;
}

function getColor(d) {
  return d > 5 ? '#dodgerblue' :
  d > 4  ? '#purple' :
  d > 3  ? '#red' :
  d > 2  ? '#green' :
  d > 1   ? '#tourquoise' :
            '#black';
}


var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

earthquakemarkers=[]

d3.json(queryUrl, function(earthquakesData) {
	var earthquakes = L.geoJSON(earthquakesData, {
		pointToLayer: function(feature, latlng) {
			earthquakemarkers.push(
        L.circleMarker(latlng, {
				radius: markerSize(feature.properties.mag),
				fillColor: getColor(feature.properties.mag),
				color: "orange",
				hue: markerSize(feature.properties.mag),
				weight: 0.7,
				opacity: 1,
				fillOpacity: 0.5
      }))
		},
       onEachFeature: function (feature, layer) {
    var marker = layer.bindPopup('<p><b>Location:</b> '+feature.properties.place+'</br><b>Magnitude:</b> '+feature.properties.mag+'</br><b>Date/Time:</b>')
    marker.on('click', function (event) {
  this.openPopup();
});
}
})

createMap(earthquakes);
},

function createMap(earthquakes) {

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  
  var quakes = L.layerGroup(earthquakemarkers);

  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  var overlayMaps = {
    "Earthquakes": quakes,
  };


  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
})



