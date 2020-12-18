import config from "@/../config/config"
import Vue from 'vue'
import Axios from "axios"
import { LocalStorage, Loading, Notify } from 'quasar'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
	serverStatus: 'offline'
}

const mutations = {
	setServerStatus(state, value) {
		state.serverStatus = value
	}
}

const actions = {
	getServerStatus({ dispatch }) {
		setTimeout(() => {
			const host = config.API_URL + '/srvMgm'
			const userToken = LocalStorage.getItem('loggedInUserToken')
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`
			}	

			Axios.post(host, { 
				headers: headers
			})
				.then(response => {
					console.log(response.data);
					if(response.data === 'ok')
						dispatch('setServerStatus', 'online')
					else dispatch('setServerStatus', 'offline')
					
				})
				.catch (error => {
					dispatch('setServerStatus', 'offline')
					//showErrorMessage(error.message)
				})					
		}, 500);
	},
	updateServerInfo({dispatch}, payload) {
		Loading.show()

		let serverHost = payload.serverIp + ':' + payload.serverPortNumber
		payload.serverHost = serverHost

		setTimeout(() => {
			const host = serverHost + '/srv_pingPong'
			const userToken = LocalStorage.getItem('loggedInUserToken')
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`
			}	

			Axios.post(host, { 
				headers: headers
			})
				.then(response => {
					console.log(response.data);
					if(response.data === 'ok') {
						dispatch('handleServerStatusChange', payload)
					}
					else dispatch('setServerStatus', 'offline')
					
				})
				.catch (error => {
					dispatch('handleServerStatusChange', payload)
				})					
		}, 500);
	},
	handleServerStatusChange({}, payload) {
		LocalStorage.set('serverUrl', payload.serverIp)
		LocalStorage.set('serverPort', payload.serverPortNumber)
		LocalStorage.set('serverHost', payload.serverHost)
		Loading.hide()
		location.reload()
	},
	setServerStatus({ commit }, value) {
		commit('setServerStatus', value)
	}
}

const getters = {

}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}