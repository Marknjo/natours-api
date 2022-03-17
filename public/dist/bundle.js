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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadMapHandler\": () => (/* binding */ loadMapHandler),\n/* harmony export */   \"loginFormSubmitHandler\": () => (/* binding */ loginFormSubmitHandler)\n/* harmony export */ });\n/* harmony import */ var _utils_codeWrappers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/codeWrappers.js */ \"./public/js/utils/codeWrappers.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n/// Handles import of modules\n\n/**\r\n * Import Modules\r\n */\n\nvar getLoginModule = () => __webpack_require__.e(/*! import() | loginModule */ \"loginModule\").then(__webpack_require__.bind(__webpack_require__, /*! ./modules/login.js */ \"./public/js/modules/login.js\"));\n\nvar getLocationsMapModule = () => __webpack_require__.e(/*! import() | locationMap */ \"locationMap\").then(__webpack_require__.bind(__webpack_require__, /*! ./modules/locationsMap.js */ \"./public/js/modules/locationsMap.js\"));\n/**\r\n * Handle user login login with dynamic import. Import feature on demand\r\n * @param {Event} event from event listener\r\n */\n\n\nvar loginFormSubmitHandler = (0,_utils_codeWrappers_js__WEBPACK_IMPORTED_MODULE_0__.asyncImportWrapper)( /*#__PURE__*/_asyncToGenerator(function* () {\n  var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Event;\n  // Prevent form submit\n  event.preventDefault(); // try getting the login form\n\n  var {\n    default: handleLogin\n  } = yield getLoginModule(); // Login user\n\n  handleLogin(this);\n}), 'Error submitting form', true);\n/**\r\n * Handles Map import\r\n */\n\nvar loadMapHandler = (0,_utils_codeWrappers_js__WEBPACK_IMPORTED_MODULE_0__.asyncImportWrapper)( /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(function* (mapEl) {\n    var {\n      default: showLocationMap\n    } = getLocationsMapModule(); //Render Map\n\n    showLocationMap(mapEl.dataset.locations, mapEl.dataset.mapboxKey);\n  });\n\n  return function (_x) {\n    return _ref2.apply(this, arguments);\n  };\n}(), 'Could not load the MAP');//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvaW1wb3J0TW9kdWxlcy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTs7QUFHQTtBQU1BO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUFBO0FBQUE7O0FBR0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBOztBQUdBO0FBQ0E7O0FBTEE7QUFBQTtBQUFBO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uYXRvdXJzLXJldmlldy8uL3B1YmxpYy9qcy9pbXBvcnRNb2R1bGVzLmpzPzdlNGIiXSwic291cmNlc0NvbnRlbnQiOlsiLy8vIEhhbmRsZXMgaW1wb3J0IG9mIG1vZHVsZXNcclxuXHJcbmltcG9ydCB7IGFzeW5jSW1wb3J0V3JhcHBlciB9IGZyb20gJy4vdXRpbHMvY29kZVdyYXBwZXJzLmpzJztcclxuXHJcbi8qKlxyXG4gKiBJbXBvcnQgTW9kdWxlc1xyXG4gKi9cclxuY29uc3QgZ2V0TG9naW5Nb2R1bGUgPSAoKSA9PlxyXG4gIGltcG9ydCgvKndlYnBhY2tDaHVua05hbWU6IFwibG9naW5Nb2R1bGVcIiovICcuL21vZHVsZXMvbG9naW4uanMnKTtcclxuXHJcbmNvbnN0IGdldExvY2F0aW9uc01hcE1vZHVsZSA9ICgpID0+XHJcbiAgaW1wb3J0KFxyXG4gICAgLyogd2VicGFja0NodW5rTmFtZTogXCJsb2NhdGlvbk1hcFwiICovXHJcbiAgICAnLi9tb2R1bGVzL2xvY2F0aW9uc01hcC5qcydcclxuICApO1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSB1c2VyIGxvZ2luIGxvZ2luIHdpdGggZHluYW1pYyBpbXBvcnQuIEltcG9ydCBmZWF0dXJlIG9uIGRlbWFuZFxyXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBmcm9tIGV2ZW50IGxpc3RlbmVyXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9naW5Gb3JtU3VibWl0SGFuZGxlciA9IGFzeW5jSW1wb3J0V3JhcHBlcihcclxuICBhc3luYyBmdW5jdGlvbiAoZXZlbnQgPSBFdmVudCkge1xyXG4gICAgLy8gUHJldmVudCBmb3JtIHN1Ym1pdFxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvLyB0cnkgZ2V0dGluZyB0aGUgbG9naW4gZm9ybVxyXG4gICAgY29uc3QgeyBkZWZhdWx0OiBoYW5kbGVMb2dpbiB9ID0gYXdhaXQgZ2V0TG9naW5Nb2R1bGUoKTtcclxuXHJcbiAgICAvLyBMb2dpbiB1c2VyXHJcbiAgICBoYW5kbGVMb2dpbih0aGlzKTtcclxuICB9LFxyXG4gICdFcnJvciBzdWJtaXR0aW5nIGZvcm0nLFxyXG4gIHRydWVcclxuKTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIE1hcCBpbXBvcnRcclxuICovXHJcbmV4cG9ydCBjb25zdCBsb2FkTWFwSGFuZGxlciA9IGFzeW5jSW1wb3J0V3JhcHBlcihhc3luYyBmdW5jdGlvbiAobWFwRWwpIHtcclxuICBjb25zdCB7IGRlZmF1bHQ6IHNob3dMb2NhdGlvbk1hcCB9ID0gZ2V0TG9jYXRpb25zTWFwTW9kdWxlKCk7XHJcblxyXG4gIC8vUmVuZGVyIE1hcFxyXG4gIHNob3dMb2NhdGlvbk1hcChtYXBFbC5kYXRhc2V0LmxvY2F0aW9ucywgbWFwRWwuZGF0YXNldC5tYXBib3hLZXkpO1xyXG59LCAnQ291bGQgbm90IGxvYWQgdGhlIE1BUCcpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./public/js/importModules.js\n");

/***/ }),

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _importModules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./importModules.js */ \"./public/js/importModules.js\");\n // IMPORTS\n//import showLocationMap from './modules/locationsMap.js';\n\n /// GET DOM ELEMENTS\n\n/**\r\n * Map Element\r\n */\n\nvar mapEl = document.getElementById('map');\n/**\r\n * Login Form\r\n */\n\nvar loginFormEl = document.querySelector('.form__login'); /// COFIGURE DIFFERENT SCRIPTS\n\n/**\r\n * Get Map If it is set\r\n */\n\nif (mapEl) {\n  //showLocationMap(mapEl.dataset.locations);\n  // FIXME: Remove the code comment if the refactor works\n\n  /*const initMap = async () => {\r\n    try {\r\n      // Must use keyword deafult for default imports\r\n      const { default: showLocationMap } = await import(\r\n         webpackChunkName: \"locationMap\" \r\n        './modules/locationsMap.js'\r\n      );\r\n        //get\r\n      showLocationMap(mapEl.dataset.locations, mapEl.dataset.mapboxKey);\r\n    } catch (error) {\r\n      // TODO Add support for handling notification -> Error type here\r\n      console.log('Could not load the MAP');\r\n        // FIXME Remove this console log\r\n      console.log(error);\r\n    }\r\n    \r\n  };\r\n  \r\n  initMap();*/\n  // TEST: Test if it works (No internet currently)\n  _importModules_js__WEBPACK_IMPORTED_MODULE_0__.loadMapHandler(mapEl);\n}\n/**\r\n * handle login form\r\n */\n\n\nif (loginFormEl) {\n  // Listen to teh submit event\n  loginFormEl.addEventListener('submit', _importModules_js__WEBPACK_IMPORTED_MODULE_0__.loginFormSubmitHandler);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUVBOztBQUVBOztBQUdBO0FBQ0E7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTs7QUFJQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25hdG91cnMtcmV2aWV3Ly4vcHVibGljL2pzL2luZGV4LmpzPzRkZjgiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG4vLyBJTVBPUlRTXHJcbi8vaW1wb3J0IHNob3dMb2NhdGlvbk1hcCBmcm9tICcuL21vZHVsZXMvbG9jYXRpb25zTWFwLmpzJztcclxuXHJcbmltcG9ydCAqIGFzIG1vZHVsZSBmcm9tICcuL2ltcG9ydE1vZHVsZXMuanMnO1xyXG5cclxuLy8vIEdFVCBET00gRUxFTUVOVFNcclxuLyoqXHJcbiAqIE1hcCBFbGVtZW50XHJcbiAqL1xyXG5jb25zdCBtYXBFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcclxuXHJcbi8qKlxyXG4gKiBMb2dpbiBGb3JtXHJcbiAqL1xyXG5jb25zdCBsb2dpbkZvcm1FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19sb2dpbicpO1xyXG5cclxuLy8vIENPRklHVVJFIERJRkZFUkVOVCBTQ1JJUFRTXHJcblxyXG4vKipcclxuICogR2V0IE1hcCBJZiBpdCBpcyBzZXRcclxuICovXHJcbmlmIChtYXBFbCkge1xyXG4gIC8vc2hvd0xvY2F0aW9uTWFwKG1hcEVsLmRhdGFzZXQubG9jYXRpb25zKTtcclxuXHJcbiAgLy8gRklYTUU6IFJlbW92ZSB0aGUgY29kZSBjb21tZW50IGlmIHRoZSByZWZhY3RvciB3b3Jrc1xyXG4gIC8qY29uc3QgaW5pdE1hcCA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIE11c3QgdXNlIGtleXdvcmQgZGVhZnVsdCBmb3IgZGVmYXVsdCBpbXBvcnRzXHJcbiAgICAgIGNvbnN0IHsgZGVmYXVsdDogc2hvd0xvY2F0aW9uTWFwIH0gPSBhd2FpdCBpbXBvcnQoXHJcbiAgICAgICAgIHdlYnBhY2tDaHVua05hbWU6IFwibG9jYXRpb25NYXBcIiBcclxuICAgICAgICAnLi9tb2R1bGVzL2xvY2F0aW9uc01hcC5qcydcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vZ2V0XHJcbiAgICAgIHNob3dMb2NhdGlvbk1hcChtYXBFbC5kYXRhc2V0LmxvY2F0aW9ucywgbWFwRWwuZGF0YXNldC5tYXBib3hLZXkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgLy8gVE9ETyBBZGQgc3VwcG9ydCBmb3IgaGFuZGxpbmcgbm90aWZpY2F0aW9uIC0+IEVycm9yIHR5cGUgaGVyZVxyXG4gICAgICBjb25zb2xlLmxvZygnQ291bGQgbm90IGxvYWQgdGhlIE1BUCcpO1xyXG5cclxuICAgICAgLy8gRklYTUUgUmVtb3ZlIHRoaXMgY29uc29sZSBsb2dcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfTtcclxuICBcclxuICBpbml0TWFwKCk7Ki9cclxuXHJcbiAgLy8gVEVTVDogVGVzdCBpZiBpdCB3b3JrcyAoTm8gaW50ZXJuZXQgY3VycmVudGx5KVxyXG4gIG1vZHVsZS5sb2FkTWFwSGFuZGxlcihtYXBFbCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoYW5kbGUgbG9naW4gZm9ybVxyXG4gKi9cclxuXHJcbmlmIChsb2dpbkZvcm1FbCkge1xyXG4gIC8vIExpc3RlbiB0byB0ZWggc3VibWl0IGV2ZW50XHJcbiAgbG9naW5Gb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgbW9kdWxlLmxvZ2luRm9ybVN1Ym1pdEhhbmRsZXIpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./public/js/index.js\n");

/***/ }),

/***/ "./public/js/utils/codeWrappers.js":
/*!*****************************************!*\
  !*** ./public/js/utils/codeWrappers.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"asyncImportWrapper\": () => (/* binding */ asyncImportWrapper),\n/* harmony export */   \"errorHandlerWrapper\": () => (/* binding */ errorHandlerWrapper)\n/* harmony export */ });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n/**\r\n * All related functions for wrapping code\r\n * - imports, trycatch, etc.\r\n */\n\n/**\r\n * Helper method to abstract error handling\r\n * @param {Error} error Error object\r\n * @param {String} message Custom message passed on implementing the wrapper\r\n */\nvar handleErrors = (error, message) => {\n  // TODO Add support for handling notification -> Error type here\n  console.log(message ? message : 'Error occured!');\n  alert(message ? message : 'Error occured!'); // FIXME Remove this console log\n\n  console.log(error);\n};\n/**\r\n * Helper function for importing and handlering errors\r\n *\r\n * Keeps internal logic cleaner\r\n *\r\n * Wraps code with add event listener and that without, either with arguments or not\r\n * @param {Promise} cb Generic callback function returned after import of a module\r\n * @param {String} message Error message\r\n * @param {Boolean} hasEvent Wraps code for event listeners\r\n * @param {Boolean} allowErrorThrow Pass error handling to the requesting function\r\n */\n\n\nvar asyncImportWrapper = function asyncImportWrapper() {\n  var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Promise;\n  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n  var hasEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  var allowErrorThrow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n\n  // Check that there is requirement for handling events\n  if (hasEvent) {\n    return /*#__PURE__*/_asyncToGenerator(function* () {\n      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Event;\n\n      try {\n        yield cb(event);\n      } catch (error) {\n        // Throw error if it is allowed\n        if (allowErrorThrow) {\n          throw error;\n        } // Show message is throw error is not configure to true\n\n\n        handleErrors(error, message);\n      }\n    });\n  } /// Handling non event import options\n\n\n  return /*#__PURE__*/function () {\n    var _ref2 = _asyncToGenerator(function* (argsOptions) {\n      try {\n        // Does not have any event\n        if (argsOptions) {\n          yield cb(argsOptions);\n          return;\n        }\n\n        return yield cb();\n      } catch (error) {\n        // Throw error if it is allowed\n        if (allowErrorThrow) {\n          throw error;\n        } // Show message is throw error is not configure to true\n\n\n        handleErrors(error, message);\n      }\n    });\n\n    return function (_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n};\n/**\r\n * Abstracts error handling from the calling function\r\n *\r\n * @param {Function} cb Internal details of the calling function\r\n * @param {String} message Error massage\r\n * @param {Boolean} allowErrorThrow Pass error handling to the requesting function\r\n * @returns {void}\r\n */\n\nvar errorHandlerWrapper = function errorHandlerWrapper() {\n  var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};\n  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n  var allowErrorThrow = arguments.length > 2 ? arguments[2] : undefined;\n\n  /**\r\n   * @param {T extends any[]} args Arguments passed to the calleback function\r\n   */\n  return function () {\n    try {\n      cb(...arguments);\n    } catch (error) {\n      // Throw error if it is allowed\n      if (allowErrorThrow) {\n        throw error;\n      } // Show message is throw error is not configure to true\n\n\n      handleErrors(error, message);\n    }\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvdXRpbHMvY29kZVdyYXBwZXJzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBbEJBO0FBQUE7QUFBQTtBQUFBO0FBbUJBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUlBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25hdG91cnMtcmV2aWV3Ly4vcHVibGljL2pzL3V0aWxzL2NvZGVXcmFwcGVycy5qcz8yYTYwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBbGwgcmVsYXRlZCBmdW5jdGlvbnMgZm9yIHdyYXBwaW5nIGNvZGVcclxuICogLSBpbXBvcnRzLCB0cnljYXRjaCwgZXRjLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgbWV0aG9kIHRvIGFic3RyYWN0IGVycm9yIGhhbmRsaW5nXHJcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIEVycm9yIG9iamVjdFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBDdXN0b20gbWVzc2FnZSBwYXNzZWQgb24gaW1wbGVtZW50aW5nIHRoZSB3cmFwcGVyXHJcbiAqL1xyXG5jb25zdCBoYW5kbGVFcnJvcnMgPSAoZXJyb3IsIG1lc3NhZ2UpID0+IHtcclxuICAvLyBUT0RPIEFkZCBzdXBwb3J0IGZvciBoYW5kbGluZyBub3RpZmljYXRpb24gLT4gRXJyb3IgdHlwZSBoZXJlXHJcbiAgY29uc29sZS5sb2cobWVzc2FnZSA/IG1lc3NhZ2UgOiAnRXJyb3Igb2NjdXJlZCEnKTtcclxuICBhbGVydChtZXNzYWdlID8gbWVzc2FnZSA6ICdFcnJvciBvY2N1cmVkIScpO1xyXG5cclxuICAvLyBGSVhNRSBSZW1vdmUgdGhpcyBjb25zb2xlIGxvZ1xyXG4gIGNvbnNvbGUubG9nKGVycm9yKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGltcG9ydGluZyBhbmQgaGFuZGxlcmluZyBlcnJvcnNcclxuICpcclxuICogS2VlcHMgaW50ZXJuYWwgbG9naWMgY2xlYW5lclxyXG4gKlxyXG4gKiBXcmFwcyBjb2RlIHdpdGggYWRkIGV2ZW50IGxpc3RlbmVyIGFuZCB0aGF0IHdpdGhvdXQsIGVpdGhlciB3aXRoIGFyZ3VtZW50cyBvciBub3RcclxuICogQHBhcmFtIHtQcm9taXNlfSBjYiBHZW5lcmljIGNhbGxiYWNrIGZ1bmN0aW9uIHJldHVybmVkIGFmdGVyIGltcG9ydCBvZiBhIG1vZHVsZVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBFcnJvciBtZXNzYWdlXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaGFzRXZlbnQgV3JhcHMgY29kZSBmb3IgZXZlbnQgbGlzdGVuZXJzXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYWxsb3dFcnJvclRocm93IFBhc3MgZXJyb3IgaGFuZGxpbmcgdG8gdGhlIHJlcXVlc3RpbmcgZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBhc3luY0ltcG9ydFdyYXBwZXIgPSBmdW5jdGlvbiAoXHJcbiAgY2IgPSBQcm9taXNlLFxyXG4gIG1lc3NhZ2UgPSAnJyxcclxuICBoYXNFdmVudCA9IGZhbHNlLFxyXG4gIGFsbG93RXJyb3JUaHJvdyA9IGZhbHNlXHJcbikge1xyXG4gIC8vIENoZWNrIHRoYXQgdGhlcmUgaXMgcmVxdWlyZW1lbnQgZm9yIGhhbmRsaW5nIGV2ZW50c1xyXG4gIGlmIChoYXNFdmVudCkge1xyXG4gICAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIChldmVudCA9IEV2ZW50KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgY2IoZXZlbnQpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIC8vIFRocm93IGVycm9yIGlmIGl0IGlzIGFsbG93ZWRcclxuICAgICAgICBpZiAoYWxsb3dFcnJvclRocm93KSB7XHJcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNob3cgbWVzc2FnZSBpcyB0aHJvdyBlcnJvciBpcyBub3QgY29uZmlndXJlIHRvIHRydWVcclxuICAgICAgICBoYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8vIEhhbmRsaW5nIG5vbiBldmVudCBpbXBvcnQgb3B0aW9uc1xyXG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiAoYXJnc09wdGlvbnMpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIERvZXMgbm90IGhhdmUgYW55IGV2ZW50XHJcbiAgICAgIGlmIChhcmdzT3B0aW9ucykge1xyXG4gICAgICAgIGF3YWl0IGNiKGFyZ3NPcHRpb25zKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBhd2FpdCBjYigpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgaXQgaXMgYWxsb3dlZFxyXG4gICAgICBpZiAoYWxsb3dFcnJvclRocm93KSB7XHJcbiAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNob3cgbWVzc2FnZSBpcyB0aHJvdyBlcnJvciBpcyBub3QgY29uZmlndXJlIHRvIHRydWVcclxuICAgICAgaGFuZGxlRXJyb3JzKGVycm9yLCBtZXNzYWdlKTtcclxuICAgIH1cclxuICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0cyBlcnJvciBoYW5kbGluZyBmcm9tIHRoZSBjYWxsaW5nIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIEludGVybmFsIGRldGFpbHMgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb25cclxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgRXJyb3IgbWFzc2FnZVxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGFsbG93RXJyb3JUaHJvdyBQYXNzIGVycm9yIGhhbmRsaW5nIHRvIHRoZSByZXF1ZXN0aW5nIGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHt2b2lkfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGVycm9ySGFuZGxlcldyYXBwZXIgPSBmdW5jdGlvbiAoXHJcbiAgY2IgPSAoKSA9PiB7fSxcclxuICBtZXNzYWdlID0gJycsXHJcbiAgYWxsb3dFcnJvclRocm93XHJcbikge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VCBleHRlbmRzIGFueVtdfSBhcmdzIEFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGNhbGxlYmFjayBmdW5jdGlvblxyXG4gICAqL1xyXG4gIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY2IoLi4uYXJncyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAvLyBUaHJvdyBlcnJvciBpZiBpdCBpcyBhbGxvd2VkXHJcbiAgICAgIGlmIChhbGxvd0Vycm9yVGhyb3cpIHtcclxuICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU2hvdyBtZXNzYWdlIGlzIHRocm93IGVycm9yIGlzIG5vdCBjb25maWd1cmUgdG8gdHJ1ZVxyXG4gICAgICBoYW5kbGVFcnJvcnMoZXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gIH07XHJcbn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./public/js/utils/codeWrappers.js\n");

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