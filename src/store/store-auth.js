import config from '@/../config/config';
import Axios from 'axios';
import { LocalStorage, Loading } from 'quasar';
import { showErrorMessage } from 'src/functions/function-show-error-message';
import navs from 'src/router/navs';

const state = {
  loggedIn: false,
  userData: {},
  navs: navs
};

const mutations = {
  setNavs(state, value) {
    state.navs = value;
  },
  setLoggedIn(state, value) {
    state.loggedIn = value;
  },
  setUserData(state, userData) {
    Object.assign(state.userData, userData);
    if (!userData)
      // clear userData
      Object.keys(state.userData).forEach(k => (state.userData[k] = ''));
  }
};

const actions = {
  registerUser({}, payload) {},
  loginUser({ dispatch }, payload) {
    Loading.show();
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let host = config.API_URL + '/login';

        Axios.post(host, {
          email: payload.email,
          password: payload.password
        })
          .then(response => {
            let userAuthData = response.data;
            dispatch('handleAuthStateChange', userAuthData);
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
            }
          });
      });
    }, 500);
  },
  logoutUser({ dispatch }) {
    console.log('logoutUser');
    let userAuthData = { auth: false };
    dispatch('handleAuthStateChange', userAuthData);
  },
  handleAuthStateChange({ commit }, userAuthData) {
    Loading.hide();
    if (userAuthData.auth) {
      commit('setLoggedIn', true);
      commit('setUserData', userAuthData.user);

      LocalStorage.set('loggedIn', true);
      LocalStorage.set('loggedInUser', userAuthData.user);
      LocalStorage.set('loggedInUserToken', userAuthData.token);

      this.$router.push('/');
    } else {
      commit('setLoggedIn', false);
      commit('setUserData', false);

      LocalStorage.remove('loggedIn');
      LocalStorage.remove('loggedInUser');
      LocalStorage.remove('loggedInUserToken');

      // LocalStorage.set('loggedIn', false)
      // LocalStorage.set('loggedInUser', {})
      this.$router.replace('/auth');
    }
  },
  handleBootUserAuth({ commit }) {
    let loggedIn = LocalStorage.getItem('loggedIn');
    let loggedInUser = LocalStorage.getItem('loggedInUser');
    if (!loggedIn) return;
    commit('setLoggedIn', loggedIn);
    commit('setUserData', loggedInUser);
  },
  setNavs({ commit }, values) {
    commit('setNavs', values);
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
