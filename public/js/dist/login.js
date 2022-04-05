import { a as asyncErrorWrapper, h as httpRequestHelper, b as handleHttpErrors } from "./index.js";
import { r as redirectTo } from "./redirectsHelper.js";
const handleLogin = async function(formEl) {
  return asyncErrorWrapper(async () => {
    const formData = new FormData(formEl);
    const email = formData.get("email");
    const password = formData.get("password");
    const remember = formData.get("remember");
    if (!email || !password)
      throw new Error("Email or Password missing");
    const submitUrl = "/api/v1/users/login";
    const submitData = {
      email,
      password,
      remember
    };
    const response = await httpRequestHelper(submitUrl, {
      submitData,
      dataType: "normal",
      requestMethod: "POST",
      sendPlainResponse: true
    });
    await handleHttpErrors(response, "Login failed \u{1F622}\u{1F622}\u{1F622}");
    redirectTo("/sys-admin", {
      redirectOption: "disallowGoBack",
      allowDelay: true
    });
  }, {}, {
    displayPosition: "center",
    action: "Login Error"
  });
};
export { handleLogin as default };
