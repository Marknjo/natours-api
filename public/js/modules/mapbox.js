// IMPORT MAPBOX

// GET LOCATIONS
const locations = document.getElementById('map').dataset.locations;
console.log(locations);

// GET THE MAP ID
mapboxgl.accessToken =
  'pk.eyJ1IjoibWFya25qbyIsImEiOiJja3M1cndpamIyaXhkMnFvOXN2cHBwbDdvIn0.6W8GeDyqWPQetlgQGrB1lA';

// SETUP MAPBOX
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

// HANDLE ICON, MESSAGE etc

// HANDLE PLACEMENT OF THE MAP
