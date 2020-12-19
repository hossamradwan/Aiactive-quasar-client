import config from "@/../config/config";
import Vue from "vue";
import Axios from "axios";
import { LocalStorage, Loading, Notify } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
  moduleName: " ",
  lprData: [],

  searchedData: [],

  activeDevices: [],

  distinctDates: [],

  activeDateTime: {
    startDate: "",
    endDate: ""
  },

  pagination: {
    limit: 10,
    page: 1,
    totalPages: 2
  },

  filters: {
    dateTime: {
      isActive: false,
      data: ""
    },
    confidence_number: {
      isActive: false,
      data: 60
    },
    speed: {
      isActive: false,
      data: 10
    },
    confirmed: {
      isActive: true
    }
  },

  sorters: {
    id: {
      isActive: true,
      type: "DESC"
    },
    speed: {
      isActive: false,
      type: "DESC"
    },
    confidence_number: {
      isActive: false,
      type: "ASC"
    }
  },

  updateTransits: false,
  lprDataDownloaded: false,
  searchFlag: false
};

const mutations = {
  addLpr(state, payload) {
    state.lprData.push(payload);
  },
  updateLpr(state, payload) {
    const lprIndex = state.lprData.findIndex(x => x.id == payload.id);
    if (payload.hasOwnProperty("plate_number"))
      state.lprData[lprIndex].plate_number = payload.plate_number;

    if (payload.hasOwnProperty("confirmed"))
      state.lprData[lprIndex].confirmed = payload.confirmed;
  },
  updateLprFields(state, payload) {
    const fields = payload.fields;
    const lprData = payload.lprData;
    const lprIndex = state.lprData.findIndex(x => x.id == lprData.id);

    if (lprData.hasOwnProperty(fields))
      state.lprData[lprIndex][fields] = lprData[fields];
  },
  addSearchedLpr(state, payload) {
    state.searchedData.push(payload);
  },
  clearLprData(state) {
    state.lprData.splice(0, state.lprData.length);
  },
  clearSearchedData(state) {
    state.searchedData.splice(0, state.searchedData.length);
  },
  clearDistinctDates(state) {
    state.distinctDates.splice(0, state.distinctDates.length);
  },
  fixArrayLength(state) {
    console.log("removing first element");

    state.lprData.sort(function(a, b) {
      return a.id - b.id;
    });

    state.lprData.shift();
    //state.lprData.splice(state.lprData.length - 2, 1);
  },
  addDistinctDates(state, payload) {
    payload.forEach(date => {
      state.distinctDates.push(date.date);
    });
  },
  setModuleName(state, moduleName) {
    state.moduleName = moduleName;
  },
  setActiveDateTime(state, payload) {
    Object.assign(state.activeDateTime, payload);
  },
  setPagination(state, payload) {
    Object.assign(state.pagination, payload);
  },
  setDeviceFilter(state, payload) {
    state.activeDevices.splice(0, state.activeDevices.length);
    payload.forEach(device => {
      state.activeDevices.push(device);
    });
  },
  setFilter(state, payload) {
    let filterName = payload.filterName;
    Object.assign(state.filters[filterName], payload.filterData);
  },
  setSorter(state, payload) {
    /**
     * deactivate any active sorter first
     * mutate sorter data
     */
    let activeSorter = payload.activeSorter;

    if (typeof activeSorter !== "undefined") {
      //console.log("deactivate sorter", activeSorter);
      state.sorters[activeSorter].isActive = false;
    }

    let sorterName = payload.sorterName;
    Object.assign(state.sorters[sorterName], payload.sorterData);
  },
  setUpdateTransits(state, value) {
    state.updateTransits = value;
  },
  setLprDataDownloaded(state, value) {
    state.lprDataDownloaded = value;
  },
  setSearchFlag(state, value) {
    state.searchFlag = value;
  }
};

const actions = {
  getLprData({ commit, dispatch, getters }) {
    dispatch("setLprDataDownloaded", false);

    const confidenceFilter = getters.getActiveFilter.hasOwnProperty(
      "confidence_number"
    )
      ? state.filters.confidence_number.data
      : 0;

    const speedFilter = getters.getActiveFilter.hasOwnProperty("speed")
      ? state.filters.speed.data
      : 0;

    const confirmedFilter = getters.getActiveFilter.hasOwnProperty("confirmed")
      ? state.filters.confirmed.isActive
      : "";

    //console.log('active filters', confidenceFilter, speedFilter);
    commit("clearLprData");

    setTimeout(() => {
      const host =
        config.API_URL +
        "/lpr" +
        `?npp=${state.pagination.limit}&page=${state.pagination.page}
                   &startDate=${state.activeDateTime.startDate}&endDate=${state.activeDateTime.endDate}
                   &confidenceFilter=${confidenceFilter}&speedFilter=${speedFilter}
                   &confirmedFilter=${confirmedFilter}`;
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
          let paginationData = response.data.pagination;
          let lprResults = response.data.results;

          dispatch("setLprDataDownloaded", true);
          dispatch("handleStateLprData", lprResults);

          if (!(lprResults.length > 0)) return;

          commit("setPagination", {
            limit: paginationData.perPage,
            page: paginationData.current,
            totalPages: paginationData.numPages
          });
        })
        .catch(error => {
          showErrorMessage(error.message);
        });
    }, 300);
  },

  updateLprData({ commit, dispatch, getters }, payload) {
    dispatch("handleStateLprData", payload.results);

    if (!(payload.results.length > 0)) return; // need to disable loading

    commit("setPagination", {
      totalPages: payload.pagination.numPages,
      limit: payload.pagination.perPage,
      page: payload.pagination.current
    });

    if (state.lprData.length > state.pagination.limit)
      // fix element added over page limit
      commit("fixArrayLength");
  },

  getDistinctDates({ commit }) {
    setTimeout(() => {
      const host = config.API_URL + "/lpr_distinctDates";
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

  searchLprData({ dispatch, commit }, payload) {
    commit("clearLprData"); // clear lpr data
    commit("clearSearchedData"); // clear searched result

    dispatch("setSearchFlag", true);
    dispatch("setUpdateTransits", false);

    setTimeout(() => {
      const host = config.API_URL + "/lpr_search";
      const userToken = LocalStorage.getItem("loggedInUserToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };

      let data = {
        plateNumber: payload
      };

      Axios.post(host, data, {
        headers: headers
      })
        .then(response => {
          let searchResult = response.data;

          Notify.create(
            `Found ( ${searchResult.length} ) Plates Matches your search`
          );

          dispatch("handleStateSearchedData", searchResult);
          dispatch("setLprDataDownloaded", true);
        })
        .catch(error => {
          if (error.hasOwnProperty("response"))
            showErrorMessage(error.response.data.message);
          else showErrorMessage(error.message);
        });
    }, 500);
  },

  editLprPlateNumber({ commit, dispatch }, payload) {
    dispatch("setLprDataDownloaded", false);

    setTimeout(() => {
      const host = config.API_URL + "/lpr/" + payload.id;
      const userToken = LocalStorage.getItem("loggedInUserToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };

      Axios.put(host, payload, {
        headers: headers
      })
        .then(response => {
          console.log("Edit Plate success..");
          const result = response.data;

          dispatch("setLprDataDownloaded", true);

          if (result.affectedRows == 0) {
            Notify.create(
              `Sorry Can't Update ( ${payload.plate_number} ) Right Now..`
            );

            return;
          }

          Notify.create(
            `Updated Plate Number to ( ${payload.plate_number} )Success..`
          );

          commit("updateLpr", payload);
        })
        .catch(error => {
          if (error.hasOwnProperty("response"))
            showErrorMessage(error.response.data.message);
          else showErrorMessage(error.message);
        });
    }, 500);
  },

  confirmLprPlate({ commit, dispatch }, payload) {
    dispatch("setLprDataDownloaded", false);

    setTimeout(() => {
      const host = config.API_URL + "/lpr/" + payload.id;
      const userToken = LocalStorage.getItem("loggedInUserToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };

      Axios.put(host, payload, {
        headers: headers
      })
        .then(response => {
          console.log("Confirm success..");
          const result = response.data;

          dispatch("setLprDataDownloaded", true);

          if (result.affectedRows == 0) {
            Notify.create(`Sorry Can't Confirm ( ${payload.id} ) Right Now..`);

            return;
          }

          Notify.create(`( ${payload.id} ) Confirmation Success..`);

          //commit('updateLpr', payload);
          dispatch("getLprData");
        })
        .catch(error => {
          if (error.hasOwnProperty("response"))
            showErrorMessage(error.response.data.message);
          else showErrorMessage(error.message);
        });
    }, 100);
  },

  printLprData({ commit }, payload) {
    console.log("printing record", payload);

    setTimeout(() => {
      const host = config.API_URL + "/lpr_print?recordData";
      const dataRecord = encodeURIComponent(JSON.stringify(payload));
      const url = host + dataRecord;

      window.open(
        url,
        "popUpWindow",
        "height=800, width=650, left=300, top=100, resizable=yes, scrollbars=yes, toolbar=yes, menubar=no, location=no, directories=no, status=yes"
      );
    }, 500);
  },

  setActiveDateTime({ commit, dispatch }, payload) {
    // console.log('date time', payload);
    commit("setActiveDateTime", payload);

    dispatch("setUpdateTransits", false);
    dispatch("setPagination", {
      activeDateTime: true,
      page: 1
    });
  },

  setPagination({ commit, dispatch }, payload) {
    // console.log('pagination');
    let activeDateTime = payload.activeDateTime || false;
    let componentTrigger = true; // Fix issue of trigger from component
    let payloadKeys = Object.keys(payload);

    payloadKeys.forEach(key => {
      if (!(payload[key] == state.pagination[key])) componentTrigger = false;
    });

    if (componentTrigger & !activeDateTime)
      // make is not date time selection
      return;

    if (state.pagination.page != payload.page)
      // clear data of current page if page changed
      commit("clearLprData");

    console.log("pagination", payload);
    commit("setPagination", payload);

    if (!state.updateTransits & !state.searchFlag) {
      dispatch("getLprData");
    }

    if (state.searchFlag)
      // if search flag is raised do local pagination
      dispatch("handleStateSearchedData", []);
  },

  setFilter({ commit, dispatch }, payload) {
    dispatch("setLprDataDownloaded", false);
    commit("clearLprData");
    commit("setFilter", payload);

    if (!state.updateTransits & !state.searchFlag) dispatch("getLprData");

    if (state.searchFlag)
      // if search flag is raised do local pagination
      dispatch("handleStateSearchedData", []);
  },

  setDeviceFilter({ commit }, payload) {
    commit("setDeviceFilter", payload);
  },

  setSorter({ commit, getters }, payload) {
    let activeSorter = getters.getActiveSorter;
    let activeSorterKey = Object.keys(activeSorter);

    payload.activeSorter = activeSorterKey[0];

    commit("setSorter", payload);
  },

  setModuleName({ commit }, moduleName) {
    commit("setModuleName", moduleName);
  },

  handleStateLprData({ commit, dispatch, getters }, payload) {
    console.log("payload", payload);
    payload.forEach(lpr => {
      // Commit only non-existing user with id
      if (!getters.lpr_id.includes(lpr.id)) {
        commit("addLpr", lpr);
      }

      // if exists check module name to ge fields to update
      else if (getters.lpr_id.includes(lpr.id)) {
        if (state.moduleName == "toll-gates-module") {
          // Fields to update
          const fieldsToUpdate = "source2";

          // Find index
          const lprIndex = state.lprData.findIndex(x => x.id == lpr.id);

          // Check ##### To do validation has own property
          if (state.lprData[lprIndex][fieldsToUpdate] != lpr[fieldsToUpdate]) {
            console.log("personImageUpdated", lpr[fieldsToUpdate]);
            commit("updateLprFields", {
              fields: fieldsToUpdate,
              lprData: lpr
            });
          }
        }
      }
    });

    dispatch("setLprDataDownloaded", true);
  },

  handleStateSearchedData({ commit, dispatch, getters }, payload) {
    payload.forEach(lpr => {
      commit("addSearchedLpr", lpr);
    });

    commit("setPagination", {
      totalPages: Math.ceil(state.searchedData.length / state.pagination.limit)
    });
    // Get paginated data and push it lpr data array
    let paginatedTransits = getters.paginatedTransits(state.searchedData);

    dispatch("handleStateLprData", paginatedTransits);
    dispatch("setLprDataDownloaded", true);
  },

  setUpdateTransits({ commit, dispatch }, value) {
    if (value) {
      commit("clearLprData");
      dispatch("setLprDataDownloaded", false);
    }

    commit("setUpdateTransits", value);
  },

  setLprDataDownloaded({ commit }, value) {
    //console.log('hiding elem');
    Loading.hide();

    if (!value) Loading.show();
    commit("setLprDataDownloaded", value);
  },

  setSearchFlag({ commit, dispatch }, value) {
    if (!value) {
      commit("setPagination", {
        page: 1
      });

      dispatch("getLprData");
    }

    commit("setSearchFlag", value);
  }
};

const getters = {
  lpr_id: state => state.lprData.map(lpr => lpr.id),

  updateTransits: state => state.updateTransits,

  paginationData: state => state.pagination,

  getActiveSorter: state => {
    let sortersKeys = Object.keys(state.sorters),
      activeSorters = {};

    // getting active filters
    sortersKeys.forEach(key => {
      if (state.sorters[key].isActive) {
        activeSorters[key] = state.sorters[key];
      }
    });

    return activeSorters;
  },

  getActiveFilter: state => {
    let filtersKeys = Object.keys(state.filters),
      activeFilters = {};

    // getting active filters
    filtersKeys.forEach(key => {
      if (state.filters[key].isActive) {
        activeFilters[key] = state.filters[key];
      }
    });

    return activeFilters;
  },

  filteredTransitsByDevices: (state, getters) => {
    //console.log(getters.paginatedTransits);

    let filteredTransits = state.lprData,
      activeDevices = state.activeDevices;

    filteredTransits = filteredTransits.filter(el => {
      return activeDevices.some(f => {
        return f === el.device_name;
      });
    });
    return filteredTransits;
  },

  filteredTransits: (state, getters) => {
    /**
     * getting active filters
     * filter data with filter value
     */
    // let filteredTransits = getters.filteredTransitsByDevices,
    //   filtersKeys = Object.keys(state.filters),
    //   activeFilters = {};
    // // getting active filters
    // filtersKeys.forEach(key => {
    //   if (state.filters[key].isActive) {
    //     activeFilters[key] = state.filters[key];
    //   }
    // });
    // // filter function
    // filteredTransits = filteredTransits.filter(item => {
    //   for (var key in activeFilters) {
    //     let filterData = parseInt(activeFilters[key].data);
    //     let itemData = parseInt(item[key]);
    //     if (key == "speed") itemData = itemData / 100;
    //     if (itemData < filterData) return false;
    //   }
    //   return true;
    // });
    // return filteredTransits;
  },

  sortedTransits: (state, getters) => {
    let sortedTransits = Array.from(getters.filteredTransitsByDevices);
    let sorterData = getters.getActiveSorter;

    if (Object.keys(sorterData).length > 0) {
      let sortKey = Object.keys(sorterData)[0],
        sortType = sorterData[sortKey].type;

      let sorterA = 1,
        sorterB = -1;

      if (sortType == "DESC") {
        sorterA = -1;
        sorterB = 1;
      }

      sortedTransits.sort((a, b) => {
        let compare = 0,
          aValue = parseInt(a[sortKey]),
          bValue = parseInt(b[sortKey]);

        if (aValue > bValue) {
          compare = sorterA;
        } else if (bValue > aValue) {
          compare = sorterB;
        }
        return compare;
      });
    }

    return sortedTransits;
  },

  paginatedTransits: state => payload => {
    const paginate = function(array, index, size) {
      // transform values
      index = Math.abs(parseInt(index));
      index = index > 0 ? index - 1 : index;
      size = parseInt(size);
      size = size < 1 ? 1 : size;

      // filter
      return [
        ...array.filter((value, n) => {
          return n >= index * size && n < (index + 1) * size;
        })
      ];
    };

    let array = payload,
      paginationOption = state.pagination;

    let paginatedTransits = paginate(
      array,
      paginationOption.page,
      paginationOption.limit
    ); // params(array, pageNumber, limit)

    return paginatedTransits;
  },
  paginationRename: state => {
    let pagination = {
      page: state.pagination.page,
      rowsPerPage: state.pagination.limit,
      rowsNumber: state.pagination.totalPages * state.pagination.limit
    };
    return pagination;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
