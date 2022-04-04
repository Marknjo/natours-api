var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const hideAlert = (timer) => {
  const alert = document.querySelector(".alert");
  if (!alert)
    return;
  if (timer)
    clearTimeout(timer);
  alert.classList.add(`alert--hide`);
  return setTimeout(() => {
    alert.parentElement.removeChild(alert);
  }, 100 * 6);
};
const closeAlert = (direction, timer) => {
  const closeBtnEl = document.querySelector(".alert__close");
  if (!closeBtnEl)
    return;
  const alertBoxEl = closeBtnEl.parentElement;
  closeBtnEl.addEventListener("click", function(event) {
    timer && clearTimeout(timer);
    this.parentElement.classList.add(`alert--hide-${direction}`);
    return setTimeout(() => {
      alertBoxEl.parentElement.removeChild(alertBoxEl);
    }, 100 * 6);
  });
};
const showAlert = function(alert = {
  message: "",
  action: "",
  viewStatus: "",
  removeAfter: "",
  messageType: "success",
  displayPosition: "center",
  alertDisplayDuration: 7
}) {
  const defaultAlert = {
    messageType: "success",
    displayPosition: "center",
    alertDisplayDuration: 7
  };
  const {
    message,
    action,
    messageType,
    displayPosition,
    alertDisplayDuration,
    viewStatus,
    removeAfter
  } = __spreadValues(__spreadValues({}, defaultAlert), alert);
  if (viewStatus && removeAfter && viewStatus === "viewed" && removeAfter === "timeExpires" && !location.pathname.startsWith("/sys-admin"))
    return;
  const hideTimer = hideAlert();
  const headerEl = document.querySelector(".header");
  const iconMarkup = (type) => `<i class="alert__icon alert__icon--${type}"></i>`;
  const showPosition = `alert--${displayPosition}`;
  const showTitle = action ? `<h2 class="alert__title alert__title--${displayPosition}">${action}</h2>` : "";
  const alertMarkup = `<div class="alert ${messageType ? "alert__" + messageType : ""} ${showPosition}"> 
        <button class="alert__close alert__close--${displayPosition}">&times;</button>
        ${showTitle}
        <p class="alert__content">
           ${iconMarkup(messageType)}
           ${message}
        </p>
    </div>
    `;
  headerEl.insertAdjacentHTML("beforeend", alertMarkup);
  const autoTimer = setTimeout(() => {
    hideAlert(hideTimer);
  }, 1e3 * alertDisplayDuration);
  closeAlert(displayPosition, autoTimer);
};
const handleErrors = (error, message) => {
  const getMessage = message ? message : error.message;
  showAlert({
    message: getMessage,
    messageType: "error",
    action: "Error message",
    displayPosition: "right"
  });
  console.log(error);
};
const errorWrapper = function(cb = () => {
}, confingOptions = {
  message: "",
  allowErrorThrow: false
}) {
  const { message, allowErrorThrow } = __spreadValues({
    message: "",
    allowErrorThrow: false
  }, confingOptions ? confingOptions : {});
  try {
    return cb();
  } catch (error) {
    if (allowErrorThrow) {
      throw error;
    }
    handleErrors(error, message);
  }
};
const asyncErrorWrapper = async function(cb = () => {
}, confingOptions = {
  message: "",
  allowErrorThrow: false
}) {
  const { message, allowErrorThrow } = __spreadValues({
    message: "",
    allowErrorThrow: false
  }, confingOptions ? confingOptions : {});
  try {
    return await cb();
  } catch (error) {
    if (allowErrorThrow) {
      console.log("Error thrown \u{1F6A9}\u{1F6A9}\u{1F6A9}\u{1F6A9}\n");
      throw error;
    }
    console.log(`Error received from: ${location.pathname}
`);
    handleErrors(error, message);
  }
};
const handleHttpErrors = async (response, errorMessage) => {
  const res = await response.json();
  if (res.status !== "success") {
    let errMessage = res.data.errorMessage ? res.data.errorMessage : errorMessage;
    errMessage = res.data.message ? res.data.message : errorMessage;
    throw new Error(errMessage);
  }
  return res;
};
const httpRequestHelper = async function(requestUrl, configOptions = {
  submitData: {},
  requestMethod: "",
  dataType: "normal",
  allowRedirect: false,
  redirectUrl: "",
  sendPlainResponse: false
}) {
  return asyncErrorWrapper(async () => {
    const defaultConfigs = {
      dataType: "normal",
      allowRedirect: false,
      redirectUrl: "",
      sendPlainResponse: false
    };
    const {
      requestMethod,
      submitData,
      dataType,
      allowRedirect,
      redirectUrl,
      sendPlainResponse
    } = __spreadValues(__spreadValues({}, defaultConfigs), configOptions);
    let requestOptions = {
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
      redirect: "follow"
    };
    switch (requestMethod) {
      case "POST":
      case "PATCH":
      case "PUT":
        if (dataType === "normal") {
          requestOptions = __spreadValues({
            method: requestMethod,
            body: JSON.stringify(submitData),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          }, requestOptions);
        }
        if (dataType === "attachment") {
          requestOptions = __spreadValues({
            method: requestMethod,
            body: submitData
          }, requestOptions);
        }
        break;
      case "GET":
        requestOptions = __spreadValues({
          method: "GET"
        }, requestOptions);
        break;
      default:
        throw new Error("Method request currently unsupported");
    }
    const response = await fetch(requestUrl, requestOptions);
    if (!allowRedirect && sendPlainResponse)
      return response;
    if (!response.ok && !sendPlainResponse)
      throw new Error("Request unsuccessful \u{1F4A5}\u{1F4A5}\u{1F4A5}");
    if (!sendPlainResponse) {
      const res = await response.json();
      if (res.status !== "success")
        throw new Error(res);
      if (!allowRedirect)
        return res;
    }
    if (allowRedirect) {
      location.replace(redirectUrl);
    }
  }, { allowErrorThrow: true });
};
const getLoginModule = () => import("./login.js");
const getLocationsMapModule = () => import("./locationsMap.js");
const getLogoutModule = () => import("./logout.js");
const getErrorModal = () => import("./errorModal.js");
const loginFormSubmitHandler = async function(event = Event) {
  return asyncErrorWrapper(async () => {
    event.preventDefault();
    const { default: handleLogin } = await getLoginModule();
    handleLogin(event.target);
  }, {
    message: "Error submitting form"
  });
};
const loadMapHandler = function(mapEl2) {
  return asyncErrorWrapper(async () => {
    const { default: showLocationMap } = await getLocationsMapModule();
    showLocationMap(mapEl2.dataset.locations, mapEl2.dataset.mapboxKey);
  }, { message: "Could not load the MAP" });
};
const logoutHandler = async function() {
  return asyncErrorWrapper(async () => {
    const { default: handleLogout } = await getLogoutModule();
    handleLogout();
  }, { allowErrorThrow: true });
};
const showErrorModalHandler = function(errorObj) {
  return errorWrapper(async () => {
    const { showErrorModal, showErrorBackdrop } = await getErrorModal();
    showErrorBackdrop(errorObj);
    showErrorModal(errorObj);
  }, { message: "Could not load error modal" });
};
const sendViewedFlashMessage = (flashMessage, messageViewed = false) => {
  let submitData = flashMessage;
  if (messageViewed) {
    submitData = __spreadProps(__spreadValues({}, submitData), {
      viewStatus: "viewed"
    });
  }
  const requestUrl = "/viewed-flash-message";
  const configOptions = {
    submitData,
    requestMethod: "POST",
    dataType: "normal",
    allowRedirect: false,
    sendPlainResponse: true
  };
  const res = httpRequestHelper(requestUrl, configOptions);
  return res;
};
const showFlashMessageAndRemoveShown = async (flashMessage, userRole) => asyncErrorWrapper(async () => {
  if (flashMessage.showOnPage !== location.pathname)
    return;
  if (flashMessage.showOnPage.startsWith("/sys-admin")) {
  }
  showAlert(__spreadProps(__spreadValues({}, flashMessage), {
    displayPosition: "right"
  }));
  if (flashMessage.removeAfter === "timeExpires" && flashMessage.viewStatus === "viewed")
    return;
  const res = await sendViewedFlashMessage(flashMessage);
  if (userRole !== "admin" || res.ok && res.status === 200)
    return;
  showAlert({
    message: `Error showing the notification: ${flashMessage.message}`,
    displayPosition: "right",
    messageType: "info"
  });
}, { allowErrorThrow: true });
const handleFlashMessages = async (flashMessagesObj, userRole) => {
  if (!flashMessagesObj)
    return;
  const flashMessages = JSON.parse(flashMessagesObj);
  if (flashMessages.length === 0)
    return;
  if (flashMessages.length > 1) {
    flashMessages.forEach((flashMessage) => {
      showFlashMessageAndRemoveShown(flashMessage, userRole);
    });
    return;
  }
  showFlashMessageAndRemoveShown(flashMessages[0], userRole);
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
const mapEl = document.getElementById("map");
const loginFormEl = document.querySelector(".form__login");
const logoutEl = document.getElementById("logout");
const userDataFormEl = document.querySelector(".form-user-data");
const bodyEl = document.body;
if (mapEl)
  loadMapHandler(mapEl);
if (loginFormEl) {
  loginFormEl.addEventListener("submit", loginFormSubmitHandler);
}
if (logoutEl)
  logoutEl.addEventListener("click", logoutHandler);
if (bodyEl) {
  const flashMessagesObj = bodyEl.dataset.flashMessages;
  const userRole = bodyEl.dataset.userRole ? bodyEl.dataset.userRole : "";
  handleFlashMessages(flashMessagesObj, userRole);
}
if (bodyEl) {
  let errorObj = bodyEl.dataset.pageError;
  if (errorObj) {
    showErrorModalHandler(errorObj);
  }
}
if (userDataFormEl) {
  userDataFormEl.addEventListener("submit", async function(event) {
    try {
      event.preventDefault();
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      if (!name || !email) {
        throw new Error("Name and Email requred in the field.");
      }
      const url = "/api/v1/users/update-me";
      const response = await httpRequestHelper(url, {
        sendPlainResponse: true,
        submitData: formData,
        requestMethod: "PATCH",
        dataType: "attachment"
      });
      await handleHttpErrors(response, "Could not update form data!");
      redirectTo("/sys-admin/profile", {
        redirectOption: "pageRefresh"
      });
    } catch (error) {
      showAlert({
        message: error.message,
        messageType: "error",
        displayPosition: "center",
        action: "Invalid Inputs"
      });
    }
  });
}
export { asyncErrorWrapper as a, handleHttpErrors as b, errorWrapper as e, httpRequestHelper as h, redirectTo as r };
