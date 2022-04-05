import { a as asyncErrorWrapper, h as httpRequestHelper, b as handleHttpErrors, r as redirectTo } from "./index.js";
const updateUser = (formEl) => {
  asyncErrorWrapper(async () => {
    const formData = new FormData(formEl);
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
  }, {
    message: "Updating User data failed!"
  }, {
    displayPosition: "right",
    action: "Invalid Inputs"
  });
};
export { updateUser as default };
