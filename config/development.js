import { LocalStorage } from 'quasar'

export default {
  API_URL: `${LocalStorage.getItem('serverHost')}/api/v1` || 'http://192.168.56.1:3000'
}