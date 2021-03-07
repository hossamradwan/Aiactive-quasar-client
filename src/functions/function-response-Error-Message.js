import { showErrorMessage } from "src/functions/function-show-error-message";

export function responseErrorMessage(error) {
  if (error.message == "Network Error") {
    showErrorMessage("Server Offline");
    return;
  }

  if (error.response.status === 401) {
    showErrorMessage(error.response.data.message);
    return;
  } else if (error.response.status === 404) {
    showErrorMessage(error.response.data.message);
    return;
  }
}