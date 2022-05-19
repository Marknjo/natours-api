import { a as asyncErrorWrapper, h as httpRequestHelper, b as handleHttpErrors } from "./index.js";
import { r as redirectTo } from "./redirectsHelper.js";
const handleLogout = async function() {
  return asyncErrorWrapper(async () => {
    const url = "/api/v1/users/logout";
    document.cookie = `originPageUrl=${location.pathname}; SameSite=Strict; expires:${new Date(Date.now() + 2 * 1e3)} Secure`;
    const response = await httpRequestHelper(url, {
      requestMethod: "GET",
      sendPlainResponse: true
    });
    if (!response.ok)
      throw new Error("Server error, could not logout successfully.");
    await handleHttpErrors(response, "Logout failed \u{1F622}\u{1F622}\u{1F622}. It seems there is an error login out.");
    const logoutFromUrl = location.pathname;
    if (logoutFromUrl.startsWith("/sys-admin")) {
      redirectTo("/", {
        redirectOption: "disallowGoBack"
      });
      return;
    }
    redirectTo(logoutFromUrl, {
      redirectOption: "pageRefresh"
    });
  });
};
export { handleLogout as default };
