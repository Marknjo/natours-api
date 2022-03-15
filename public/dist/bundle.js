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

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_locationsMap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/locationsMap.js */ \"./public/js/modules/locationsMap.js\");\n// IMPORTS\n /// GET DOM ELEMENTS\n\n/**\r\n * Map Element\r\n */\n\nvar mapEl = document.getElementById('map'); /// COFIGURE DIFFERENT SCRIPTS\n\n/**\r\n * Get Map If it is set\r\n */\n\nif (mapEl) {\n  (0,_modules_locationsMap_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(mapEl.dataset.locations);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTs7QUFDQTs7QUFJQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmF0b3Vycy1yZXZpZXcvLi9wdWJsaWMvanMvaW5kZXguanM/NGRmOCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJTVBPUlRTXHJcbmltcG9ydCBzaG93TG9jYXRpb25NYXAgZnJvbSAnLi9tb2R1bGVzL2xvY2F0aW9uc01hcC5qcyc7XHJcblxyXG4vLy8gR0VUIERPTSBFTEVNRU5UU1xyXG4vKipcclxuICogTWFwIEVsZW1lbnRcclxuICovXHJcbmNvbnN0IG1hcEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xyXG5cclxuLy8vIENPRklHVVJFIERJRkZFUkVOVCBTQ1JJUFRTXHJcblxyXG4vKipcclxuICogR2V0IE1hcCBJZiBpdCBpcyBzZXRcclxuICovXHJcbmlmIChtYXBFbCkge1xyXG4gIHNob3dMb2NhdGlvbk1hcChtYXBFbC5kYXRhc2V0LmxvY2F0aW9ucyk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./public/js/index.js\n");

/***/ }),

/***/ "./public/js/modules/locationsMap.js":
/*!*******************************************!*\
  !*** ./public/js/modules/locationsMap.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * Adds map to the UI\r\n * @param {String} mapLocations JSON string of maps\r\n */\nvar showLocationMap = mapLocations => {\n  // Get locations\n  var locations = JSON.parse(mapLocations);\n  console.log(locations); // Init Map\n  // Set Map bounds\n  // Define markers and popup\n  // Place map on teh DOM\n}; // Export\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showLocationMap);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvbW9kdWxlcy9sb2NhdGlvbnNNYXAuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUVBO0FBRUE7QUFDQTs7O0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uYXRvdXJzLXJldmlldy8uL3B1YmxpYy9qcy9tb2R1bGVzL2xvY2F0aW9uc01hcC5qcz82YzY2Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBZGRzIG1hcCB0byB0aGUgVUlcclxuICogQHBhcmFtIHtTdHJpbmd9IG1hcExvY2F0aW9ucyBKU09OIHN0cmluZyBvZiBtYXBzXHJcbiAqL1xyXG5jb25zdCBzaG93TG9jYXRpb25NYXAgPSBtYXBMb2NhdGlvbnMgPT4ge1xyXG4gIC8vIEdldCBsb2NhdGlvbnNcclxuICBjb25zdCBsb2NhdGlvbnMgPSBKU09OLnBhcnNlKG1hcExvY2F0aW9ucyk7XHJcblxyXG4gIGNvbnNvbGUubG9nKGxvY2F0aW9ucyk7XHJcblxyXG4gIC8vIEluaXQgTWFwXHJcblxyXG4gIC8vIFNldCBNYXAgYm91bmRzXHJcblxyXG4gIC8vIERlZmluZSBtYXJrZXJzIGFuZCBwb3B1cFxyXG5cclxuICAvLyBQbGFjZSBtYXAgb24gdGVoIERPTVxyXG59O1xyXG5cclxuLy8gRXhwb3J0XHJcbmV4cG9ydCBkZWZhdWx0IHNob3dMb2NhdGlvbk1hcDtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./public/js/modules/locationsMap.js\n");

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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/index.js");
/******/ 	
/******/ })()
;