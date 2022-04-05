import { a as asyncErrorWrapper, h as httpRequestHelper, b as handleHttpErrors, r as redirectTo } from "./index.js";
const handleLogin = async function(formEl) {
  return asyncErrorWrapper(async () => {
    const formData = new FormData(formEl);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password)
      throw new Error("Email or Password missing");
    const submitUrl = "/api/v1/users/login";
    const submitData = {
      email,
      password
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
