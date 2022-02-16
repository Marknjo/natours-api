'use strict';

import displayMapbox from './modules/mapbox.js';
import login from './modules/login.js';
import logout from './modules/logout.js';
import updateMe from './modules/updateMySettings.js';
import updateMyPassword from './modules/updateMyPassword.js';
import stripeCheckout from './modules/stripe.js';
import { closeModal } from './modules/showModal.js';
// import showAlert from './modules/alertMessages.js';

// Elements
const mapEl = document.getElementById('map');
const loginFormEl = document.getElementById('login-form');
const logoutButtonEl = document.querySelector('.nav__el--logout');
const updateMeFormEl = document.querySelector('.form-user-data');
const updateMyPassEl = document.querySelector('.form-user-settings');
const bookingBtnEL = document.getElementById('booking-btn');
const overlayEl = document.getElementById('overlay');

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
if (bookingBtnEL) {
  bookingBtnEL.addEventListener('click', stripeCheckout);
  // bookingBtnEL.addEventListener('click', function () {
  //   (async () => {
  //     try {
  //       const stripeCheckout = await import('./modules/stripe.js');
  //       console.log(stripeCheckout);
  //       stripeCheckout();
  //     } catch (error) {
  //       console.log(error);
  //       showAlert(error.message, 'error');
  //     }
  //   })();
  // });
}

// Handle modal
if (overlayEl) {
  // Select modal elements
  const backdrop = overlayEl.lastElementChild;
  const modalCloseBtn =
    overlayEl.firstElementChild.querySelector('.modal__close');

  // Listen to the click events
  backdrop.addEventListener('click', closeModal(overlayEl, bookingBtnEL));
  modalCloseBtn.addEventListener('click', closeModal(overlayEl, bookingBtnEL));
}
