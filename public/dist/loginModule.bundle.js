"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunknatours_review"] = self["webpackChunknatours_review"] || []).push([["loginModule"],{

/***/ "./public/js/modules/login.js":
/*!************************************!*\
  !*** ./public/js/modules/login.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_httpRequestsHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/httpRequestsHelper.js */ \"./public/js/utils/httpRequestsHelper.js\");\n/* harmony import */ var _utils_redirectsHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/redirectsHelper.js */ \"./public/js/utils/redirectsHelper.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n/**\r\n * Handles user login\r\n * @todo Add CSRF protection\r\n *\r\n * @param {String} formEl form DOM element\r\n */\n\nvar handleLogin = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(function* (formEl) {\n    try {\n      // Handle form submit\n      // Form inputs\n      var formData = new FormData(formEl);\n      var email = formData.get('email');\n      var password = formData.get('password'); // Check if they are available before submiting\n\n      if (!email || !password) throw new Error('Email or Password missing'); // Submit data for processing\n\n      var submitUrl = '/api/v1/users/login';\n      var submitData = {\n        email,\n        password\n      };\n      var response = yield (0,_utils_httpRequestsHelper_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(submitUrl, {\n        submitData,\n        dataType: 'normal',\n        requestMethod: 'POST'\n      }); /// Successful login\n      // TODO Add successful message\n\n      console.log('Login was successful');\n      console.log(response); // Redirect to /sys-admin\n      // TODO: Redirect /sys-admin\n\n      (0,_utils_redirectsHelper_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('/', {\n        redirectOption: 'disallowGoBack',\n        allowDelay: true\n      });\n    } catch (error) {\n      /// Catch errors heres\n      // TODO Implement messaging\n      console.log(error.name);\n      console.error(error);\n    }\n  });\n\n  return function handleLogin(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar hdLoginBKP = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(function* (formEl) {\n    try {\n      // Handle form submit\n      // Form inputs\n      var formData = new FormData(formEl);\n      var email = formData.get('email');\n      var password = formData.get('password'); // Check if they are available before submiting\n\n      if (!email || !password) throw new Error('Email or Password missing'); // Submit data for processing\n\n      var submitUrl = '/api/v1/users/login';\n      var submitData = {\n        email,\n        password\n      };\n      var response = yield fetch(submitUrl, {\n        method: 'POST',\n        body: JSON.stringify(submitData),\n        credentials: 'same-origin',\n        referrerPolicy: 'no-referrer',\n        headers: {\n          'Content-Type': 'application/json; charset=utf-8'\n        }\n      });\n      var res = yield response.json(); /// Check for response errors\n\n      if (res.status !== 'success') {\n        throw new Error(res.message);\n      } /// Successful login\n      // TODO Add successful message\n\n\n      console.log('Login was successful'); // Redirect to /sys-admin\n      // TODO: Redirect /sys-admin\n\n      location.replace('/');\n    } catch (error) {\n      /// Catch errors heres\n      // TODO Implement messaging\n      console.log(error.name);\n      console.error(error);\n    }\n  });\n\n  return function hdLoginBKP(_x2) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleLogin);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvbW9kdWxlcy9sb2dpbi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBT0E7O0FBQ0E7QUFDQTtBQUdBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBdENBO0FBQUE7QUFBQTtBQUFBOztBQXdDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBTEE7QUFVQTs7QUFHQTtBQUNBO0FBQ0E7QUFHQTs7O0FBQ0E7QUFHQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWhEQTtBQUFBO0FBQUE7QUFBQTs7QUFrREEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uYXRvdXJzLXJldmlldy8uL3B1YmxpYy9qcy9tb2R1bGVzL2xvZ2luLmpzPzYzY2EiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGh0dHBSZXF1ZXN0SGVscGVyIGZyb20gJy4uL3V0aWxzL2h0dHBSZXF1ZXN0c0hlbHBlci5qcyc7XHJcbmltcG9ydCByZWRpcmVjdFRvIGZyb20gJy4uL3V0aWxzL3JlZGlyZWN0c0hlbHBlci5qcyc7XHJcblxyXG4vKipcclxuICogSGFuZGxlcyB1c2VyIGxvZ2luXHJcbiAqIEB0b2RvIEFkZCBDU1JGIHByb3RlY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGZvcm1FbCBmb3JtIERPTSBlbGVtZW50XHJcbiAqL1xyXG5jb25zdCBoYW5kbGVMb2dpbiA9IGFzeW5jIGZ1bmN0aW9uIChmb3JtRWwpIHtcclxuICB0cnkge1xyXG4gICAgLy8gSGFuZGxlIGZvcm0gc3VibWl0XHJcbiAgICAvLyBGb3JtIGlucHV0c1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybUVsKTtcclxuICAgIGNvbnN0IGVtYWlsID0gZm9ybURhdGEuZ2V0KCdlbWFpbCcpO1xyXG4gICAgY29uc3QgcGFzc3dvcmQgPSBmb3JtRGF0YS5nZXQoJ3Bhc3N3b3JkJyk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGhleSBhcmUgYXZhaWxhYmxlIGJlZm9yZSBzdWJtaXRpbmdcclxuICAgIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB0aHJvdyBuZXcgRXJyb3IoJ0VtYWlsIG9yIFBhc3N3b3JkIG1pc3NpbmcnKTtcclxuXHJcbiAgICAvLyBTdWJtaXQgZGF0YSBmb3IgcHJvY2Vzc2luZ1xyXG4gICAgY29uc3Qgc3VibWl0VXJsID0gJy9hcGkvdjEvdXNlcnMvbG9naW4nO1xyXG4gICAgY29uc3Qgc3VibWl0RGF0YSA9IHtcclxuICAgICAgZW1haWwsXHJcbiAgICAgIHBhc3N3b3JkLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGh0dHBSZXF1ZXN0SGVscGVyKHN1Ym1pdFVybCwge1xyXG4gICAgICBzdWJtaXREYXRhLFxyXG4gICAgICBkYXRhVHlwZTogJ25vcm1hbCcsXHJcbiAgICAgIHJlcXVlc3RNZXRob2Q6ICdQT1NUJyxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vLyBTdWNjZXNzZnVsIGxvZ2luXHJcbiAgICAvLyBUT0RPIEFkZCBzdWNjZXNzZnVsIG1lc3NhZ2VcclxuICAgIGNvbnNvbGUubG9nKCdMb2dpbiB3YXMgc3VjY2Vzc2Z1bCcpO1xyXG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG5cclxuICAgIC8vIFJlZGlyZWN0IHRvIC9zeXMtYWRtaW5cclxuICAgIC8vIFRPRE86IFJlZGlyZWN0IC9zeXMtYWRtaW5cclxuICAgIHJlZGlyZWN0VG8oJy8nLCB7IHJlZGlyZWN0T3B0aW9uOiAnZGlzYWxsb3dHb0JhY2snLCBhbGxvd0RlbGF5OiB0cnVlIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLy8gQ2F0Y2ggZXJyb3JzIGhlcmVzXHJcbiAgICAvLyBUT0RPIEltcGxlbWVudCBtZXNzYWdpbmdcclxuICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xyXG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgaGRMb2dpbkJLUCA9IGFzeW5jIGZ1bmN0aW9uIChmb3JtRWwpIHtcclxuICB0cnkge1xyXG4gICAgLy8gSGFuZGxlIGZvcm0gc3VibWl0XHJcbiAgICAvLyBGb3JtIGlucHV0c1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybUVsKTtcclxuICAgIGNvbnN0IGVtYWlsID0gZm9ybURhdGEuZ2V0KCdlbWFpbCcpO1xyXG4gICAgY29uc3QgcGFzc3dvcmQgPSBmb3JtRGF0YS5nZXQoJ3Bhc3N3b3JkJyk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGhleSBhcmUgYXZhaWxhYmxlIGJlZm9yZSBzdWJtaXRpbmdcclxuICAgIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB0aHJvdyBuZXcgRXJyb3IoJ0VtYWlsIG9yIFBhc3N3b3JkIG1pc3NpbmcnKTtcclxuXHJcbiAgICAvLyBTdWJtaXQgZGF0YSBmb3IgcHJvY2Vzc2luZ1xyXG4gICAgY29uc3Qgc3VibWl0VXJsID0gJy9hcGkvdjEvdXNlcnMvbG9naW4nO1xyXG4gICAgY29uc3Qgc3VibWl0RGF0YSA9IHtcclxuICAgICAgZW1haWwsXHJcbiAgICAgIHBhc3N3b3JkLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHN1Ym1pdFVybCwge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc3VibWl0RGF0YSksXHJcbiAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxyXG4gICAgICByZWZlcnJlclBvbGljeTogJ25vLXJlZmVycmVyJyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgLy8vIENoZWNrIGZvciByZXNwb25zZSBlcnJvcnNcclxuICAgIGlmIChyZXMuc3RhdHVzICE9PSAnc3VjY2VzcycpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5tZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8gU3VjY2Vzc2Z1bCBsb2dpblxyXG4gICAgLy8gVE9ETyBBZGQgc3VjY2Vzc2Z1bCBtZXNzYWdlXHJcbiAgICBjb25zb2xlLmxvZygnTG9naW4gd2FzIHN1Y2Nlc3NmdWwnKTtcclxuXHJcbiAgICAvLyBSZWRpcmVjdCB0byAvc3lzLWFkbWluXHJcbiAgICAvLyBUT0RPOiBSZWRpcmVjdCAvc3lzLWFkbWluXHJcbiAgICBsb2NhdGlvbi5yZXBsYWNlKCcvJyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIC8vLyBDYXRjaCBlcnJvcnMgaGVyZXNcclxuICAgIC8vIFRPRE8gSW1wbGVtZW50IG1lc3NhZ2luZ1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVMb2dpbjtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./public/js/modules/login.js\n");

/***/ }),

/***/ "./public/js/utils/redirectsHelper.js":
/*!********************************************!*\
  !*** ./public/js/utils/redirectsHelper.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n//\n\n/**\r\n *  Manages redirects -> Assign, reloadpage, delayedRedicts, redirect without going back\r\n * @param {string} url\r\n * @param {{ allowDelay: boolean, delayPeriod: number, redirectOption: 'pageRefresh' | 'allowsGoBack' | 'disallowGoBack' }} configOptions A list of configaration options\r\n * @returns {Location} action to redict\r\n */\nvar redirectTo = function redirectTo(url) {\n  var configOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {\n    directOption: '',\n    allowDelay: false,\n    delayPeriod: 10\n  };\n  // Initialize configurations\n  var {\n    allowDelay,\n    delayPeriod,\n    redirectOption\n  } = configOptions ? _objectSpread({\n    redirectOption: 'allowsGoBack',\n    delayPeriod: 10\n  }, configOptions) : {\n    allowDelay: false,\n    delayPeriod: 10,\n    redirectOption: 'allowsGoBack'\n  }; /// Handle delay cases\n\n  if (allowDelay) {\n    setTimeout(() => {\n      setRedirectOption(url, redirectOption);\n    }, delayPeriod * 1000);\n  } // No redirection -> select type of redirection\n\n\n  setRedirectOption(url, redirectOption);\n};\n/**\r\n *  Factory to Selects the ridirect option\r\n * @param {string} url Where to go\r\n * @param {'pageRefresh' | 'allowsGoBack' | 'disallowGoBack'} options Selects location reload, replace or assign methods\r\n * @returns {Location}\r\n */\n\n\nvar setRedirectOption = function setRedirectOption(url) {\n  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n  var redirectOption;\n\n  switch (options) {\n    case 'pageRefresh':\n      redirectOption = location.reload(url);\n      break;\n\n    case 'allowsGoBack':\n      redirectOption = location.assign(url);\n      break;\n\n    case 'disallowGoBack':\n      redirectOption = location.replace(url);\n      break;\n  }\n\n  return redirectOption;\n}; /// Export redirect\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (redirectTo);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvdXRpbHMvcmVkaXJlY3RzSGVscGVyLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBSkE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBSEE7QUFPQTtBQUNBO0FBQ0E7QUFIQTs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQVhBOztBQWNBO0FBQ0E7OztBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmF0b3Vycy1yZXZpZXcvLi9wdWJsaWMvanMvdXRpbHMvcmVkaXJlY3RzSGVscGVyLmpzPzZlOTgiXSwic291cmNlc0NvbnRlbnQiOlsiLy9cclxuXHJcbi8qKlxyXG4gKiAgTWFuYWdlcyByZWRpcmVjdHMgLT4gQXNzaWduLCByZWxvYWRwYWdlLCBkZWxheWVkUmVkaWN0cywgcmVkaXJlY3Qgd2l0aG91dCBnb2luZyBiYWNrXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcclxuICogQHBhcmFtIHt7IGFsbG93RGVsYXk6IGJvb2xlYW4sIGRlbGF5UGVyaW9kOiBudW1iZXIsIHJlZGlyZWN0T3B0aW9uOiAncGFnZVJlZnJlc2gnIHwgJ2FsbG93c0dvQmFjaycgfCAnZGlzYWxsb3dHb0JhY2snIH19IGNvbmZpZ09wdGlvbnMgQSBsaXN0IG9mIGNvbmZpZ2FyYXRpb24gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7TG9jYXRpb259IGFjdGlvbiB0byByZWRpY3RcclxuICovXHJcbmNvbnN0IHJlZGlyZWN0VG8gPSBmdW5jdGlvbiAoXHJcbiAgdXJsLFxyXG4gIGNvbmZpZ09wdGlvbnMgPSB7XHJcbiAgICBkaXJlY3RPcHRpb246ICcnLFxyXG4gICAgYWxsb3dEZWxheTogZmFsc2UsXHJcbiAgICBkZWxheVBlcmlvZDogMTAsXHJcbiAgfVxyXG4pIHtcclxuICAvLyBJbml0aWFsaXplIGNvbmZpZ3VyYXRpb25zXHJcbiAgY29uc3QgeyBhbGxvd0RlbGF5LCBkZWxheVBlcmlvZCwgcmVkaXJlY3RPcHRpb24gfSA9IGNvbmZpZ09wdGlvbnNcclxuICAgID8ge1xyXG4gICAgICAgIHJlZGlyZWN0T3B0aW9uOiAnYWxsb3dzR29CYWNrJyxcclxuICAgICAgICBkZWxheVBlcmlvZDogMTAsXHJcbiAgICAgICAgLi4uY29uZmlnT3B0aW9ucyxcclxuICAgICAgfVxyXG4gICAgOiB7XHJcbiAgICAgICAgYWxsb3dEZWxheTogZmFsc2UsXHJcbiAgICAgICAgZGVsYXlQZXJpb2Q6IDEwLFxyXG4gICAgICAgIHJlZGlyZWN0T3B0aW9uOiAnYWxsb3dzR29CYWNrJyxcclxuICAgICAgfTtcclxuXHJcbiAgLy8vIEhhbmRsZSBkZWxheSBjYXNlc1xyXG4gIGlmIChhbGxvd0RlbGF5KSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgc2V0UmVkaXJlY3RPcHRpb24odXJsLCByZWRpcmVjdE9wdGlvbik7XHJcbiAgICB9LCBkZWxheVBlcmlvZCAqIDEwMDApO1xyXG4gIH1cclxuXHJcbiAgLy8gTm8gcmVkaXJlY3Rpb24gLT4gc2VsZWN0IHR5cGUgb2YgcmVkaXJlY3Rpb25cclxuICBzZXRSZWRpcmVjdE9wdGlvbih1cmwsIHJlZGlyZWN0T3B0aW9uKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAgRmFjdG9yeSB0byBTZWxlY3RzIHRoZSByaWRpcmVjdCBvcHRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBXaGVyZSB0byBnb1xyXG4gKiBAcGFyYW0geydwYWdlUmVmcmVzaCcgfCAnYWxsb3dzR29CYWNrJyB8ICdkaXNhbGxvd0dvQmFjayd9IG9wdGlvbnMgU2VsZWN0cyBsb2NhdGlvbiByZWxvYWQsIHJlcGxhY2Ugb3IgYXNzaWduIG1ldGhvZHNcclxuICogQHJldHVybnMge0xvY2F0aW9ufVxyXG4gKi9cclxuY29uc3Qgc2V0UmVkaXJlY3RPcHRpb24gPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zID0gJycpIHtcclxuICBsZXQgcmVkaXJlY3RPcHRpb247XHJcblxyXG4gIHN3aXRjaCAob3B0aW9ucykge1xyXG4gICAgY2FzZSAncGFnZVJlZnJlc2gnOlxyXG4gICAgICByZWRpcmVjdE9wdGlvbiA9IGxvY2F0aW9uLnJlbG9hZCh1cmwpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlICdhbGxvd3NHb0JhY2snOlxyXG4gICAgICByZWRpcmVjdE9wdGlvbiA9IGxvY2F0aW9uLmFzc2lnbih1cmwpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlICdkaXNhbGxvd0dvQmFjayc6XHJcbiAgICAgIHJlZGlyZWN0T3B0aW9uID0gbG9jYXRpb24ucmVwbGFjZSh1cmwpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcblxyXG4gIHJldHVybiByZWRpcmVjdE9wdGlvbjtcclxufTtcclxuXHJcbi8vLyBFeHBvcnQgcmVkaXJlY3RcclxuZXhwb3J0IGRlZmF1bHQgcmVkaXJlY3RUbztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./public/js/utils/redirectsHelper.js\n");

/***/ })

}]);