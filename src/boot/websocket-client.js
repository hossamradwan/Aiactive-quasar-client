import Vue from 'vue'
import config from "@/../config/config"
import store from '../store'

import VueSocketIO from 'vue-socket.io'


Vue.use(new VueSocketIO({
  debug: false,
  connection: config.API_URL + '/client-server' ,

  vuex: {
    store,
    options: {
      useConnectionNamespace: true
    }
    // actionPrefix: 'SOCKET_',
    // mutationPrefix: 'SOCKET_'
  }
}))
