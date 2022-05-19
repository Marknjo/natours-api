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
const redirectTo = function(url, configOptions = {
  directOption: "",
  allowDelay: false,
  delayPeriod: 10
}) {
  const { allowDelay, delayPeriod, redirectOption } = configOptions ? __spreadValues({
    redirectOption: "allowsGoBack",
    delayPeriod: 10
  }, configOptions) : {
    allowDelay: false,
    delayPeriod: 10,
    redirectOption: "allowsGoBack"
  };
  if (allowDelay) {
    setTimeout(() => {
      setRedirectOption(url, redirectOption);
    }, delayPeriod * 1e3);
  }
  setRedirectOption(url, redirectOption);
};
const setRedirectOption = function(url, options = "") {
  let redirectOption;
  switch (options) {
    case "pageRefresh":
      redirectOption = location.reload(url);
      break;
    case "allowsGoBack":
      redirectOption = location.assign(url);
      break;
    case "disallowGoBack":
      redirectOption = location.replace(url);
      break;
  }
  return redirectOption;
};
export { redirectTo as r };
