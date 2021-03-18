import config from '@/../config/config';
import Vue from 'vue';
import Axios from 'axios';
import { LocalStorage, Loading, Notify } from 'quasar';
import { showErrorMessage } from 'src/functions/function-show-error-message';

const state = {
  Devices: [],
  devicesList: [],
  systemModules: [
    {
      label: 'Generic Lpr Module',
      value: 'generic-lpr-module',
      devices: []
    },
    {
      label: 'Matching Lpr Module',
      value: 'match-module',
      devices: []
    },
    {
      label: 'Average Speed Module',
      value: 'average-speed-module',
      devices: []
    },
    {
      label: 'Toll Gates Module',
      value: 'toll-gates-module',
      devices: []
    },
    {
      label: 'VMS',
      value: 'VMS-module',
      devices: []
    }
  ],
  showAddDeviceModal: false,
  showEditDeviceModal: false
};

const mutations = {
  addDevice(state, payload) {
    state.Devices.push(payload);
  },
  addDeviceList(state, payload) {
    state.devicesList.push(payload);
  },
  addSystemModuleDevice(state, payload) {
    payload.deviceModule.forEach(module => {
      let index = state.systemModules.findIndex(x => x.value === module.value);
      state.systemModules[index].devices.push(payload);
    });
  },
  clearDevicesData(state) {
    state.Devices.splice(0, state.Devices.length);
    state.devicesList.splice(0, state.devicesList.length);
    state.systemModules.forEach(module => {
      module.devices.splice(0, module.devices.length);
    });
  },
  setAddDeviceModal(state, value) {
    state.showAddDeviceModal = value;
  },
  setEditDeviceModal(state, value) {
    state.showEditDeviceModal = value;
  }
};

const actions = {
  getDevices({ dispatch }) {
    Loading.show();
    setTimeout(() => {
      const host = config.API_URL + '/devices';
      const userToken = LocalStorage.getItem('loggedInUserToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      };

      Axios.get(host, {
        headers: headers
      })
        .then(response => {
          let devices = response.data;
          console.log('devices:', devices);
          dispatch('handleStateDevices', devices);
          Loading.hide();
        })
        .catch(error => {
          // console.log(error);
          showErrorMessage(error.message);
        });
    }, 500);
  },
  addDevice({ dispatch }, payload) {
    Loading.show();

    setTimeout(() => {
      const host = config.API_URL + '/devices';
      const userToken = LocalStorage.getItem('loggedInUserToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      };

      Axios.post(host, payload, {
        headers: headers
      })
        .then(response => {
          Loading.hide();
          dispatch('setAddDeviceModal', false);
          dispatch('getDevices');
          Notify.create('Device Added!');
        })
        .catch(error => {
          if (error.message == 'Network Error') {
            showErrorMessage('Server Offline');
            return;
          }

          if (error.response.status === 401) {
            showErrorMessage(error.response.data.message);
            return;
          } else if (error.response.status === 404) {
            showErrorMessage(error.response.data.message);
            return;
          } else if (error.response.status === 500) {
            showErrorMessage(error.response.data.message);
            return;
          }
        });
    }, 500);
  },
  updateDevice({ dispatch }, payload) {
    Loading.show();

    setTimeout(() => {
      const host = config.API_URL + '/devices/' + payload.id;
      const userToken = LocalStorage.getItem('loggedInUserToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      };

      Axios.put(host, payload, {
        headers: headers
      })
        .then(response => {
          Loading.hide();
          dispatch('setEditDeviceModal', false);
          dispatch('getDevices');
          Notify.create('Device Updated!');
        })
        .catch(error => {
          if (error.message == 'Network Error') {
            showErrorMessage('Server Offline');
            return;
          }

          if (error.response.status === 401) {
            showErrorMessage(error.response.data.message);
            return;
          } else if (error.response.status === 404) {
            showErrorMessage(error.response.data.message);
            return;
          } else if (error.response.status === 500) {
            showErrorMessage(error.response.data.message);
            return;
          }
        });
    }, 500);
  },
  deleteDevice({ dispatch }, deviceId) {
    Loading.show();

    setTimeout(() => {
      const host = config.API_URL + '/devices/' + deviceId;
      const userToken = LocalStorage.getItem('loggedInUserToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      };

      Axios.delete(host, deviceId, {
        headers: headers
      })
        .then(response => {
          Loading.hide();
          dispatch('getDevices');
          Notify.create('Device Deleted!');
        })
        .catch(error => {
          if (error.message == 'Network Error') {
            showErrorMessage('Server Offline');
            return;
          }

          if (error.response.status === 401) {
            showErrorMessage(error.response.data.message);
            return;
          } else if (error.response.status === 404) {
            showErrorMessage(error.response.data.message);
            return;
          } else if (error.response.status === 500) {
            showErrorMessage(error.response.data.message);
            return;
          }
        });
    }, 500);
  },
  handleStateDevices({ commit }, devices) {
    // clear system module devices data

    // clear device list
    commit('clearDevicesData');

    // append new list
    devices.forEach(device => {
      // append device data to devices list
      commit('addDeviceList', device);

      let deviceName = device.deviceName;
      let deviceZone = device.deviceZone;
      let belongTo = device.deviceBelongTo;
      let deviceBelongTo = [];

      if (typeof belongTo == 'string') {
        let temp_belongTo = JSON.parse(belongTo);
        deviceBelongTo = Array.from(temp_belongTo);
        //let payload = {deviceBelongTo, deviceName}
        let payload = {
          label: deviceName,
          value: deviceName,
          description: deviceZone,
          deviceModule: deviceBelongTo
        };
        commit('addSystemModuleDevice', payload);
      }

      let payload = {
        label: deviceName,
        value: deviceName,
        description: deviceZone,
        deviceModule: deviceBelongTo
      };
      commit('addDevice', payload);
    });
  },
  setAddDeviceModal({ commit }, value) {
    commit('setAddDeviceModal', value);
  },
  setEditDeviceModal({ commit }, value) {
    commit('setEditDeviceModal', value);
  }
};

const getters = {
  getSystemModules: state => state.systemModules,

  getModuleDevices: state => moduleName =>
    state.systemModules.filter(value => value.value == moduleName),

  showAddDeviceModal: state => state.showAddDeviceModal,

  showEditDeviceModal: state => state.showEditDeviceModal,

  // Need to be removed
  primitiveZones: state => state.devicesList.map(value => value.deviceZone),
  // Need to be removed
  uniqueZones: (state, getters) => [...new Set(getters.primitiveZones)],

  getModuleActiveDevices: state => moduleName => {
    let moduleDevices = state.systemModules.filter(
      value => value.value == moduleName
    );
    moduleDevices = moduleDevices[0].devices;

    moduleDevices = moduleDevices.map(device => device.label);
    return moduleDevices;
  },

  getAverageSpeedActiveTraps: (state, getters, rootState, rootGetters) => {
    let averageSpeedTrapsList = rootGetters['averageSpeed/averageSpeedList'];

    averageSpeedTrapsList = averageSpeedTrapsList.map(
      trap => `Trap ${trap.trap_number}-${trap.id}`
    );

    return averageSpeedTrapsList;
  },

  primitiveZonesOfPayload: state => payload =>
    payload.map(value => value.description),

  uniqueZonesOfPayload: (state, getters) => payload => [
    ...new Set(getters.primitiveZonesOfPayload(payload))
  ],

  getDevicesTree: (state, getters) => moduleName => {
    let devicesTree = [];

    let moduleDevices = getters.getModuleDevices(moduleName);
    moduleDevices = moduleDevices[0].devices;

    // get unique zones
    let uniqueZones = getters.uniqueZonesOfPayload(moduleDevices);

    // Create Zone Name and Devices
    uniqueZones.forEach(zone => {
      let zoneObj = {
        label: '',
        icon: 'gps_fixed',
        children: []
      };

      zoneObj.label = zone;

      // get zone Devices
      moduleDevices.forEach(device => {
        let deviceObj = {
          label: '',
          value: '',
          icon: 'videocam'
        };

        if (device.description == zone) {
          deviceObj.label = device.label;
          deviceObj.value = device.value;
          zoneObj['children'].push(deviceObj);
        }
      });

      devicesTree.push(zoneObj);
    });

    return devicesTree;
  },

  getAverageSpeedDevicesTree: (state, getters, rootState, rootGetters) => {
    let devicesTree = [];
    let averageSpeedRoadData = rootGetters['averageSpeed/averageSpeedSettings'];

    // Get Road Name and Data
    averageSpeedRoadData.forEach(road => {
      let roadName = Object.keys(road)[0];
      //console.log('road name', roadName);

      let roadObj = {
        label: '',
        icon: 'gps_fixed',
        children: []
      };

      roadObj.label = roadName;

      // Get Road Traps
      let roadTraps = road[roadName];

      // get Road Traps
      roadTraps.forEach(trap => {
        let trapObj = {
          label: '',
          value: '',
          disabled: true,
          icon: 'videocam'
        };

        trapObj.label = `Trap ${trap.trap_number}-${trap.id}`;
        trapObj.value = `Trap ${trap.trap_number}`;
        roadObj['children'].push(trapObj);
      });

      devicesTree.push(roadObj);
    });
    return devicesTree;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
