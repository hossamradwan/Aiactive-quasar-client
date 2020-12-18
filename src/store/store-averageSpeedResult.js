import config from "@/../config/config";
import Vue from "vue";
import Axios from "axios";
import { LocalStorage, Loading, Notify } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
  averageSpeedResults: [],

  searchedData: [],

  distinctDates: [],

  activeDateTime: {
    startDate: "",
    endDate: ""
  },

  activeTraps: [],

  pagination: {
    limit: 4,
    page: 1,
    totalPages: 0
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
  addAverageSpeedResult(state, payload) {
    state.averageSpeedResults.push(payload);
  },
  addSearchedLpr(state, payload) {
    state.searchedData.push(payload);
  },
  clearAverageSpeedData(state) {
    state.averageSpeedResults.splice(0, state.averageSpeedResults.length);
  },
  clearSearchedData(state) {
    state.searchedData.splice(0, state.searchedData.length);
  },
  clearDistinctDates(state) {
    state.distinctDates.splice(0, state.distinctDates.length);
  },
  fixArrayLength(state) {
    console.log('removing first element');

    state.averageSpeedResults.sort(function(a, b) { 
      return a.id - b.id;
    });

    state.averageSpeedResults.shift();
    //state.lprData.splice(state.lprData.length - 2, 1);
  },
  addDistinctDates(state, payload) {
    payload.forEach(date => {
      state.distinctDates.push(date.date);
    });
  },
  setActiveDateTime(state, payload) {
    Object.assign(state.activeDateTime, payload);
  },
  setPagination(state, payload) {
    //console.log('update pagination', payload);
    Object.assign(state.pagination, payload);
  },
  setDeviceFilter(state, payload) {
    state.activeTraps.splice(0, state.activeTraps.length);
    payload.forEach(device => {
      state.activeTraps.push(device);
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
    //console.log('mutate', payload);
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
  getAverageSpeedResults({ commit, dispatch, getters }) {
    dispatch("setAverageSpeedDataDownloaded", false);

    const speedFilter = getters.getActiveFilter.hasOwnProperty('speed') ?
                      state.filters.speed.data : 0;


    const confirmedFilter = getters.getActiveFilter.hasOwnProperty('confirmed') ?
                            state.filters.confirmed.isActive : '';


    const host =
      config.API_URL +
      "/averageSpeedResults" +
      `?npp=${state.pagination.limit}&page=${state.pagination.page}
      &startDate=${state.activeDateTime.startDate}&endDate=${state.activeDateTime.endDate}
      &speedFilter=${speedFilter}
      &confirmedFilter=${confirmedFilter}`;

    commit('clearAverageSpeedData');

    //console.log('action get results', host);


    const userToken = LocalStorage.getItem("loggedInUserToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`
    };

    setTimeout(() => {
      Axios.get(host, {
        headers: headers
      })
        .then(response => {
          console.log(`success --`, response.data);
          let paginationData = response.data.pagination;
          let averageSpeedResults = response.data.results;

          dispatch("setAverageSpeedDataDownloaded", true);
          dispatch("handleStateAverageSpeedResults", averageSpeedResults);

          if (!(averageSpeedResults.length > 0)) return;

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

  updateAverageSpeedResults({ commit, dispatch, getters }, payload) {
    dispatch("handleStateAverageSpeedResults", payload.results);

    if(!(payload.results.length > 0)) return;

    commit("setPagination", { 
                                totalPages: payload.pagination.numPages,
                                limit: payload.pagination.perPage,
                                page: payload.pagination.current
                            });

    if(state.averageSpeedResults.length > state.pagination.limit) // fix element added over page limit
      commit('fixArrayLength');
  },
  
  getAverageSpeedDistinctDates({ commit }) {
    setTimeout(() => {
      const host = config.API_URL + "/averageSpeedResults_distinctDates";
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
          //console.log('distinctDates', results);
          commit('clearDistinctDates');
          commit('addDistinctDates', results);
        })
        .catch(error => {
          if (error.hasOwnProperty("response"))
          showErrorMessage(error.response.data.message);
          
          else showErrorMessage(error.message);
        });
      }, 500);
  },

  searchAverageSpeedData({ dispatch, commit }, payload) {
    console.log("action searching average speed", payload);
    commit("clearAverageSpeedData");     // clear lpr data
    commit("clearSearchedData");         // clear searched result
    
    dispatch('setAverageSpeedSearchFlag', true);
    dispatch('setUpdateAverageSpeedTransits', false);

    setTimeout(() => {
      const host = config.API_URL + "/averageSpeed_search";
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
          dispatch("setAverageSpeedDataDownloaded", true);
        })
        .catch(error => {
          if (error.hasOwnProperty("response"))
            showErrorMessage(error.response.data.message);
          else showErrorMessage(error.message);
        });
    }, 500);
  },

  confirmLprPlate({commit, dispatch}, payload) {
    console.log('confirm average speed', payload);
    dispatch('setAverageSpeedDataDownloaded', false);

    setTimeout(() => {

      const host = config.API_URL + "/averageSpeedResults/" + payload.id;
      const userToken = LocalStorage.getItem("loggedInUserToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };


      Axios.put(host, payload, {
        headers: headers
      })
        .then(response => {
          console.log('Confirm success..');
          const result = response.data;

          dispatch('setAverageSpeedDataDownloaded', true);

          if(result.affectedRows == 0) {
            Notify.create(
              `Sorry Can't Confirm ( ${payload.id} ) Right Now..`
            );

            return;
          }

          Notify.create(
            `( ${payload.id} ) Confirmation Success..`
          );

          //commit('updateLpr', payload);
          dispatch('getAverageSpeedResults');
          
        })
        .catch(error => {
          if (error.hasOwnProperty("response"))
          showErrorMessage(error.response.data.message);
          
          else showErrorMessage(error.message);
        });
      }, 100);
  },

  handleStateAverageSpeedResults({ commit, dispatch, getters }, payload) {
    payload.forEach(record => {
      // Commit only non-existing user with id
      if (!getters.averageSpeedResults_id.includes(record.id)) {
        commit("addAverageSpeedResult", record);
      }
    });

    dispatch('setAverageSpeedDataDownloaded', true);
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

    dispatch('handleStateAverageSpeedResults', paginatedTransits);    
    dispatch('setAverageSpeedDataDownloaded', true);
  },

  setActiveDateTime({ commit, dispatch }, payload) {
    commit('setActiveDateTime', payload);

    dispatch('setUpdateAverageSpeedTransits', false);
    dispatch("setAverageSpeedPagination", { 
      activeDateTime: true,
      page: 1
    });
  },

  setAverageSpeedPagination({ commit, dispatch }, payload) {
      let activeDateTime = payload.activeDateTime || false;
      let componentTrigger = true;                      // Fix issue of trigger from component
      let payloadKeys = Object.keys(payload);
  
      payloadKeys.forEach(key => {
        if(!(payload[key] == state.pagination[key]))
          componentTrigger = false;
      });
  
      if(componentTrigger & !activeDateTime)        // make is not date time selection 
        return
    
      if(state.pagination.page != payload.page)         // clear data of current page if page changed
        commit('clearAverageSpeedData');
  
      commit('setPagination', payload);
        
      if(!state.updateTransits & !state.searchFlag) {
         dispatch('getAverageSpeedResults');    
      }
        
      if(state.searchFlag)                            // if search flag is raised do local pagination         
        dispatch('handleStateSearchedData', []);
  },

  setDeviceFilter({ commit }, payload) {
    commit("setDeviceFilter", payload);
  },

  setAverageSpeedFilter({ commit, dispatch }, payload) {
    dispatch('setAverageSpeedDataDownloaded', false);
    commit('clearAverageSpeedData');
    commit("setFilter", payload);

    if(!state.updateTransits & !state.searchFlag)   // check auto update is off and search flag too
      dispatch('getAverageSpeedResults');

    if(state.searchFlag)                            // if search flag is raised do local pagination         
      dispatch('handleStateSearchedData', []);
  },

  setAverageSpeedSorter({ commit, getters }, payload) {
    let activeSorter = getters.getActiveSorter;
    let activeSorterKey = Object.keys(activeSorter);

    payload.activeSorter = activeSorterKey[0];

    commit("setSorter", payload);
  },

  setUpdateAverageSpeedTransits({ commit, dispatch }, value) {
    if(value){
      commit('clearAverageSpeedData');
      dispatch("setAverageSpeedDataDownloaded", false);
    }

    commit("setUpdateTransits", value);  
  },

  setAverageSpeedDataDownloaded({ commit }, value) {
    Loading.hide();
    
    if(!value)
      Loading.show();

    commit("setLprDataDownloaded", value);
  },

  setAverageSpeedSearchFlag({ commit, dispatch }, value) {   
    if(!value){
      commit("setPagination", {
        page: 1
      }); 

      dispatch('getAverageSpeedResults');
    }

    commit("setSearchFlag", value);
  }
};

const getters = {
  averageSpeedResults_id: state =>
    state.averageSpeedResults.map(record => record.id),

  updateAverageSpeedTransits: state => state.updateTransits,

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

  filteredTransits: (state, getters) => {
    /**
     * getting active filters
     * filter data with filter value
     */
    // let filteredTransits = state.averageSpeedResults,
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

    //     // Grab average speed info
    //     if (key == "speed") key = "average_speed";

    //     let itemData = parseInt(item[key]);

    //     if (itemData < filterData) return false;
    //   }
    //   return true;
    // });

    // return filteredTransits;
  },

  sortedTransits: (state, getters) => {
    //let sortedTransits = Array.from(state.averageSpeedResults);
    let sortedTransits = Array.from(state.averageSpeedResults);
    let sorterData = getters.getActiveSorter;

    //console.log('sorting', sortedTransits);

    if (Object.keys(sorterData).length > 0) {
      let sortKey = Object.keys(sorterData)[0],
        sortType = sorterData[sortKey].type;

      if (sortKey == "speed") sortKey = "average_speed";

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

  paginatedTransits: (state) => payload => {

    const paginate = function (array, index, size) {
      // transform values
      index = Math.abs(parseInt(index));
      index = index > 0 ? index - 1 : index;
      size = parseInt(size);
      size = size < 1 ? 1 : size;

      // filter
      return [...(array.filter((value, n) => {
        return (n >= (index * size)) && (n < ((index + 1) * size))
      }))]
    }

    let array = payload,
      paginationOption = state.pagination


    let paginatedTransits = paginate(array, paginationOption.page, paginationOption.limit); // params(array, pageNumber, limit)

    return paginatedTransits

  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
