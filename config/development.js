import { LocalStorage } from "quasar";

export default {
  API_URL:
    `${LocalStorage.getItem("serverHost")}` || "http://196.219.234.3:3000"
};
