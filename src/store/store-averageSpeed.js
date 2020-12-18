import config from "@/../config/config";
import Vue from "vue";
import Axios from "axios";
import { LocalStorage, Loading, Notify } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
  averageSpeedList: [],
  averageSpeedSettings: [],
  showAddAverageSpeedModal: false,
  showEditAverageSpeedModal: false
};

const mutations = {
  addAverageSpeedList(state, payload) {
    state.averageSpeedList.push(payload);
  },
  addAverageSpeedSettings(state, payload) {
    state.averageSpeedSettings.push(payload);
  },
  clearAverageSpeedList(state) {
    state.averageSpeedList.splice(0, state.averageSpeedList.length);
  },
  clearAverageSpeedSettings(state) {
    state.averageSpeedSettings.splice(0, state.averageSpeedSettings.length);
  },
  setAddAverageSpeedModal(state, value) {
    state.showAddAverageSpeedModal = value;
  },
  setEditAverageSpeedModal(state, value) {
    state.showEditAverageSpeedModal = value;
  }
};

const actions = {
  getAverageSpeedSettings({ dispatch }) {
    Loading.show();

    setTimeout(() => {
      const host = config.API_URL + "/averageSpeedSettings";
      const userToken = LocalStorage.getItem("loggedInUserToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };

      Axios.get(host, {
        headers: headers
      })
        .then(response => {
          let averageSpeedSettings = response.data;
          dispatch("handleStateAverageSpeedList", averageSpeedSettings);
        })
        .catch(error => {
          showErrorMessage(error.message);
        });
    }, 500);
  },
  addAverageSpeedSettings({ commit, dispatch }, payload) {
    Loading.show();

    setTimeout(() => {
      const host = config.API_URL + "/averageSpeedSettings";
      const userToken = LocalStorage.getItem("loggedInUserToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };

      Axios.post(host, payload, {
        headers: headers
      })
        .then(response => {
          console.log(response.data);
          dispatch("getAverageSpeedSettings");
          dispatch("setAddAverageSpeedModal", false);
          Loading.hide();
          Notify.create("Average Speed Road Successfully Added!");
        })
        .catch(error => {
          console.log(error);
          showErrorMessage(error.message);
        });
    }, 500);
  },
  editAverageSpeedSettings({ commit, dispatch }, payload, roadName) {
    Loading.show();
    //console.log('trapconfig', payload);
    setTimeout(() => {
      const averageSpeedRoadName = payload.oldRoadName;
      const host = config.API_URL + "/averageSpeedSettings/" + averageSpeedRoadName;
      const userToken = LocalStorage.getItem("loggedInUserToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };

      Axios.put(host, payload, {
        headers: headers
      })
        .then(response => {
          console.log(response.data);
          commit("clearAverageSpeedList");
          dispatch("getAverageSpeedSettings");
          dispatch("setEditAverageSpeedModal", false);
          Loading.hide();
          Notify.create("Average Speed Road Successfully Updated!");
        })
        .catch(error => {
          console.log(error);
          showErrorMessage(error.message);
        });
    }, 500);
  },
  deleteAverageSpeedSettings({ commit, dispatch }, averageSpeedRoadName) {
    Loading.show();

    setTimeout(() => {
      const host =
        config.API_URL + "/averageSpeedSettings/" + averageSpeedRoadName;
      const userToken = LocalStorage.getItem("loggedInUserToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };

      Axios.delete(host, {
        headers: headers
      })
        .then(response => {
          commit("clearAverageSpeedList");
          dispatch("getAverageSpeedSettings");
          Loading.hide();
          Notify.create("AverageSpeed Road Deleted!");
        })
        .catch(error => {
          console.log(error);
          showErrorMessage(error.message);
        });
    }, 500);
  },
  handleStateAverageSpeedList({ commit, getters, dispatch }, payload) {
    Loading.hide();

    payload.forEach(averageSpeedRecord => {
      // Commit only non-existing user with id
      if (!getters.averageSpeed_id.includes(averageSpeedRecord.id)) {
        commit("addAverageSpeedList", averageSpeedRecord);
      }
    });
    dispatch("handleStateAverageSpeedSettings");
  },
  handleStateAverageSpeedSettings({ commit, getters }) {
    commit("clearAverageSpeedSettings");

    let uniqueRoadNames = getters.uniqueRoadName;
    uniqueRoadNames.forEach(roadName => {
      let finalData = {};
      let roadData = getters.getRoadData(roadName);

      finalData[roadName] = roadData;
      commit("addAverageSpeedSettings", finalData);
    });
  },
  setAddAverageSpeedModal({ commit }, value) {
    commit("setAddAverageSpeedModal", value);
  },
  setEditAverageSpeedModal({ commit }, value) {
    commit("setEditAverageSpeedModal", value);
  }
};

const getters = {
  averageSpeed_id: state =>
    state.averageSpeedList.map(averageSpeedRecord => averageSpeedRecord.id),

  averageSpeedList: state => state.averageSpeedList,

  averageSpeedSettings: state => state.averageSpeedSettings,

  primitiveRoadName: state =>
    state.averageSpeedList.map(value => value.road_name),

  uniqueRoadName: (state, getters) => [...new Set(getters.primitiveRoadName)],

  getRoadData: state => roadName =>
    state.averageSpeedList.filter(element => element.road_name == roadName),

  showAddAverageSpeedModal: state => state.showAddAverageSpeedModal,

  showEditAverageSpeedModal: state => state.showEditAverageSpeedModal
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
