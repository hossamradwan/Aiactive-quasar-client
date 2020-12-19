import { LocalStorage } from "quasar";

export default {
  API_URL: `${LocalStorage.getItem("serverHost")}` || "http://192.168.56.1:3000"
};
