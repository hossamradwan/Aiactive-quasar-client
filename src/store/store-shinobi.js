import config from "@/../config/config";
import { Loading, Notify } from "quasar";
import axios from "axios";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { responseErrorMessage } from "../functions/function-response-Error-Message";
import shionbiAddApi from "./shinobi-key";
const state = {
  ip: `192.168.1.26`,
  port: 8080,
  credentials: { mail: "marco@aiactive.com", pass: "MAR@2021#ai" },
  keys: {
    API_KEY: null,
    GROUP_KEY: null
  },
  monitors: []
};
const shinobiApi = axios.create({
  baseURL: `http://${state.ip}:${state.port}`
});

const mutations = {
  setApiKey(state, payload) {
    state.keys.API_KEY = payload;
  },
  setGroupKey(state, payload) {
    state.keys.GROUP_KEY = payload;
  },
  setMonitors(state, payload) {
    // todo: check if not previously added
    state.monitors = payload;
  }
};

const actions = {
  // Login on boot
  login({ commit, dispatch }) {
    setTimeout(() => {
      const promise = new Promise((resolve, reject) => {
        let api = "/?json=true";
        let body = state.credentials;
        shinobiApi
          .post(api, body)
          .then(response => {
            commit("setApiKey", response.data.$user.auth_token);
            // console.log("login.keys.API_KEY:", state.keys.API_KEY);
            commit("setGroupKey", response.data.$user.ke);
            resolve(response);
            console.log("Shinobi Loggedin");
            dispatch("getMonitors");
          })
          .catch(error => {
            responseErrorMessage(error, "Shinobi ");
            reject(error);
          })
          .finally();
      });
      return promise;
    }, 500);
  },

  // Get All Monitors
  getMonitors({ commit }) {
    console.log("getMonitors");
    setTimeout(() => {
      const promise = new Promise((resolve, reject) => {
        let api = `${state.keys.API_KEY}/monitor/${state.keys.GROUP_KEY}`;

        shinobiApi
          .get(api)
          .then(response => {
            // console.log("get response:", response.data[0]);
            let monitors = [];
            response.data.map(monitor => {
              monitors.push({ name: monitor.name, id: monitor.mid });
            });
            commit("setMonitors", monitors);
            resolve(response);
            console.log("monitors:", state.monitors);
          })
          .catch(error => {
            responseErrorMessage(error);
          })
          .finally();
      });
      return promise;
    }, 500);
  },

  // Add/Update Monitor
  addMonitor({ dispatch }, payload) {
    console.log("addMonitor payload:", payload);
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        // Shinobi Add API
        /* Payload Example {
              id: 12,
              name: "Test",
              host: "192.168.1.160",
              port: 554,
              username: "root",
              password: 123456
    }*/

        let api = shionbiAddApi({ ...state.keys, ...payload });
        console.log("api:", api);
        shinobiApi
          .get(api)
          .then(response => {
            // get all monitors again
            dispatch("getMonitors");
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
