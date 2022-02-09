import displayMapbox from './modules/mapbox.js';

// Elements
const mapElem = document.getElementById('map');

// Handle Mapbox Display
if (mapElem) {
  const locations = JSON.parse(mapElem.dataset.locations);

  displayMapbox(locations);
}
