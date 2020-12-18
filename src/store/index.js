import Vue from 'vue'
import Vuex from 'vuex'

import server from './store-server'
import auth from './store-auth'
import lpr from './store-lpr'
import users from './store-users'
import devices from './store-devices'
import averageSpeed from './store-averageSpeed'
import averageSpeedResult from './store-averageSpeedResult'
import reporting from './store-reporting'


Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({

    modules: {
      server,
      auth,
      lpr,
      users,
      devices,
      averageSpeed,
      averageSpeedResult,
      reporting
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
