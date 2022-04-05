import { a as asyncErrorWrapper, h as httpRequestHelper, b as handleHttpErrors } from "./index.js";
import { r as redirectTo } from "./redirectsHelper.js";
const updateUserPassword = (formEl) => {
  asyncErrorWrapper(async () => {
    const formData = new FormData(formEl);
    const passwordCurrent = formData.get("passwordCurrent");
    const passwordConfirm = formData.get("passwordConfirm");
    const password = formData.get("password");
    if (!password || !passwordConfirm || !passwordCurrent) {
      throw new Error("One of the password fields is empty, ensure all fields have valid inputs");
    }
    const url = "/api/v1/users/update-password";
    const submitData = {
      password,
      passwordConfirm,
      passwordCurrent
    };
    const response = await httpRequestHelper(url, {
      sendPlainResponse: true,
      submitData,
      requestMethod: "PATCH",
      dataType: "normal"
    });
    await handleHttpErrors(response, "Could not update your password!");
    redirectTo("/sys-admin/profile", {
      redirectOption: "pageRefresh"
    });
  }, {}, {
    displayPosition: "right",
    action: "Invalid Inputs"
  });
};
export { updateUserPassword as default };
