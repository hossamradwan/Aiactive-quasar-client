import { LocalStorage } from "quasar";

export default {
  API_URL:
    `${LocalStorage.getItem("serverHost")}` || "http://192.168.1.165:3000",
};
