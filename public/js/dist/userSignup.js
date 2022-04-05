var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { a as asyncErrorWrapper, h as httpRequestHelper, b as handleHttpErrors } from "./index.js";
import { r as redirectTo } from "./redirectsHelper.js";
const userSignup = function(formEl) {
  return asyncErrorWrapper(async () => {
    const formData = new FormData(formEl);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const passwordConfirm = formData.get("passwordConfirm").trim();
    const remember = formData.get("remember");
    if (!name || !email || !password || !passwordConfirm)
      throw new Error("Required fields empty, please ensure your name, email, password, and password fields are not empty!");
    if (password !== passwordConfirm)
      throw new Error("Password do match, please ensure password and confirm password matches.");
    const url = "/api/v1/users/signup";
    const submitData = __spreadValues({
      name,
      email,
      password,
      passwordConfirm
    }, remember ? { remember } : {});
    const response = await httpRequestHelper(url, {
      submitData,
      dataType: "normal",
      requestMethod: "POST",
      sendPlainResponse: true
    });
    await handleHttpErrors(response, "Signup failed");
    redirectTo("/sys-admin", {
      redirectOption: "disallowGoBack"
    });
  }, {}, {
    displayPosition: "center",
    action: "Signup Validation Failed!",
    messageType: "error"
  });
};
export { userSignup as default };
