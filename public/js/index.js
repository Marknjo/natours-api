import displayMapbox from './modules/mapbox.js';
import login from './modules/login.js';
import logout from './modules/logout.js';
import updateMe from './modules/updateMySettings.js';
import updateMyPassword from './modules/updateMyPassword.js';
import stripeCheckout from './modules/stripe.js';

// Elements
const mapEl = document.getElementById('map');
const loginFormEl = document.getElementById('login-form');
const logoutButtonEl = document.querySelector('.nav__el--logout');
const updateMeFormEl = document.querySelector('.form-user-data');
const updateMyPassEl = document.querySelector('.form-user-settings');
const bookingBtnEL = document.getElementById('booking-btn');

// Handle Mapbox Display
if (mapEl) {
  const locations = JSON.parse(mapEl.dataset.locations);

  displayMapbox(locations);
}

// Handle user login
if (loginFormEl) loginFormEl.addEventListener('submit', login(loginFormEl));

// Logout user
if (logoutButtonEl) logoutButtonEl.addEventListener('click', logout);

// Update current logged in user settings
if (updateMeFormEl) updateMeFormEl.addEventListener('submit', updateMe);

// Update current logged in user password
if (updateMyPassEl) updateMyPassEl.addEventListener('submit', updateMyPassword);

// Stripe Checkout session
if (bookingBtnEL) bookingBtnEL.addEventListener('click', stripeCheckout);
