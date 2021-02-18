import config from "@/../config/config";
import Vue from "vue";
import Axios from "axios";
import { LocalStorage, Loading, Notify } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { stat } from "fs";

const state = {
  reportingData: [],

  selectedData: [],

  violationToPrint: [],

  download: false,

  activeModule: {
    label: "",
    value: ""
  },

  activeDateTime: {
    startDate: "",
    endDate: ""
  },

  distinctDates: [],

  showPrintViolationDialog: false,
  reportingDataDownloaded: true
};

const mutations = {
  addReported(state, payload) {
    state.reportingData.push(payload);
  },

  addSelectedData(state, payload) {
    let obj = state.reportingData.find(x => x.id == payload);
    state.selectedData.push(obj);
  },

  addDistinctDates(state, payload) {
    payload.forEach(date => {
      state.distinctDates.push(date.date);
    });
  },

  setViolationToPrint(state, { reportId, getters }) {
    // check if report id is to print all selected
    if (reportId == "printAll" || reportId == "downloadAll") {
      state.selectedData.forEach(elem => state.violationToPrint.push(elem));
      if (reportId == "downloadAll") {
        state.download = true;
      } else {
        state.download = false;
      }
      return;
    }

    // getting violation Data
    let data = getters.id_data(reportId);

    // Push Data to violationToPrint
    state.violationToPrint.push(data[0]);
  },

  setActiveModule(state, payload) {
    Object.assign(state.activeModule, payload);
  },

  setActiveDateTime(state, payload) {
    Object.assign(state.activeDateTime, payload);
  },

  setReportingDataDownloaded(state, value) {
    state.reportingDataDownloaded = value;
  },

  setPrintViolationDialog(state, value) {
    state.showPrintViolationDialog = value;
  },

  clearReportingData(state) {
    state.reportingData.splice(0, state.reportingData.length);
  },

  clearSelectedData(state, itemId) {
    if (typeof itemId == "undefined") {
      state.selectedData.splice(0, state.selectedData.length);
      return;
    }

    let itemIndex = state.selectedData.findIndex(x => x.id === itemId);
    state.selectedData.splice(itemIndex, 1);
  },

  clearDistinctDates(state) {
    state.distinctDates.splice(0, state.distinctDates.length);
  },

  clearViolationToPrint(state) {
    state.violationToPrint.splice(0, state.violationToPrint.length);
  }
};

const actions = {
  getReportingData({ commit, dispatch }) {
    //dispatch('setLprDataDownloaded', false);

    //commit('clearLprData');

    setTimeout(() => {
      const host =
        config.API_URL +
        "/reporting?" +
        `&activeModule=${state.activeModule.value}` +
        `&startDate=${state.activeDateTime.startDate}&endDate=${state.activeDateTime.endDate}`;
      const userToken = LocalStorage.getItem("loggedInUserToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };

      Axios.get(host, {
        headers: headers
      })
        .then(response => {
          console.log(`success --`, response.data);
          // let paginationData = response.data.pagination;
          const reportedResults = response.data;

          // check received if error
          if (reportedResults.hasOwnProperty("code")) {
            if (reportedResults.code == "ER_EMPTY_QUERY")
              showErrorMessage(
                `${state.activeModule.label} has no data on your System..`
              );

            return;
          }

          dispatch("setReportingDataDownloaded", true);
          dispatch("handleStateReportedData", reportedResults);

          // if(!(lprResults.length > 0)) return;

          // commit("setPagination", {
          //   limit: paginationData.perPage,
          //   page: paginationData.current,
          //   totalPages: paginationData.numPages
          // });
        })
        .catch(error => {
          // console.log(error);
          showErrorMessage(error.message);
        });
    }, 500);
  },

  getDistinctDates({ commit }) {
    setTimeout(() => {
      const host =
        config.API_URL +
        "/reporting_distinctDates" +
        `?&moduleName=${state.activeModule.value}`;
      const userToken = LocalStorage.getItem("loggedInUserToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };

      Axios.get(host, {
        headers: headers
      })
        .then(response => {
          let results = response.data;
          //console.log('success distinct dates', results);

          commit("clearDistinctDates");
          commit("addDistinctDates", results);
        })
        .catch(error => {
          if (error.hasOwnProperty("response"))
            showErrorMessage(error.response.data.message);
          else showErrorMessage(error.message);
        });
    }, 500);
  },

  setActiveModule({ commit, dispatch }, payload) {
    let firstMounted = state.activeModule.value == "" ? true : false;

    commit("setActiveModule", payload);
    dispatch("handleActionsOperation", {
      firstMounted,
      action: "activeModule"
    });
  },

  setActiveDateTime({ commit, dispatch }, payload) {
    let firstMounted = state.activeDateTime.startDate == "" ? true : false;

    commit("setActiveDateTime", payload);
    dispatch("handleActionsOperation", {
      firstMounted,
      action: "activeDateTime"
    });
  },

  setReportingDataDownloaded({ commit }, value) {
    Loading.hide();

    if (!value) Loading.show();

    commit("setReportingDataDownloaded", value);
  },

  setViolationToPrint({ commit, dispatch, getters }, reportId) {
    commit("setViolationToPrint", { reportId, getters });
    dispatch("setPrintViolationDialog", true);
  },

  setSelectedData({ commit }, payload) {
    if (payload.action == "add") commit("addSelectedData", payload.id);

    if (payload.action == "remove") commit("clearSelectedData", payload.id);

    if (payload.action == "removeAll") {
      commit("clearSelectedData");
      commit("clearViolationToPrint");
    }
  },

  setPrintViolationDialog({ commit }, value) {
    commit("setPrintViolationDialog", value);
  },

  handleActionsOperation({ commit, dispatch }, payload) {
    if (
      (payload.action == "activeDateTime") |
      (payload.action == "activeModule")
    ) {
      commit("clearReportingData");
      dispatch("setReportingDataDownloaded", false);

      // check if this is first mount of activeModule component or dateTime component
      if (!payload.firstMounted) dispatch("getReportingData");

      //check if active module
      if (payload.action == "activeModule") {
        dispatch("getDistinctDates");
        dispatch("setSelectedData", { action: "removeAll" });
      }
    }
  },

  handleStateReportedData({ commit, dispatch, getters }, payload) {
    payload.forEach(reported => {
      // Commit only non-existing user with id
      if (!getters.reported_id.includes(reported.id)) {
        commit("addReported", reported);
      }
    });

    //dispatch('setLprDataDownloaded', true);
  },
  clearViolationToPrint({ commit }) {
    commit("clearViolationToPrint");
  }
};

const getters = {
  reported_id: state => state.reportingData.map(reported => reported.id),
  selectedData_id: state => state.selectedData.map(selected => selected.id),
  id_data: state => reportId =>
    state.reportingData.filter(x => x.id === reportId)
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
