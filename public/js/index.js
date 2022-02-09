import displayMapbox from './modules/mapbox.js';
import login from './modules/login.js';

// Elements
const mapEl = document.getElementById('map');
const loginFormEl = document.getElementById('login-form');

// Handle Mapbox Display
if (mapEl) {
  const locations = JSON.parse(mapEl.dataset.locations);

  displayMapbox(locations);
}

// Handle user login
if (loginFormEl) {
  loginFormEl.addEventListener('submit', login(loginFormEl));
}
