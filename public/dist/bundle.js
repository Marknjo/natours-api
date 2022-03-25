/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/importModules.js":
/*!************************************!*\
  !*** ./public/js/importModules.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadMapHandler\": () => (/* binding */ loadMapHandler),\n/* harmony export */   \"loginFormSubmitHandler\": () => (/* binding */ loginFormSubmitHandler),\n/* harmony export */   \"logoutHandler\": () => (/* binding */ logoutHandler)\n/* harmony export */ });\n/* harmony import */ var _utils_codeWrappers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/codeWrappers.js */ \"./public/js/utils/codeWrappers.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n/// Handles import of modules\n // import httpRequestHelper from './utils/httpRequestsHelper.js';\n// import redirectTo from './utils/redirectsHelper.js';\n\n/**\r\n * Import Modules\r\n */\n\nvar getLoginModule = () => __webpack_require__.e(/*! import() | loginModule */ \"loginModule\").then(__webpack_require__.bind(__webpack_require__, /*! ./modules/login.js */ \"./public/js/modules/login.js\"));\n\nvar getLocationsMapModule = () => __webpack_require__.e(/*! import() | locationMapModule */ \"locationMapModule\").then(__webpack_require__.bind(__webpack_require__, /*! ./modules/locationsMap.js */ \"./public/js/modules/locationsMap.js\")); /// Import logout on demand\n\n\nvar getLogoutModule = () => __webpack_require__.e(/*! import() */ \"public_js_modules_logout_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./modules/logout.js */ \"./public/js/modules/logout.js\"));\n/**\r\n * Handle user login login with dynamic import. Import feature on demand\r\n * @param {Event} event from event listener\r\n */\n\n\nvar loginFormSubmitHandler = (0,_utils_codeWrappers_js__WEBPACK_IMPORTED_MODULE_0__.asyncImportWrapper)( /*#__PURE__*/_asyncToGenerator(function* () {\n  var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Event;\n  // Prevent form submit\n  event.preventDefault(); // try getting the login form\n\n  var {\n    default: handleLogin\n  } = yield getLoginModule(); // Login user\n\n  handleLogin(event.target);\n}), {\n  hasEvent: true,\n  message: 'Error submitting form'\n});\n/**\r\n * Handles Map import\r\n */\n\nvar loadMapHandler = (0,_utils_codeWrappers_js__WEBPACK_IMPORTED_MODULE_0__.asyncImportWrapper)( /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(function* (mapEl) {\n    var {\n      default: showLocationMap\n    } = yield getLocationsMapModule(); //Render Map\n\n    showLocationMap(mapEl.dataset.locations, mapEl.dataset.mapboxKey);\n  });\n\n  return function (_x) {\n    return _ref2.apply(this, arguments);\n  };\n}(), {\n  hasEvent: true,\n  message: 'Could not load the MAP'\n});\n/**\r\n * Handles logout user\r\n */\n\nvar logoutHandler = (0,_utils_codeWrappers_js__WEBPACK_IMPORTED_MODULE_0__.asyncImportWrapper)( /*#__PURE__*/_asyncToGenerator(function* () {\n  // // Send request to the server to logout user\n  // const url = '/api/v1/users/logout';\n  // const response = await httpRequestHelper(url, {\n  //   requestMethod: 'GET',\n  // });\n  // console.log(response);\n  // // Check for errors\n  // if (response.status === 'fail' || response.status === 'error') {\n  //   throw new Error('Could not log out user');\n  // }\n  // // TODO: Handle successful messaging\n  // console.log(response.data.message);\n  // /// Handle redirects\n  // const logoutFromUrl = location.pathname;\n  // /// Redirect to\n  // // Loggin out from admin dashboard\n  // if (logoutFromUrl.includes('sys-admin')) {\n  //   redirectTo('/', {\n  //     redirectOption: 'disallowGoBack',\n  //   });\n  // }\n  // // Loggin out from other client pages\n  // redirectTo(logoutFromUrl, {\n  //   redirectOption: 'allowsGoBack',\n  // });\n  // Logout user\n  var {\n    default: handleLogout\n  } = yield getLogoutModule();\n  handleLogout();\n}), {\n  hasEvent: true,\n  allowErrorThrow: true\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvaW1wb3J0TW9kdWxlcy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBR0E7OztBQU9BO0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBTUE7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQUE7O0FBR0E7QUFDQTs7QUFOQTtBQUFBO0FBQUE7QUFBQTtBQVFBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmF0b3Vycy1yZXZpZXcvLi9wdWJsaWMvanMvaW1wb3J0TW9kdWxlcy5qcz83ZTRiIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLyBIYW5kbGVzIGltcG9ydCBvZiBtb2R1bGVzXHJcblxyXG5pbXBvcnQgeyBhc3luY0ltcG9ydFdyYXBwZXIgfSBmcm9tICcuL3V0aWxzL2NvZGVXcmFwcGVycy5qcyc7XHJcbi8vIGltcG9ydCBodHRwUmVxdWVzdEhlbHBlciBmcm9tICcuL3V0aWxzL2h0dHBSZXF1ZXN0c0hlbHBlci5qcyc7XHJcbi8vIGltcG9ydCByZWRpcmVjdFRvIGZyb20gJy4vdXRpbHMvcmVkaXJlY3RzSGVscGVyLmpzJztcclxuXHJcbi8qKlxyXG4gKiBJbXBvcnQgTW9kdWxlc1xyXG4gKi9cclxuY29uc3QgZ2V0TG9naW5Nb2R1bGUgPSAoKSA9PlxyXG4gIGltcG9ydCgvKndlYnBhY2tDaHVua05hbWU6IFwibG9naW5Nb2R1bGVcIiovICcuL21vZHVsZXMvbG9naW4uanMnKTtcclxuXHJcbmNvbnN0IGdldExvY2F0aW9uc01hcE1vZHVsZSA9ICgpID0+XHJcbiAgaW1wb3J0KFxyXG4gICAgLyogd2VicGFja0NodW5rTmFtZTogXCJsb2NhdGlvbk1hcE1vZHVsZVwiICovXHJcbiAgICAnLi9tb2R1bGVzL2xvY2F0aW9uc01hcC5qcydcclxuICApO1xyXG5cclxuLy8vIEltcG9ydCBsb2dvdXQgb24gZGVtYW5kXHJcbmNvbnN0IGdldExvZ291dE1vZHVsZSA9ICgpID0+XHJcbiAgaW1wb3J0KC8qIHdlcGFja0NodW5rTmFtZTogXCJsb2dvdXRNb2R1bGVcIiAqLyAnLi9tb2R1bGVzL2xvZ291dC5qcycpO1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSB1c2VyIGxvZ2luIGxvZ2luIHdpdGggZHluYW1pYyBpbXBvcnQuIEltcG9ydCBmZWF0dXJlIG9uIGRlbWFuZFxyXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBmcm9tIGV2ZW50IGxpc3RlbmVyXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9naW5Gb3JtU3VibWl0SGFuZGxlciA9IGFzeW5jSW1wb3J0V3JhcHBlcihcclxuICBhc3luYyBmdW5jdGlvbiAoZXZlbnQgPSBFdmVudCkge1xyXG4gICAgLy8gUHJldmVudCBmb3JtIHN1Ym1pdFxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvLyB0cnkgZ2V0dGluZyB0aGUgbG9naW4gZm9ybVxyXG4gICAgY29uc3QgeyBkZWZhdWx0OiBoYW5kbGVMb2dpbiB9ID0gYXdhaXQgZ2V0TG9naW5Nb2R1bGUoKTtcclxuXHJcbiAgICAvLyBMb2dpbiB1c2VyXHJcbiAgICBoYW5kbGVMb2dpbihldmVudC50YXJnZXQpO1xyXG4gIH0sXHJcbiAge1xyXG4gICAgaGFzRXZlbnQ6IHRydWUsXHJcbiAgICBtZXNzYWdlOiAnRXJyb3Igc3VibWl0dGluZyBmb3JtJyxcclxuICB9XHJcbik7XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBNYXAgaW1wb3J0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9hZE1hcEhhbmRsZXIgPSBhc3luY0ltcG9ydFdyYXBwZXIoXHJcbiAgYXN5bmMgZnVuY3Rpb24gKG1hcEVsKSB7XHJcbiAgICBjb25zdCB7IGRlZmF1bHQ6IHNob3dMb2NhdGlvbk1hcCB9ID0gYXdhaXQgZ2V0TG9jYXRpb25zTWFwTW9kdWxlKCk7XHJcblxyXG4gICAgLy9SZW5kZXIgTWFwXHJcbiAgICBzaG93TG9jYXRpb25NYXAobWFwRWwuZGF0YXNldC5sb2NhdGlvbnMsIG1hcEVsLmRhdGFzZXQubWFwYm94S2V5KTtcclxuICB9LFxyXG4gIHtcclxuICAgIGhhc0V2ZW50OiB0cnVlLFxyXG4gICAgbWVzc2FnZTogJ0NvdWxkIG5vdCBsb2FkIHRoZSBNQVAnLFxyXG4gIH1cclxuKTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIGxvZ291dCB1c2VyXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9nb3V0SGFuZGxlciA9IGFzeW5jSW1wb3J0V3JhcHBlcihcclxuICBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAvLyBTZW5kIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB0byBsb2dvdXQgdXNlclxyXG4gICAgLy8gY29uc3QgdXJsID0gJy9hcGkvdjEvdXNlcnMvbG9nb3V0JztcclxuICAgIC8vIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaHR0cFJlcXVlc3RIZWxwZXIodXJsLCB7XHJcbiAgICAvLyAgIHJlcXVlc3RNZXRob2Q6ICdHRVQnLFxyXG4gICAgLy8gfSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAvLyAvLyBDaGVjayBmb3IgZXJyb3JzXHJcbiAgICAvLyBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAnZmFpbCcgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAnZXJyb3InKSB7XHJcbiAgICAvLyAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvZyBvdXQgdXNlcicpO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gLy8gVE9ETzogSGFuZGxlIHN1Y2Nlc3NmdWwgbWVzc2FnaW5nXHJcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhLm1lc3NhZ2UpO1xyXG4gICAgLy8gLy8vIEhhbmRsZSByZWRpcmVjdHNcclxuICAgIC8vIGNvbnN0IGxvZ291dEZyb21VcmwgPSBsb2NhdGlvbi5wYXRobmFtZTtcclxuICAgIC8vIC8vLyBSZWRpcmVjdCB0b1xyXG4gICAgLy8gLy8gTG9nZ2luIG91dCBmcm9tIGFkbWluIGRhc2hib2FyZFxyXG4gICAgLy8gaWYgKGxvZ291dEZyb21VcmwuaW5jbHVkZXMoJ3N5cy1hZG1pbicpKSB7XHJcbiAgICAvLyAgIHJlZGlyZWN0VG8oJy8nLCB7XHJcbiAgICAvLyAgICAgcmVkaXJlY3RPcHRpb246ICdkaXNhbGxvd0dvQmFjaycsXHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gLy8gTG9nZ2luIG91dCBmcm9tIG90aGVyIGNsaWVudCBwYWdlc1xyXG4gICAgLy8gcmVkaXJlY3RUbyhsb2dvdXRGcm9tVXJsLCB7XHJcbiAgICAvLyAgIHJlZGlyZWN0T3B0aW9uOiAnYWxsb3dzR29CYWNrJyxcclxuICAgIC8vIH0pO1xyXG4gICAgLy8gTG9nb3V0IHVzZXJcclxuICAgIGNvbnN0IHsgZGVmYXVsdDogaGFuZGxlTG9nb3V0IH0gPSBhd2FpdCBnZXRMb2dvdXRNb2R1bGUoKTtcclxuICAgIGhhbmRsZUxvZ291dCgpO1xyXG4gIH0sXHJcbiAge1xyXG4gICAgaGFzRXZlbnQ6IHRydWUsXHJcbiAgICBhbGxvd0Vycm9yVGhyb3c6IHRydWUsXHJcbiAgfVxyXG4pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./public/js/importModules.js\n");

/***/ }),

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _importModules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./importModules.js */ \"./public/js/importModules.js\");\n/* harmony import */ var _modules_handleFlashMessages_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/handleFlashMessages.js */ \"./public/js/modules/handleFlashMessages.js\");\n // IMPORTS\n//import showLocationMap from './modules/locationsMap.js';\n\n\n /// GET DOM ELEMENTS\n\n/**\r\n * Map Element\r\n */\n\nvar mapEl = document.getElementById('map');\n/**\r\n * Login Form\r\n */\n\nvar loginFormEl = document.querySelector('.form__login');\n/**\r\n * Logout button\r\n */\n\nvar logoutEl = document.getElementById('logout');\n/**\r\n * Get base body\r\n */\n\nvar bodyEl = document.body; /// COFIGURE DIFFERENT SCRIPTS\n\n/**\r\n * Get Map If it is set\r\n */\n\nif (mapEl) _importModules_js__WEBPACK_IMPORTED_MODULE_0__.loadMapHandler(mapEl);\n/**\r\n * handle login form\r\n */\n\nif (loginFormEl) {\n  // Listen to teh submit event\n  loginFormEl.addEventListener('submit', _importModules_js__WEBPACK_IMPORTED_MODULE_0__.loginFormSubmitHandler);\n}\n/**\r\n * Handle user logout\r\n */\n\n\nif (logoutEl) logoutEl.addEventListener('click', _importModules_js__WEBPACK_IMPORTED_MODULE_0__.logoutHandler);\n/**\r\n * Handle server messages\r\n */\n\nif (bodyEl) {\n  var flashMessagesObj = bodyEl.dataset.flashMessages;\n  var userRole = bodyEl.dataset.userRole ? bodyEl.dataset.userRole : '';\n  (0,_modules_handleFlashMessages_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(flashMessagesObj, userRole);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFFQTs7QUFFQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTs7QUFJQTtBQUNBO0FBQ0E7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7OztBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uYXRvdXJzLXJldmlldy8uL3B1YmxpYy9qcy9pbmRleC5qcz80ZGY4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuLy8gSU1QT1JUU1xyXG4vL2ltcG9ydCBzaG93TG9jYXRpb25NYXAgZnJvbSAnLi9tb2R1bGVzL2xvY2F0aW9uc01hcC5qcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBtb2R1bGUgZnJvbSAnLi9pbXBvcnRNb2R1bGVzLmpzJztcclxuaW1wb3J0IGhhbmRsZUZsYXNoTWVzc2FnZXMgZnJvbSAnLi9tb2R1bGVzL2hhbmRsZUZsYXNoTWVzc2FnZXMuanMnO1xyXG5cclxuLy8vIEdFVCBET00gRUxFTUVOVFNcclxuLyoqXHJcbiAqIE1hcCBFbGVtZW50XHJcbiAqL1xyXG5jb25zdCBtYXBFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcclxuXHJcbi8qKlxyXG4gKiBMb2dpbiBGb3JtXHJcbiAqL1xyXG5jb25zdCBsb2dpbkZvcm1FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19sb2dpbicpO1xyXG5cclxuLyoqXHJcbiAqIExvZ291dCBidXR0b25cclxuICovXHJcbmNvbnN0IGxvZ291dEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ291dCcpO1xyXG5cclxuLyoqXHJcbiAqIEdldCBiYXNlIGJvZHlcclxuICovXHJcbmNvbnN0IGJvZHlFbCA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG4vLy8gQ09GSUdVUkUgRElGRkVSRU5UIFNDUklQVFNcclxuXHJcbi8qKlxyXG4gKiBHZXQgTWFwIElmIGl0IGlzIHNldFxyXG4gKi9cclxuaWYgKG1hcEVsKSBtb2R1bGUubG9hZE1hcEhhbmRsZXIobWFwRWwpO1xyXG5cclxuLyoqXHJcbiAqIGhhbmRsZSBsb2dpbiBmb3JtXHJcbiAqL1xyXG5pZiAobG9naW5Gb3JtRWwpIHtcclxuICAvLyBMaXN0ZW4gdG8gdGVoIHN1Ym1pdCBldmVudFxyXG4gIGxvZ2luRm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG1vZHVsZS5sb2dpbkZvcm1TdWJtaXRIYW5kbGVyKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSB1c2VyIGxvZ291dFxyXG4gKi9cclxuaWYgKGxvZ291dEVsKSBsb2dvdXRFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG1vZHVsZS5sb2dvdXRIYW5kbGVyKTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgc2VydmVyIG1lc3NhZ2VzXHJcbiAqL1xyXG5pZiAoYm9keUVsKSB7XHJcbiAgY29uc3QgZmxhc2hNZXNzYWdlc09iaiA9IGJvZHlFbC5kYXRhc2V0LmZsYXNoTWVzc2FnZXM7XHJcbiAgY29uc3QgdXNlclJvbGUgPSBib2R5RWwuZGF0YXNldC51c2VyUm9sZSA/IGJvZHlFbC5kYXRhc2V0LnVzZXJSb2xlIDogJyc7XHJcblxyXG4gIGhhbmRsZUZsYXNoTWVzc2FnZXMoZmxhc2hNZXNzYWdlc09iaiwgdXNlclJvbGUpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./public/js/index.js\n");

/***/ }),

/***/ "./public/js/modules/handleFlashMessages.js":
/*!**************************************************!*\
  !*** ./public/js/modules/handleFlashMessages.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_showAlert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/showAlert.js */ \"./public/js/utils/showAlert.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n/**\r\n * Responsible showing notifications from the server and removing shown notification\r\n * @param {{viewStatus: 'viewed' | 'pending', showOnPage: string, message: string,action: string,removeAfter: 'shown' | 'timeExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }} flashMessage - Flash message object\r\n * @param {string} userRole current logged in user role. For only showing admins if there is error\r\n * @returns {never} Never returns anything\r\n */\n\nvar showFlashMessageAndRemoveShown = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(function* (flashMessage, userRole) {\n    // Only show notifications for the current page if removeAfte is timeExpires\n    if (flashMessage.showOnPage !== location.pathname) return; // TODO: Handle admin messages differently\n\n    if (flashMessage.showOnPage.startsWith('/sys-admin')) {/// Handle this message differently\n    } // Show incoming notification before removing it\n\n\n    (0,_utils_showAlert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_objectSpread(_objectSpread({}, flashMessage), {}, {\n      displayPosition: 'right'\n    })); /// Only remove flash messages of they are identified as removeAfter shown\n\n    if (flashMessage.removeAfter === 'timeExpires') return;\n    var res = yield fetch('/viewed-flash-message', {\n      method: 'POST',\n      body: JSON.stringify(flashMessage),\n      headers: {\n        'Content-Type': 'application/json; charset=utf-8'\n      }\n    });\n    console.log({\n      generalTest: userRole !== 'admin' || res.ok && res.status === 200,\n      okTest: !res.ok,\n      okAndStatuTest: res.ok && res.status === 200,\n      adminTest: userRole !== 'admin',\n      re: res.ok\n    });\n    console.log(res); // Show notification if admin and response is not okay\n\n    if (userRole !== 'admin' || res.ok && res.status === 200) return;\n    (0,_utils_showAlert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      message: \"Error showing the notification: \".concat(flashMessage.message),\n      displayPosition: 'right',\n      messageType: 'info'\n    });\n  });\n\n  return function showFlashMessageAndRemoveShown(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n/**\r\n * Handle showing and reseting of flash messages.\r\n *\r\n * Allows flash messages to remain for a while in the client if removeAfte timeExpires is set while those with removeAfter shown are removed immediately from the flash messages stored in the cookie\r\n * @param {[{viewStatus: 'viewed' | 'pending', showOnPage: string, message: string,action: string,removeAfter: 'shown' | 'timeExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }]} flashMessagesObj Collecton of flash messages stored in the express request\r\n * @param {string} userRole current logged in user role. For only showing admins if there is error\r\n * @returns {void | }\r\n */\n\n\nvar handleFlashMessages = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(function* (flashMessagesObj, userRole) {\n    // Do not proceed is we do not have a flash message objec with messages\n    if (!flashMessagesObj) return;\n    var flashMessages = JSON.parse(flashMessagesObj); // Flash message is set but has zero items in it, stop processing\n\n    if (flashMessages.length === 0) return; /// Cycle flash message\n\n    if (flashMessages.length > 1) {\n      flashMessages.forEach(flashMessage => {\n        showFlashMessageAndRemoveShown(flashMessage, userRole);\n      });\n      return;\n    } /// Just a single flashMessage in the array\n\n\n    showFlashMessageAndRemoveShown(flashMessages[0], userRole);\n  });\n\n  return function handleFlashMessages(_x3, _x4) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleFlashMessages);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvbW9kdWxlcy9oYW5kbGVGbGFzaE1lc3NhZ2VzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFDQTtBQUNBOztBQUdBO0FBRUE7OztBQUdBO0FBRUE7QUFGQTs7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUhBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTs7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7QUEzQ0E7QUFBQTtBQUFBO0FBQUE7QUE2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTs7QUFHQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBcEJBO0FBQUE7QUFBQTtBQUFBOztBQXNCQSIsInNvdXJjZXMiOlsid2VicGFjazovL25hdG91cnMtcmV2aWV3Ly4vcHVibGljL2pzL21vZHVsZXMvaGFuZGxlRmxhc2hNZXNzYWdlcy5qcz9jYzE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaG93QWxlcnQgZnJvbSAnLi4vdXRpbHMvc2hvd0FsZXJ0LmpzJztcclxuXHJcbi8qKlxyXG4gKiBSZXNwb25zaWJsZSBzaG93aW5nIG5vdGlmaWNhdGlvbnMgZnJvbSB0aGUgc2VydmVyIGFuZCByZW1vdmluZyBzaG93biBub3RpZmljYXRpb25cclxuICogQHBhcmFtIHt7dmlld1N0YXR1czogJ3ZpZXdlZCcgfCAncGVuZGluZycsIHNob3dPblBhZ2U6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLGFjdGlvbjogc3RyaW5nLHJlbW92ZUFmdGVyOiAnc2hvd24nIHwgJ3RpbWVFeHBpcmVzJywgbWVzc2FnZVR5cGU6ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdzdWNjZXNzJyB8ICdlcnJvcicsIGV4cGlyZXNJbjogRGF0ZSxjcmVhdGVkQXQ6IERhdGUsIH19IGZsYXNoTWVzc2FnZSAtIEZsYXNoIG1lc3NhZ2Ugb2JqZWN0XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyUm9sZSBjdXJyZW50IGxvZ2dlZCBpbiB1c2VyIHJvbGUuIEZvciBvbmx5IHNob3dpbmcgYWRtaW5zIGlmIHRoZXJlIGlzIGVycm9yXHJcbiAqIEByZXR1cm5zIHtuZXZlcn0gTmV2ZXIgcmV0dXJucyBhbnl0aGluZ1xyXG4gKi9cclxuY29uc3Qgc2hvd0ZsYXNoTWVzc2FnZUFuZFJlbW92ZVNob3duID0gYXN5bmMgKGZsYXNoTWVzc2FnZSwgdXNlclJvbGUpID0+IHtcclxuICAvLyBPbmx5IHNob3cgbm90aWZpY2F0aW9ucyBmb3IgdGhlIGN1cnJlbnQgcGFnZSBpZiByZW1vdmVBZnRlIGlzIHRpbWVFeHBpcmVzXHJcbiAgaWYgKGZsYXNoTWVzc2FnZS5zaG93T25QYWdlICE9PSBsb2NhdGlvbi5wYXRobmFtZSkgcmV0dXJuO1xyXG5cclxuICAvLyBUT0RPOiBIYW5kbGUgYWRtaW4gbWVzc2FnZXMgZGlmZmVyZW50bHlcclxuICBpZiAoZmxhc2hNZXNzYWdlLnNob3dPblBhZ2Uuc3RhcnRzV2l0aCgnL3N5cy1hZG1pbicpKSB7XHJcbiAgICAvLy8gSGFuZGxlIHRoaXMgbWVzc2FnZSBkaWZmZXJlbnRseVxyXG4gIH1cclxuXHJcbiAgLy8gU2hvdyBpbmNvbWluZyBub3RpZmljYXRpb24gYmVmb3JlIHJlbW92aW5nIGl0XHJcbiAgc2hvd0FsZXJ0KHtcclxuICAgIC4uLmZsYXNoTWVzc2FnZSxcclxuICAgIGRpc3BsYXlQb3NpdGlvbjogJ3JpZ2h0JyxcclxuICB9KTtcclxuXHJcbiAgLy8vIE9ubHkgcmVtb3ZlIGZsYXNoIG1lc3NhZ2VzIG9mIHRoZXkgYXJlIGlkZW50aWZpZWQgYXMgcmVtb3ZlQWZ0ZXIgc2hvd25cclxuICBpZiAoZmxhc2hNZXNzYWdlLnJlbW92ZUFmdGVyID09PSAndGltZUV4cGlyZXMnKSByZXR1cm47XHJcblxyXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvdmlld2VkLWZsYXNoLW1lc3NhZ2UnLCB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGZsYXNoTWVzc2FnZSksXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBjb25zb2xlLmxvZyh7XHJcbiAgICBnZW5lcmFsVGVzdDogdXNlclJvbGUgIT09ICdhZG1pbicgfHwgKHJlcy5vayAmJiByZXMuc3RhdHVzID09PSAyMDApLFxyXG4gICAgb2tUZXN0OiAhcmVzLm9rLFxyXG4gICAgb2tBbmRTdGF0dVRlc3Q6IHJlcy5vayAmJiByZXMuc3RhdHVzID09PSAyMDAsXHJcbiAgICBhZG1pblRlc3Q6IHVzZXJSb2xlICE9PSAnYWRtaW4nLFxyXG4gICAgcmU6IHJlcy5vayxcclxuICB9KTtcclxuICBjb25zb2xlLmxvZyhyZXMpO1xyXG5cclxuICAvLyBTaG93IG5vdGlmaWNhdGlvbiBpZiBhZG1pbiBhbmQgcmVzcG9uc2UgaXMgbm90IG9rYXlcclxuICBpZiAodXNlclJvbGUgIT09ICdhZG1pbicgfHwgKHJlcy5vayAmJiByZXMuc3RhdHVzID09PSAyMDApKSByZXR1cm47XHJcblxyXG4gIHNob3dBbGVydCh7XHJcbiAgICBtZXNzYWdlOiBgRXJyb3Igc2hvd2luZyB0aGUgbm90aWZpY2F0aW9uOiAke2ZsYXNoTWVzc2FnZS5tZXNzYWdlfWAsXHJcbiAgICBkaXNwbGF5UG9zaXRpb246ICdyaWdodCcsXHJcbiAgICBtZXNzYWdlVHlwZTogJ2luZm8nLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBzaG93aW5nIGFuZCByZXNldGluZyBvZiBmbGFzaCBtZXNzYWdlcy5cclxuICpcclxuICogQWxsb3dzIGZsYXNoIG1lc3NhZ2VzIHRvIHJlbWFpbiBmb3IgYSB3aGlsZSBpbiB0aGUgY2xpZW50IGlmIHJlbW92ZUFmdGUgdGltZUV4cGlyZXMgaXMgc2V0IHdoaWxlIHRob3NlIHdpdGggcmVtb3ZlQWZ0ZXIgc2hvd24gYXJlIHJlbW92ZWQgaW1tZWRpYXRlbHkgZnJvbSB0aGUgZmxhc2ggbWVzc2FnZXMgc3RvcmVkIGluIHRoZSBjb29raWVcclxuICogQHBhcmFtIHtbe3ZpZXdTdGF0dXM6ICd2aWV3ZWQnIHwgJ3BlbmRpbmcnLCBzaG93T25QYWdlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyxhY3Rpb246IHN0cmluZyxyZW1vdmVBZnRlcjogJ3Nob3duJyB8ICd0aW1lRXhwaXJlcycsIG1lc3NhZ2VUeXBlOiAnaW5mbycgfCAnd2FybmluZycgfCAnc3VjY2VzcycgfCAnZXJyb3InLCBleHBpcmVzSW46IERhdGUsY3JlYXRlZEF0OiBEYXRlLCB9XX0gZmxhc2hNZXNzYWdlc09iaiBDb2xsZWN0b24gb2YgZmxhc2ggbWVzc2FnZXMgc3RvcmVkIGluIHRoZSBleHByZXNzIHJlcXVlc3RcclxuICogQHBhcmFtIHtzdHJpbmd9IHVzZXJSb2xlIGN1cnJlbnQgbG9nZ2VkIGluIHVzZXIgcm9sZS4gRm9yIG9ubHkgc2hvd2luZyBhZG1pbnMgaWYgdGhlcmUgaXMgZXJyb3JcclxuICogQHJldHVybnMge3ZvaWQgfCB9XHJcbiAqL1xyXG5jb25zdCBoYW5kbGVGbGFzaE1lc3NhZ2VzID0gYXN5bmMgKGZsYXNoTWVzc2FnZXNPYmosIHVzZXJSb2xlKSA9PiB7XHJcbiAgLy8gRG8gbm90IHByb2NlZWQgaXMgd2UgZG8gbm90IGhhdmUgYSBmbGFzaCBtZXNzYWdlIG9iamVjIHdpdGggbWVzc2FnZXNcclxuICBpZiAoIWZsYXNoTWVzc2FnZXNPYmopIHJldHVybjtcclxuXHJcbiAgY29uc3QgZmxhc2hNZXNzYWdlcyA9IEpTT04ucGFyc2UoZmxhc2hNZXNzYWdlc09iaik7XHJcblxyXG4gIC8vIEZsYXNoIG1lc3NhZ2UgaXMgc2V0IGJ1dCBoYXMgemVybyBpdGVtcyBpbiBpdCwgc3RvcCBwcm9jZXNzaW5nXHJcbiAgaWYgKGZsYXNoTWVzc2FnZXMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gIC8vLyBDeWNsZSBmbGFzaCBtZXNzYWdlXHJcbiAgaWYgKGZsYXNoTWVzc2FnZXMubGVuZ3RoID4gMSkge1xyXG4gICAgZmxhc2hNZXNzYWdlcy5mb3JFYWNoKGZsYXNoTWVzc2FnZSA9PiB7XHJcbiAgICAgIHNob3dGbGFzaE1lc3NhZ2VBbmRSZW1vdmVTaG93bihmbGFzaE1lc3NhZ2UsIHVzZXJSb2xlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vLyBKdXN0IGEgc2luZ2xlIGZsYXNoTWVzc2FnZSBpbiB0aGUgYXJyYXlcclxuICBzaG93Rmxhc2hNZXNzYWdlQW5kUmVtb3ZlU2hvd24oZmxhc2hNZXNzYWdlc1swXSwgdXNlclJvbGUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRmxhc2hNZXNzYWdlcztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./public/js/modules/handleFlashMessages.js\n");

/***/ }),

/***/ "./public/js/utils/codeWrappers.js":
/*!*****************************************!*\
  !*** ./public/js/utils/codeWrappers.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"asyncImportWrapper\": () => (/* binding */ asyncImportWrapper),\n/* harmony export */   \"errorWrapper\": () => (/* binding */ errorWrapper)\n/* harmony export */ });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\r\n * All related functions for wrapping code\r\n * - imports, trycatch, etc.\r\n */\n\n/**\r\n * Helper method to abstract error handling\r\n * @param {Error} error Error object\r\n * @param {String} message Custom message passed on implementing the wrapper\r\n */\nvar handleErrors = (error, message) => {\n  // TODO Add support for handling notification -> Error type here\n  console.log(message ? message : 'Error occured!');\n  alert(message ? message : 'Error occured!'); // FIXME Remove this console log\n\n  console.log(error);\n};\n/**\r\n * Helper function for importing and handlering errors\r\n *\r\n * Keeps internal logic cleaner\r\n *\r\n * Wraps code with add event listener and that without, either with arguments or not\r\n * @param {Promise} cb Generic callback function returned after import of a module\r\n * @param {{ message: string, hasEvent: boolean, allowErrorThrow: boolean, }} configOptions Configure -> Error message; hasEvent Wraps code for event listeners; allowErrorThrow Pass error handling to the requesting function.\r\n * @returns {Error | string | void}\r\n */\n\n\nvar asyncImportWrapper = function asyncImportWrapper() {\n  var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Promise;\n  var confingOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {\n    message: '',\n    hasEvent: false,\n    allowErrorThrow: false\n  };\n  // Initialize configs with defaults\n  var {\n    message,\n    hasEvent,\n    allowErrorThrow\n  } = confingOptions ? _objectSpread({\n    message: '',\n    hasEvent: false,\n    allowErrorThrow: false\n  }, confingOptions) : {\n    message: '',\n    hasEvent: false,\n    allowErrorThrow: false\n  }; // Check that there is requirement for handling events\n\n  if (hasEvent) {\n    return /*#__PURE__*/_asyncToGenerator(function* () {\n      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Event;\n\n      try {\n        return yield cb(event);\n      } catch (error) {\n        // Throw error if it is allowed\n        if (allowErrorThrow) {\n          throw error;\n        } // Show message is throw error is not configure to true\n\n\n        handleErrors(error, message);\n      }\n    });\n  } /// Handling non event import options\n\n\n  return /*#__PURE__*/_asyncToGenerator(function* () {\n    try {\n      for (var _len = arguments.length, argsOptions = new Array(_len), _key = 0; _key < _len; _key++) {\n        argsOptions[_key] = arguments[_key];\n      }\n\n      // Does not have any event\n      if (argsOptions.length > 0 || argsOptions) {\n        var args = argsOptions.length === 1 ? argsOptions[0] : argsOptions;\n        return yield cb(args);\n      }\n\n      return yield cb();\n    } catch (error) {\n      // Throw error if it is allowed\n      if (allowErrorThrow) {\n        throw error;\n      } // Show message is throw error is not configure to true\n\n\n      handleErrors(error, message);\n    }\n  });\n};\n/**\r\n * Abstracts error handler that abstract try catch and creates a central location for error handling in the application\r\n *\r\n * @param {Function} cb Internal details of the calling function\r\n * @param {{ message: string, hasEvent: boolean, allowErrorThrow: boolean, }} configOptions Configure -> Error message; allowErrorThrow Pass error handling to the requesting function.\r\n * @returns {Error | string | void}\r\n **/\n\nvar errorWrapper = function errorWrapper() {\n  var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};\n  var confingOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {\n    message: '',\n    allowErrorThrow: false\n  };\n\n  // Initialize configs with defaults\n  var {\n    message,\n    allowErrorThrow\n  } = _objectSpread({\n    message: '',\n    allowErrorThrow: false\n  }, confingOptions ? confingOptions : {}); /// Abastract try catch wrapping\n\n\n  try {\n    return cb();\n  } catch (error) {\n    // Throw error if it is allowed\n    if (allowErrorThrow) {\n      throw error;\n    } // Show message is throw error is not configure to true\n\n\n    handleErrors(error, message);\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvdXRpbHMvY29kZVdyYXBwZXJzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBT0E7QUFBQTtBQUpBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQUE7QUFEQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBTUE7QUFBQTtBQUhBO0FBQ0E7QUFGQTs7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBOzs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmF0b3Vycy1yZXZpZXcvLi9wdWJsaWMvanMvdXRpbHMvY29kZVdyYXBwZXJzLmpzPzJhNjAiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEFsbCByZWxhdGVkIGZ1bmN0aW9ucyBmb3Igd3JhcHBpbmcgY29kZVxyXG4gKiAtIGltcG9ydHMsIHRyeWNhdGNoLCBldGMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEhlbHBlciBtZXRob2QgdG8gYWJzdHJhY3QgZXJyb3IgaGFuZGxpbmdcclxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgRXJyb3Igb2JqZWN0XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIEN1c3RvbSBtZXNzYWdlIHBhc3NlZCBvbiBpbXBsZW1lbnRpbmcgdGhlIHdyYXBwZXJcclxuICovXHJcbmNvbnN0IGhhbmRsZUVycm9ycyA9IChlcnJvciwgbWVzc2FnZSkgPT4ge1xyXG4gIC8vIFRPRE8gQWRkIHN1cHBvcnQgZm9yIGhhbmRsaW5nIG5vdGlmaWNhdGlvbiAtPiBFcnJvciB0eXBlIGhlcmVcclxuICBjb25zb2xlLmxvZyhtZXNzYWdlID8gbWVzc2FnZSA6ICdFcnJvciBvY2N1cmVkIScpO1xyXG4gIGFsZXJ0KG1lc3NhZ2UgPyBtZXNzYWdlIDogJ0Vycm9yIG9jY3VyZWQhJyk7XHJcblxyXG4gIC8vIEZJWE1FIFJlbW92ZSB0aGlzIGNvbnNvbGUgbG9nXHJcbiAgY29uc29sZS5sb2coZXJyb3IpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhlbHBlciBmdW5jdGlvbiBmb3IgaW1wb3J0aW5nIGFuZCBoYW5kbGVyaW5nIGVycm9yc1xyXG4gKlxyXG4gKiBLZWVwcyBpbnRlcm5hbCBsb2dpYyBjbGVhbmVyXHJcbiAqXHJcbiAqIFdyYXBzIGNvZGUgd2l0aCBhZGQgZXZlbnQgbGlzdGVuZXIgYW5kIHRoYXQgd2l0aG91dCwgZWl0aGVyIHdpdGggYXJndW1lbnRzIG9yIG5vdFxyXG4gKiBAcGFyYW0ge1Byb21pc2V9IGNiIEdlbmVyaWMgY2FsbGJhY2sgZnVuY3Rpb24gcmV0dXJuZWQgYWZ0ZXIgaW1wb3J0IG9mIGEgbW9kdWxlXHJcbiAqIEBwYXJhbSB7eyBtZXNzYWdlOiBzdHJpbmcsIGhhc0V2ZW50OiBib29sZWFuLCBhbGxvd0Vycm9yVGhyb3c6IGJvb2xlYW4sIH19IGNvbmZpZ09wdGlvbnMgQ29uZmlndXJlIC0+IEVycm9yIG1lc3NhZ2U7IGhhc0V2ZW50IFdyYXBzIGNvZGUgZm9yIGV2ZW50IGxpc3RlbmVyczsgYWxsb3dFcnJvclRocm93IFBhc3MgZXJyb3IgaGFuZGxpbmcgdG8gdGhlIHJlcXVlc3RpbmcgZnVuY3Rpb24uXHJcbiAqIEByZXR1cm5zIHtFcnJvciB8IHN0cmluZyB8IHZvaWR9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYXN5bmNJbXBvcnRXcmFwcGVyID0gZnVuY3Rpb24gKFxyXG4gIGNiID0gUHJvbWlzZSxcclxuICBjb25maW5nT3B0aW9ucyA9IHtcclxuICAgIG1lc3NhZ2U6ICcnLFxyXG4gICAgaGFzRXZlbnQ6IGZhbHNlLFxyXG4gICAgYWxsb3dFcnJvclRocm93OiBmYWxzZSxcclxuICB9XHJcbikge1xyXG4gIC8vIEluaXRpYWxpemUgY29uZmlncyB3aXRoIGRlZmF1bHRzXHJcbiAgY29uc3QgeyBtZXNzYWdlLCBoYXNFdmVudCwgYWxsb3dFcnJvclRocm93IH0gPSBjb25maW5nT3B0aW9uc1xyXG4gICAgPyB7XHJcbiAgICAgICAgbWVzc2FnZTogJycsXHJcbiAgICAgICAgaGFzRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgIGFsbG93RXJyb3JUaHJvdzogZmFsc2UsXHJcbiAgICAgICAgLi4uY29uZmluZ09wdGlvbnMsXHJcbiAgICAgIH1cclxuICAgIDogeyBtZXNzYWdlOiAnJywgaGFzRXZlbnQ6IGZhbHNlLCBhbGxvd0Vycm9yVGhyb3c6IGZhbHNlIH07XHJcblxyXG4gIC8vIENoZWNrIHRoYXQgdGhlcmUgaXMgcmVxdWlyZW1lbnQgZm9yIGhhbmRsaW5nIGV2ZW50c1xyXG4gIGlmIChoYXNFdmVudCkge1xyXG4gICAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIChldmVudCA9IEV2ZW50KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGNiKGV2ZW50KTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBpdCBpcyBhbGxvd2VkXHJcbiAgICAgICAgaWYgKGFsbG93RXJyb3JUaHJvdykge1xyXG4gICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaG93IG1lc3NhZ2UgaXMgdGhyb3cgZXJyb3IgaXMgbm90IGNvbmZpZ3VyZSB0byB0cnVlXHJcbiAgICAgICAgaGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vLyBIYW5kbGluZyBub24gZXZlbnQgaW1wb3J0IG9wdGlvbnNcclxuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3NPcHRpb25zKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBEb2VzIG5vdCBoYXZlIGFueSBldmVudFxyXG4gICAgICBpZiAoYXJnc09wdGlvbnMubGVuZ3RoID4gMCB8fCBhcmdzT3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSBhcmdzT3B0aW9ucy5sZW5ndGggPT09IDEgPyBhcmdzT3B0aW9uc1swXSA6IGFyZ3NPcHRpb25zO1xyXG5cclxuICAgICAgICByZXR1cm4gYXdhaXQgY2IoYXJncyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBhd2FpdCBjYigpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgaXQgaXMgYWxsb3dlZFxyXG4gICAgICBpZiAoYWxsb3dFcnJvclRocm93KSB7XHJcbiAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNob3cgbWVzc2FnZSBpcyB0aHJvdyBlcnJvciBpcyBub3QgY29uZmlndXJlIHRvIHRydWVcclxuICAgICAgaGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKTtcclxuICAgIH1cclxuICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0cyBlcnJvciBoYW5kbGVyIHRoYXQgYWJzdHJhY3QgdHJ5IGNhdGNoIGFuZCBjcmVhdGVzIGEgY2VudHJhbCBsb2NhdGlvbiBmb3IgZXJyb3IgaGFuZGxpbmcgaW4gdGhlIGFwcGxpY2F0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIEludGVybmFsIGRldGFpbHMgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb25cclxuICogQHBhcmFtIHt7IG1lc3NhZ2U6IHN0cmluZywgaGFzRXZlbnQ6IGJvb2xlYW4sIGFsbG93RXJyb3JUaHJvdzogYm9vbGVhbiwgfX0gY29uZmlnT3B0aW9ucyBDb25maWd1cmUgLT4gRXJyb3IgbWVzc2FnZTsgYWxsb3dFcnJvclRocm93IFBhc3MgZXJyb3IgaGFuZGxpbmcgdG8gdGhlIHJlcXVlc3RpbmcgZnVuY3Rpb24uXHJcbiAqIEByZXR1cm5zIHtFcnJvciB8IHN0cmluZyB8IHZvaWR9XHJcbiAqKi9cclxuZXhwb3J0IGNvbnN0IGVycm9yV3JhcHBlciA9IGZ1bmN0aW9uIChcclxuICBjYiA9ICgpID0+IHt9LFxyXG4gIGNvbmZpbmdPcHRpb25zID0ge1xyXG4gICAgbWVzc2FnZTogJycsXHJcbiAgICBhbGxvd0Vycm9yVGhyb3c6IGZhbHNlLFxyXG4gIH1cclxuKSB7XHJcbiAgLy8gSW5pdGlhbGl6ZSBjb25maWdzIHdpdGggZGVmYXVsdHNcclxuICBjb25zdCB7IG1lc3NhZ2UsIGFsbG93RXJyb3JUaHJvdyB9ID0ge1xyXG4gICAgbWVzc2FnZTogJycsXHJcbiAgICBhbGxvd0Vycm9yVGhyb3c6IGZhbHNlLFxyXG4gICAgLi4uKGNvbmZpbmdPcHRpb25zID8gY29uZmluZ09wdGlvbnMgOiB7fSksXHJcbiAgfTtcclxuICAvLy8gQWJhc3RyYWN0IHRyeSBjYXRjaCB3cmFwcGluZ1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gY2IoKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgLy8gVGhyb3cgZXJyb3IgaWYgaXQgaXMgYWxsb3dlZFxyXG4gICAgaWYgKGFsbG93RXJyb3JUaHJvdykge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTaG93IG1lc3NhZ2UgaXMgdGhyb3cgZXJyb3IgaXMgbm90IGNvbmZpZ3VyZSB0byB0cnVlXHJcbiAgICBoYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpO1xyXG4gIH1cclxufTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./public/js/utils/codeWrappers.js\n");

/***/ }),

/***/ "./public/js/utils/showAlert.js":
/*!**************************************!*\
  !*** ./public/js/utils/showAlert.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/// Manages alerts\n\n/**\r\n * Hide tiomeout on demand\r\n * @param {TimerHandler} timer Set timeout handler\r\n * @returns {TimerHandler} Clear timeout\r\n */\nvar hideAlert = timer => {\n  var alert = document.querySelector('.alert');\n  if (!alert) return;\n  if (timer) clearTimeout(timer);\n  alert.classList.add(\"alert--hide\");\n  return setTimeout(() => {\n    alert.parentElement.removeChild(alert);\n  }, 100 * 6);\n};\n/**\r\n * Handles closing of the button\r\n * @param {'left' | 'center' | 'right'} direction Where to position the close button relative to the alert box\r\n * @returns {TimerHandler} Clear timeout\r\n */\n\n\nvar closeAlert = direction => {\n  var closeBtnEl = document.querySelector('.alert__close');\n  if (!closeBtnEl) return;\n  var alertBoxEl = closeBtnEl.parentElement;\n  closeBtnEl.addEventListener('click', function (event) {\n    this.parentElement.classList.add(\"alert--hide-\".concat(direction));\n    return setTimeout(() => {\n      alertBoxEl.parentElement.removeChild(alertBoxEl);\n    }, 100 * 6);\n  });\n};\n/**\r\n * Shows alert for a given duration\r\n *  @param {[{ message: string,action: string, messageType: 'info' | 'warning' | 'success' | 'error', displayPosition: 'center' | 'right' | 'left', alertDisplayDuration: number}]} cookieFlashMessages Collection of flash messages from the client browser\r\n *\r\n */\n\n\nvar showAlert = function showAlert() {\n  var alert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n    message: '',\n    action: '',\n    messageType: 'success',\n    displayPosition: 'center',\n    alertDisplayDuration: 7\n  };\n  // Prep incoming alert\n  var defaultAlert = {\n    messageType: 'success',\n    displayPosition: 'center',\n    alertDisplayDuration: 7\n  };\n\n  var {\n    message,\n    action,\n    messageType,\n    displayPosition,\n    alertDisplayDuration\n  } = _objectSpread(_objectSpread({}, defaultAlert), alert); /// hide alert first\n  //const closeTimer = closeAlert();\n\n\n  var hideTimer = hideAlert(); /// Get the alert housing element\n\n  var headerEl = document.querySelector('.header'); /// Generate icon mockup\n\n  var iconMarkup = type => \"<i class=\\\"alert__icon alert__icon--\".concat(type, \"\\\"></i>\");\n\n  var showPosition = \"alert--\".concat(displayPosition);\n  var showTitle = action ? \"<h2 class=\\\"alert__title alert__title--\".concat(displayPosition, \"\\\">\").concat(action, \"</h2>\") : ''; /// return a constructed alert depending with the type\n\n  var alertMarkup = \"<div class=\\\"alert \".concat(messageType ? 'alert__' + messageType : '', \" \").concat(showPosition, \"\\\"> \\n        <button class=\\\"alert__close alert__close--\").concat(displayPosition, \"\\\">&times;</button>\\n        \").concat(showTitle, \"\\n        <p class=\\\"alert__content\\\">\\n           \").concat(iconMarkup(messageType), \"\\n           \").concat(message, \"\\n        </p>\\n    </div>\\n    \"); /// Add markup to the DOM\n\n  headerEl.insertAdjacentHTML('beforeend', alertMarkup); /// Auto remove alert\n\n  var autoTimer = setTimeout(() => {\n    hideAlert(hideTimer);\n  }, 1000 * alertDisplayDuration); //   /// Close timeout before hidealert\n\n  closeAlert(displayPosition, alertDisplayDuration, autoTimer);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showAlert);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvdXRpbHMvc2hvd0FsZXJ0LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBUUE7QUFOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFZQTs7O0FBQ0E7O0FBR0E7O0FBR0E7O0FBRUE7QUFFQTs7QUFLQTs7QUFhQTs7QUFHQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL25hdG91cnMtcmV2aWV3Ly4vcHVibGljL2pzL3V0aWxzL3Nob3dBbGVydC5qcz8xYjM2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vLyBNYW5hZ2VzIGFsZXJ0c1xyXG5cclxuLyoqXHJcbiAqIEhpZGUgdGlvbWVvdXQgb24gZGVtYW5kXHJcbiAqIEBwYXJhbSB7VGltZXJIYW5kbGVyfSB0aW1lciBTZXQgdGltZW91dCBoYW5kbGVyXHJcbiAqIEByZXR1cm5zIHtUaW1lckhhbmRsZXJ9IENsZWFyIHRpbWVvdXRcclxuICovXHJcbmNvbnN0IGhpZGVBbGVydCA9IHRpbWVyID0+IHtcclxuICBjb25zdCBhbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydCcpO1xyXG5cclxuICBpZiAoIWFsZXJ0KSByZXR1cm47XHJcblxyXG4gIGlmICh0aW1lcikgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuXHJcbiAgYWxlcnQuY2xhc3NMaXN0LmFkZChgYWxlcnQtLWhpZGVgKTtcclxuXHJcbiAgcmV0dXJuIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgYWxlcnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChhbGVydCk7XHJcbiAgfSwgMTAwICogNik7XHJcbn07XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBjbG9zaW5nIG9mIHRoZSBidXR0b25cclxuICogQHBhcmFtIHsnbGVmdCcgfCAnY2VudGVyJyB8ICdyaWdodCd9IGRpcmVjdGlvbiBXaGVyZSB0byBwb3NpdGlvbiB0aGUgY2xvc2UgYnV0dG9uIHJlbGF0aXZlIHRvIHRoZSBhbGVydCBib3hcclxuICogQHJldHVybnMge1RpbWVySGFuZGxlcn0gQ2xlYXIgdGltZW91dFxyXG4gKi9cclxuY29uc3QgY2xvc2VBbGVydCA9IGRpcmVjdGlvbiA9PiB7XHJcbiAgY29uc3QgY2xvc2VCdG5FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydF9fY2xvc2UnKTtcclxuXHJcbiAgaWYgKCFjbG9zZUJ0bkVsKSByZXR1cm47XHJcblxyXG4gIGNvbnN0IGFsZXJ0Qm94RWwgPSBjbG9zZUJ0bkVsLnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnRuRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKGBhbGVydC0taGlkZS0ke2RpcmVjdGlvbn1gKTtcclxuXHJcbiAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGFsZXJ0Qm94RWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChhbGVydEJveEVsKTtcclxuICAgIH0sIDEwMCAqIDYpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNob3dzIGFsZXJ0IGZvciBhIGdpdmVuIGR1cmF0aW9uXHJcbiAqICBAcGFyYW0ge1t7IG1lc3NhZ2U6IHN0cmluZyxhY3Rpb246IHN0cmluZywgbWVzc2FnZVR5cGU6ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdzdWNjZXNzJyB8ICdlcnJvcicsIGRpc3BsYXlQb3NpdGlvbjogJ2NlbnRlcicgfCAncmlnaHQnIHwgJ2xlZnQnLCBhbGVydERpc3BsYXlEdXJhdGlvbjogbnVtYmVyfV19IGNvb2tpZUZsYXNoTWVzc2FnZXMgQ29sbGVjdGlvbiBvZiBmbGFzaCBtZXNzYWdlcyBmcm9tIHRoZSBjbGllbnQgYnJvd3NlclxyXG4gKlxyXG4gKi9cclxuY29uc3Qgc2hvd0FsZXJ0ID0gZnVuY3Rpb24gKFxyXG4gIGFsZXJ0ID0ge1xyXG4gICAgbWVzc2FnZTogJycsXHJcbiAgICBhY3Rpb246ICcnLFxyXG4gICAgbWVzc2FnZVR5cGU6ICdzdWNjZXNzJyxcclxuICAgIGRpc3BsYXlQb3NpdGlvbjogJ2NlbnRlcicsXHJcbiAgICBhbGVydERpc3BsYXlEdXJhdGlvbjogNyxcclxuICB9XHJcbikge1xyXG4gIC8vIFByZXAgaW5jb21pbmcgYWxlcnRcclxuICBjb25zdCBkZWZhdWx0QWxlcnQgPSB7XHJcbiAgICBtZXNzYWdlVHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgZGlzcGxheVBvc2l0aW9uOiAnY2VudGVyJyxcclxuICAgIGFsZXJ0RGlzcGxheUR1cmF0aW9uOiA3LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHtcclxuICAgIG1lc3NhZ2UsXHJcbiAgICBhY3Rpb24sXHJcbiAgICBtZXNzYWdlVHlwZSxcclxuICAgIGRpc3BsYXlQb3NpdGlvbixcclxuICAgIGFsZXJ0RGlzcGxheUR1cmF0aW9uLFxyXG4gIH0gPSB7XHJcbiAgICAuLi5kZWZhdWx0QWxlcnQsXHJcbiAgICAuLi5hbGVydCxcclxuICB9O1xyXG5cclxuICAvLy8gaGlkZSBhbGVydCBmaXJzdFxyXG4gIC8vY29uc3QgY2xvc2VUaW1lciA9IGNsb3NlQWxlcnQoKTtcclxuICBjb25zdCBoaWRlVGltZXIgPSBoaWRlQWxlcnQoKTtcclxuXHJcbiAgLy8vIEdldCB0aGUgYWxlcnQgaG91c2luZyBlbGVtZW50XHJcbiAgY29uc3QgaGVhZGVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcblxyXG4gIC8vLyBHZW5lcmF0ZSBpY29uIG1vY2t1cFxyXG4gIGNvbnN0IGljb25NYXJrdXAgPSB0eXBlID0+IGA8aSBjbGFzcz1cImFsZXJ0X19pY29uIGFsZXJ0X19pY29uLS0ke3R5cGV9XCI+PC9pPmA7XHJcblxyXG4gIGNvbnN0IHNob3dQb3NpdGlvbiA9IGBhbGVydC0tJHtkaXNwbGF5UG9zaXRpb259YDtcclxuXHJcbiAgY29uc3Qgc2hvd1RpdGxlID0gYWN0aW9uXHJcbiAgICA/IGA8aDIgY2xhc3M9XCJhbGVydF9fdGl0bGUgYWxlcnRfX3RpdGxlLS0ke2Rpc3BsYXlQb3NpdGlvbn1cIj4ke2FjdGlvbn08L2gyPmBcclxuICAgIDogJyc7XHJcblxyXG4gIC8vLyByZXR1cm4gYSBjb25zdHJ1Y3RlZCBhbGVydCBkZXBlbmRpbmcgd2l0aCB0aGUgdHlwZVxyXG4gIGNvbnN0IGFsZXJ0TWFya3VwID0gYDxkaXYgY2xhc3M9XCJhbGVydCAke1xyXG4gICAgbWVzc2FnZVR5cGUgPyAnYWxlcnRfXycgKyBtZXNzYWdlVHlwZSA6ICcnXHJcbiAgfSAke3Nob3dQb3NpdGlvbn1cIj4gXHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFsZXJ0X19jbG9zZSBhbGVydF9fY2xvc2UtLSR7ZGlzcGxheVBvc2l0aW9ufVwiPiZ0aW1lczs8L2J1dHRvbj5cclxuICAgICAgICAke3Nob3dUaXRsZX1cclxuICAgICAgICA8cCBjbGFzcz1cImFsZXJ0X19jb250ZW50XCI+XHJcbiAgICAgICAgICAgJHtpY29uTWFya3VwKG1lc3NhZ2VUeXBlKX1cclxuICAgICAgICAgICAke21lc3NhZ2V9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICBgO1xyXG5cclxuICAvLy8gQWRkIG1hcmt1cCB0byB0aGUgRE9NXHJcbiAgaGVhZGVyRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBhbGVydE1hcmt1cCk7XHJcblxyXG4gIC8vLyBBdXRvIHJlbW92ZSBhbGVydFxyXG4gIGNvbnN0IGF1dG9UaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgaGlkZUFsZXJ0KGhpZGVUaW1lcik7XHJcbiAgfSwgMTAwMCAqIGFsZXJ0RGlzcGxheUR1cmF0aW9uKTtcclxuXHJcbiAgLy8gICAvLy8gQ2xvc2UgdGltZW91dCBiZWZvcmUgaGlkZWFsZXJ0XHJcbiAgY2xvc2VBbGVydChkaXNwbGF5UG9zaXRpb24sIGFsZXJ0RGlzcGxheUR1cmF0aW9uLCBhdXRvVGltZXIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2hvd0FsZXJ0O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./public/js/utils/showAlert.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "natours-review:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunknatours_review"] = self["webpackChunknatours_review"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/index.js");
/******/ 	
/******/ })()
;