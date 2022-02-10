import displayMapbox from './modules/mapbox.js';
import login from './modules/login.js';
import logout from './modules/logout.js';

// Elements
const mapEl = document.getElementById('map');
const loginFormEl = document.getElementById('login-form');
const logoutButtonEl = document.querySelector('.nav__el--logout');

// Handle Mapbox Display
if (mapEl) {
  const locations = JSON.parse(mapEl.dataset.locations);

  displayMapbox(locations);
}

// Handle user login
if (loginFormEl) {
  loginFormEl.addEventListener('submit', login(loginFormEl));
}

// Logout user
if (logoutButtonEl) logoutButtonEl.addEventListener('click', logout);
