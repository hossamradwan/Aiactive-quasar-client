import config from "@/../config/config";
import { Loading, Notify } from "quasar";
import axios from "axios";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { responseErrorMessage } from "../functions/function-response-Error-Message";
const state = {
  ip: `192.168.1.26`,
  port: 8080,
  credentials: { mail: "marco@aiactive.com", pass: "MAR@2021#ai" },

  API_KEY: null,
  GROUP_KEY: null,
  monitors: []
};
const shinobiApi = axios.create({
  baseURL: `http://${state.ip}:${state.port}`
});

const mutations = {
  setApiKey(state, payload) {
    state.API_KEY = payload;
  },
  setGroupKey(state, payload) {
    state.GROUP_KEY = payload;
  },
  setMonitors(state, payload) {
    // todo: check if not previously added
    state.monitors = payload;
  }
};

const actions = {
  login({ commit }) {
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let api = "/?json=true";
        let body = state.credentials;
        shinobiApi
          .post(api, body)
          .then(response => {
            commit("setApiKey", response.data.$user.auth_token);
            commit("setGroupKey", response.data.$user.ke);
          })
          .catch(error => {
            responseErrorMessage(error);
          })
          .finally();
      });
    }, 500);
  },
  getMonitors({ commit }) {
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let api = `${state.API_KEY}/monitor/${state.GROUP_KEY}`;

        shinobiApi
          .get(api)
          .then(response => {
            let monitors = [];
            response.data.map(monitor => {
              monitors.push({ name: monitor.name, id: monitor.mid });
            });
            console.log("monitors:", monitors);
            commit("setMonitors", monitors);
          })
          .catch(error => {
            responseErrorMessage(error);
          })
          .finally();
      });
    }, 500);
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
