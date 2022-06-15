mapboxgl.accessToken = 'pk.eyJ1IjoibWlzaGF2YWlkIiwiYSI6ImNsM3U4bHR3bjI4ZWUzaW9leGlrbXN2ZmcifQ.JA7tcQL3G1x8i7fZuWw2nA';
var map = new mapboxgl.Map({
  container: "map",
  style:  "mapbox://styles/mishavaid/cl3x5lp6e000l14pg8rzw80ou",
  zoom: 10.2,
  maxZoom: 15,
  minZoom: 10.2,
  center: [-73.949, 40.752],
});

map.on("load", function () {
let layers = map.getStyle().layers;
        for (var i=0; i<layers.length; i++) {
        console.log(layers[i].id)}

  map.addLayer(
    {
      id: "start-stops",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/sept2020Starts.geojson",
      },
      paint: {
        'circle-radius': 4,
        // "circle-color": '#26547C',
        // "circle-stroke-color": "#ffff00",
        "circle-stroke-width": 0.5,
        "circle-opacity": 1,

        'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'tripCount'],
          0,
          '#c0e6ba',
          3000,
          '#94d391',
          7000,
          '#60ba6c',
          10000,
          '#329a51',
          14000,
          '#0e7735'
          ],
      },
      minzoom: 3,
    },
    "settlement-minor-label"
  );
  
});

// Create the popup
map.on('click', 'start-stops', function (e) {
    var stationName = e.features[0].properties.start_station_name;
    var tripCount = e.features[0].properties.tripCount.toLocaleString();
    
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h3>' + tripCount + ' trips started from ' + stationName + '</h3>'
            )
        .addTo(map);
    });
    map.on('mouseenter', 'start-stops', function () {
    map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'start-stops', function () {
    map.getCanvas().style.cursor = '';
    });